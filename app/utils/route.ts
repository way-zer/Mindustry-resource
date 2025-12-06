export function backOrNavigateTo(...params: Parameters<typeof navigateTo>) {
	if (history.state.backWhenClose) {
		history.back()
	} else {
		navigateTo(...params)
	}
}
