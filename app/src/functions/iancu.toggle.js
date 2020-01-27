export const toggleSide = (element) => {

	const roateIconReverse = (icon, action) => {
		if (action === "AddClass") {
			icon.classList.add("rotate--180")
		}
		else if (action === "RemoveClass") {
			icon.classList.remove("rotate--180")
		}
	}

	var side = element.target.parentElement.parentElement.parentElement;
	var content = element.target.parentElement.parentElement.children[1];

	if (side.offsetWidth === 200) {
		side.style.width = "60px";
		content.style.display = "none";
		roateIconReverse(element.target, "AddClass");
	}
	else {
		side.style.width = "200px";
		content.style.display = "initial";
		roateIconReverse(element.target, "RemoveClass");
	}
}

export const toggleBottom = (element) => {

}