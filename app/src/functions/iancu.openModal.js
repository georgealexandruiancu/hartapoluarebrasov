export const openModal = (element, data) => {
	var modal = document.querySelector("[data-modal='"+data+"']");

	modal.classList.add("modal-overlay--open");
}

export const closeModal = (element, data) => {
	var modal = document.querySelector("[data-modal='"+data+"']");

	modal.classList.remove("modal-overlay--open");
}