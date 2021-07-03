// Whever mouse at 100 units away from button, we start moving the button
const OFFSET = 100;

evil_btn.addEventListener("click", e => {
	alert("Nice Try");
	window.close();
});

document.addEventListener("mousemove", e => {
	const x = e.pageX;
	const y = e.pageY;

	const buttonBox = evil_btn.getBoundingClientRect();

	const boxCoords = {
		x1: buttonBox.left,
		y1: buttonBox.top,
		x2: buttonBox.right,
		y2: buttonBox.bottom,
		cx: (buttonBox.left + buttonBox.right) >> 1,
		cy: (buttonBox.top + buttonBox.bottom) >> 1,
	};

	const horizontalDist = x - boxCoords.cx;
	const verticalDist = y - boxCoords.cy;

	const horizontalOffset = buttonBox.width / 2 + OFFSET;
	const verticalOffset = buttonBox.height / 2 + OFFSET;

	// Check if mouse has crossed the x and y offset
	if (
		Math.abs(horizontalDist) <= horizontalOffset &&
		Math.abs(verticalDist) <= verticalOffset
	) {
		moveButtonTo(
			boxCoords.x1 + (horizontalOffset / horizontalDist) * 10,
			boxCoords.y1 + (verticalOffset / verticalDist) * 10,
			boxCoords
		);
	}
});

/**
 *  Move button to provided new coordinates
 *  @param  {int} left x-coordinate to move to
 *  @param  {int} top y-coordinate to move to
 *  @param  {Object} boxCoords coordinates of button
 *  @return {void}
 */
const moveButtonTo = (left, top, boxCoords) => {
	const windowBox = document.body.getBoundingClientRect();
	// console.log("before", left);
	// if on moving button will cross left side of window
	if (left + (boxCoords.cx - boxCoords.x1) < windowBox.left) {
		left = windowBox.right - (boxCoords.x2 - boxCoords.cx) - OFFSET;
	}
	// if on moving button will cross right side of window
	if (left + (boxCoords.cx - boxCoords.x1) > windowBox.right) {
		left = windowBox.left + OFFSET;
	}
	// if on moving button will cross top side of window
	if (top + (boxCoords.cy - boxCoords.y1) < windowBox.top) {
		top = windowBox.bottom - (boxCoords.y2 - boxCoords.cy) - OFFSET;
	}
	// if on moving button will cross bottom side of window
	if (top + (boxCoords.cy - boxCoords.y1) > windowBox.bottom) {
		top = windowBox.top + OFFSET;
	}
	// console.log("after", left);
	evil_btn.style.top = `${top}px`;
	evil_btn.style.left = `${left}px`;
};
