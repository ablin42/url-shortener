let clipboard = document.querySelectorAll("[data-clipboard]");
if (clipboard)
	clipboard.forEach(item => {
		item.addEventListener("click", e => {
			e.preventDefault();

			let toCopy = document.querySelector("#clipper").value;
			let tooltip = document.querySelector(".tooltiptext");
			if (!tooltip.classList.contains("tooltip-visible")) {
				tooltip.classList.add("tooltipAnim");
				tooltip.classList.add("tooltip-visible");
				setTimeout(() => {
					tooltip.classList.remove("tooltip-visible");
					tooltip.classList.remove("tooltipAnim");
				}, 1000);
			}

			copyClipboard(toCopy);
		});
	});

$(".search-txt").keyup(function () {
	if ($(this).val()) {
		$(".search-btn").css("opacity", 1);
		$(".search-btn").css("transform", "rotate(0deg)");
	} else {
		$(".search-btn").css("opacity", 0);
		$(".search-btn").css("transform", "rotate(45deg)");
	}
});

function copyClipboard(value) {
	let tempInput = document.createElement("input");
	tempInput.value = value;

	document.body.appendChild(tempInput);
	tempInput.select();
	document.execCommand("copy");
	document.body.removeChild(tempInput);
}

/*
document.onkeypress = function (e) {
	e = e || window.event;

	if (e.keyCode === 13) {
		document.documentElement.classList.toggle("dark-mode");

		document.querySelectorAll(".inverted").forEach(result => {
			result.classList.toggle("invert");
		});
	}
};*/

let checkbox = document.querySelector("input[name=theme]");
checkbox.addEventListener("change", function () {
	if (this.checked) {
		trans();
		document.documentElement.setAttribute("data-theme", "dark");
	} else {
		trans();
		document.documentElement.setAttribute("data-theme", "light");
	}
});

let trans = () => {
	document.documentElement.classList.add("transition");
	window.setTimeout(() => {
		document.documentElement.classList.remove("transition");
	}, 750);
};

function triggerAnimations() {
	let toAnimate = document.querySelectorAll(`[data-animation]`);

	toAnimate.forEach(item => {
		item.addEventListener("animationend", function () {
			item.classList.remove(animationName);
		});

		let animationName = item.dataset.animation;
		item.classList.add(animationName);
	});
}

window.onload = "triggerAnimations()";
