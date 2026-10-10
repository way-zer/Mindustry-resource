import { ElMessage } from "element-plus"

/** Public sitekey of the Cloudflare Turnstile widget. */
const SITE_KEY = "0x4AAAAAAAOEwOaCZ8lDf0iw"

interface TurnstileOptions {
	sitekey: string
	action?: string
	theme?: "auto" | "light" | "dark"
	size?: "normal" | "flexible" | "compact"
	appearance?: "always" | "execute" | "interaction-only"
	execution?: "render" | "execute"
	callback?: (token: string) => void
	"error-callback"?: (errorCode: string) => void
	"expired-callback"?: () => void
}

interface TurnstileApi {
	ready(callback: () => void): void
	render(container: string | HTMLElement, options: TurnstileOptions): string
	reset(widgetId?: string): void
	remove(widgetId: string): void
	getResponse(widgetId?: string): string | undefined
}

declare global {
	interface Window {
		turnstile?: TurnstileApi
	}
}

let waitingTurnstile: Promise<void> | undefined

/**
 * The Turnstile script is loaded from the document head as early as possible
 * (see nuxt.config.ts), so it is normally already available. Wait for the API
 * only if the visitor acts before it has finished downloading.
 *
 * `turnstile.ready()` is deliberately not used: Cloudflare warns when it is
 * combined with an api.js loaded via async/defer. Once the global exists,
 * `turnstile.render()` is safe to call.
 */
function waitForTurnstile(timeout = 15_000): Promise<void> {
	if (window.turnstile) return Promise.resolve()
	waitingTurnstile ??= new Promise<void>((resolve, reject) => {
		const startedAt = Date.now()
		const timer = window.setInterval(() => {
			if (window.turnstile) {
				window.clearInterval(timer)
				resolve()
			} else if (Date.now() - startedAt > timeout) {
				window.clearInterval(timer)
				waitingTurnstile = undefined
				reject(new Error("加载Turnstile脚本失败"))
			}
		}, 50)
	})
	return waitingTurnstile
}

async function loadTurnstileScript() {
	if (!window.turnstile) {
		const msg = ElMessage.info({
			message: "正在加载Turnstile组件",
			duration: 0,
		})
		try {
			await waitForTurnstile()
		} catch (e) {
			console.error(e)
			ElMessage.error({
				message: "加载Turnstile组件失败,网络不佳或被屏蔽，请检查网络设置后重试",
				duration: 30_000,
				showClose: true,
			})
			throw new Error("加载Turnstile组件失败")
		} finally {
			msg.close()
		}
	}
}

/**
 * Request a single-use Turnstile token bound to `action`.
 *
 * The widget is rendered explicitly into a temporary overlay so a managed
 * challenge can surface when Cloudflare asks for interaction, while
 * `interaction-only` keeps it invisible for normal visitors. The widget is
 * removed once the token resolves, so every request gets a fresh challenge.
 */
export async function requestToken(action: string): Promise<string> {
	await loadTurnstileScript()
	const msg = ElMessage.info({ message: "正在进行Turnstile验证", duration: 0 })
	try {
		return await new Promise<string>((resolve, reject) => {
			const container = document.createElement("div")
			Object.assign(container.style, {
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				zIndex: "3000",
			})
			document.body.append(container)
			const widget = { id: "" }
			const cleanup = () => {
				if (widget.id) {
					try {
						window.turnstile?.remove(widget.id)
					} catch {
						// widget was already removed
					}
				}
				container.remove()
			}
			widget.id = window.turnstile!.render(container, {
				sitekey: SITE_KEY,
				action,
				appearance: "interaction-only",
				theme: "auto",
				callback: (token) => {
					cleanup()
					resolve(token)
				},
				"error-callback": (errorCode) => {
					cleanup()
					reject(new Error(`Turnstile验证失败: ${errorCode}`))
				},
				"expired-callback": () => {
					cleanup()
					reject(new Error("Turnstile令牌已过期"))
				},
			})
		})
	} finally {
		msg.close()
	}
}
