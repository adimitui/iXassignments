var backgroundOverlay = document.querySelectorAll(".lightbox")[0];

function getFormValues() {
	console.log(document.getElementById("first").value);
	console.log(document.getElementById("last").value);
}

function changeColor() {
	document.getElementById("color-div").style.color = "red";
}

function toggleImage() {
	backgroundOverlay.classList.add("isVisible");
}

document.getElementById("name-btn").onclick = function() {
	getFormValues();
};

document.getElementById("color-btn").onclick = function() {
	changeColor();
}
document.getElementById("image-btn").onclick = function() {
	toggleImage();
}

backgroundOverlay.onclick = function() {
	backgroundOverlay.classList.remove("isVisible");
}