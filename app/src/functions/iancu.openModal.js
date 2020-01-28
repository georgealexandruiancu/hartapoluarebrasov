export const openModalAdmin = () => {
	var modalAdmin = document.getElementsByClassName("js-open-modal-admin")[0];

	modalAdmin.classList.add("modal-overlay--open");
}

export const closeModalAdmin = () => {
	var modalAdmin = document.getElementsByClassName("js-open-modal-admin")[0];

	modalAdmin.classList.remove("modal-overlay--open");
}

export const openModalUser = () => {
	var modalUser = document.getElementsByClassName("js-open-modal-user")[0];

	modalUser.classList.add("modal-overlay--open");
}

export const closeModalUser = () => {
	var modalUser = document.getElementsByClassName("js-open-modal-user")[0];

	modalUser.classList.remove("modal-overlay--open");
}
