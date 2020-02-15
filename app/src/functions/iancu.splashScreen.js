export const ModifySizeCol = () => {

	let deviceHeight = window.innerHeight;
	let deviceWidth = window.innerWidth;
	let cols = document.getElementsByClassName("js-controler-height");
	let child = document.getElementsByClassName("js-controler-height-child")[0];

	let modifierSize;

	if (deviceWidth <= 768) {
		let modifierHolder = child ? deviceHeight / 2 + (child.offsetHeight - deviceHeight / 2 ) :  deviceHeight / 2;
		modifierSize = modifierHolder + "px";
	}
	else {
		modifierSize = deviceHeight + "px";
	}

	if(cols.length > 1) {
		for (var i=0; i<cols.length; i++) {
			cols[i].style.minHeight = modifierSize;
		}
	}
	else {
		cols[0].style.minHeight = deviceHeight + "px";
	}

}
