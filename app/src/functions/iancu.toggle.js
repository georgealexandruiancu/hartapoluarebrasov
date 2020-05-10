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
	var footer = document.querySelector(".side-bar__menu--footer");
	var bottomCharts = document.querySelector(".bottom-charts");

	if (side.offsetWidth === 200) {
		side.style.width = "60px";
		content.style.display = "none";
		footer.style.display = "none";
		bottomCharts.style.left = "60px";
		bottomCharts.style.width = "calc(100vw - 60px)";
		roateIconReverse(element.target, "AddClass");
	}
	else {
		side.style.width = "200px";
		bottomCharts.style.left = "200px";
		bottomCharts.style.width = "calc(100vw - 200px)";
		content.style.display = "initial";
		footer.style.display = "initial";
		roateIconReverse(element.target, "RemoveClass");
	}
}

export const makeActiveMenu = (element) => {

	var allMenuItems = document.querySelectorAll(".js-menu-item");

	for (var i = 0; i < allMenuItems.length; i++) {
		allMenuItems[i].classList.remove("active");
	}

	element.target.classList.add("active");
	console.log(element.target);
}

export const toggleBottom = (element) => {

}