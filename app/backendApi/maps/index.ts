import type { MapDetail, MapInfo } from "./type"

export const MapApi = {
	async list(begin: number, search: string): Promise<MapInfo[]> {
		return request<MapInfo[]>("GET", "/api/maps/list", {
			params: { begin, search },
		}).then((data) => {
			data.forEach((it) => {
				it.preview = mapUrl(it.preview)
			})
			return data
		})
	},
	async detail(thread: string): Promise<MapDetail> {
		return request<MapDetail>("GET", `/api/maps/${thread}.json`).then(
			(data) => {
				data.preview = mapUrl(data.preview)
				return data
			},
		)
	},
	async editMode(thread: string, mode: string): Promise<void> {
		return request("PUT", `/api/maps/${thread}/mode`, { body: mode })
	},
	async deleteThread(thread: string): Promise<void> {
		return request("DELETE", `/api/maps/${thread}`)
	},
	async uploadNew(file: File, updateThread?: string): Promise<string> {
		const form = new FormData()
		form.append("file", file)
		return request("POST", "/api/maps", {
			body: form,
			reCaptchaAction: "mapUpload",
		})
	},
	async updateMap(thread: number, file: File): Promise<void> {
		const form = new FormData()
		form.append("file", file)
		return request("PUT", "/api/maps/" + thread, {
			body: form,
			reCaptchaAction: "mapUpload",
		})
	},
	async download(thread: string) {
		window.open(mapUrl(`/api/maps/${thread}.msav`), "_blank")
	},
}
