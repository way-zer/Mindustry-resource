/* eslint-disable */
import { ElMessage } from "element-plus";

declare namespace grecaptcha {
    function ready(b: (token: string) => void): void;
    function render(element: string | HTMLElement, options: { sitekey: string, callback: (token: string) => void }): number;
    function execute(key: string, body: { action: string }): Promise<string>;
}

const key = '6LfGReEZAAAAAE5Uwrag1tf4HhVMtZtit3-hQwEC';
const keyV2 = '6LcboCUpAAAAABrchmhhhZvIrxZpoVkx_mMlWpIE';

let loadGRecaptcha: Promise<any>
async function loadRecaptcha() {
    if (!loadGRecaptcha) {
        const script = document.createElement('script');
        script.src = 'https://www.recaptcha.net/recaptcha/api.js?render=' + key;
        document.body.append(script);
        loadGRecaptcha = new Promise((resolve, reject) => {
            script.onerror = reject
            script.onload = () => {
                grecaptcha.ready(resolve)
            };
        });
    }
    let msg = ElMessage.info({ message: "正在加载reCaptcha组件", duration: 0 })
    try {
        await loadGRecaptcha
    } catch (e) {
        console.error(e)
        ElMessage.error({ message: "加载reCaptcha组件失败,可能网络不佳", duration: 30_000, showClose: true })
    } finally {
        msg.close()
    }
}

export async function requestToken(action: string): Promise<string> {
    await loadRecaptcha()
    let msg = ElMessage.info({ message: "正在获取reCaptcha验证码", duration: 0 })
    try {
        return await grecaptcha.execute(key, { action });
    } finally {
        msg.close()
    }
}

export async function requestTokenV2(): Promise<string> {
    await loadRecaptcha()
    const token = await new Promise<string>(resolve => {
        ElMessageBox({
            title: "请完成reCaptcha验证",
            message: h("div", {
                onVnodeMounted: (vnode) => {
                    grecaptcha.render(vnode.el as HTMLElement, { sitekey: keyV2, callback: resolve })
                }
            }),
            showConfirmButton: false,
            showCancelButton: false,
        })
    })
    ElMessageBox.close()
    return token
}