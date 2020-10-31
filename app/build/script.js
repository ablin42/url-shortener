function dismissAlert(closeBtn) {
	let alert = closeBtn.parentElement;

	if (alert) alert.remove();
}
