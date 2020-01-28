export const toggleModalAdmin = (element) => {

	var modalAdmin = document.getElementsByClassName("js-open-modal-admin")[0];

	if(element) {
		modalAdmin.classList.add("modal-overlay--open");
	}
	else {
		modalAdmin.classList.remove("modal-overlay--open");
	}
}

export const toggleBottom = (element) => {

}