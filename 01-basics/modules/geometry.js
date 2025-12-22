/**
 * Do all ze geometry-related thingz
 *
 * SUCH FUN!!!!!!11
 */

/**
 * Return the area of a square
 */
const areaOfSquare = (w, h) => {
	return w * h;
}

/**
 * Return the circumference of a circle
 */
const circumferenceOfCircle = (r) => {
	return 2 * Math.PI * r;
}

/**
 * Return the circumference of a square
 */
const circumferenceOfSquare = (w, h) => {
	return w * 2 + h * 2;
}

// Export all the stuff
module.exports = {
	areaOfCircle: (r) => { return Math.PI * r ** 2 },  // okey-ish, but better to create it with a docblock for documentation
	areaOfSquare,
	circumferenceOfCircle,
	circumferenceOfSquare,
}
