// https://stackoverflow.com/a/18473154/4907950

function polarToCartesian(cx, cy, r, deg) {
	let rad = (deg-90) * Math.PI / 180.0;

	return {
		x: cx + (r * Math.cos(rad) ),
		y: cy + (r * Math.sin(rad) )
	};
}

function describeArc(x, y, r, startAngle, endAngle){
	let start = polarToCartesian(x, y, r, endAngle);
	let end = polarToCartesian(x, y, r, startAngle);
	let largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

	return [
		'M', start.x, start.y, 
		'A', r, r, 0, largeArcFlag, 0, end.x, end.y
	].join(' ');
}

const drawArc = (percent)=> $('#weight-arc').attr('d', describeArc(16,16,12,0,percent*360) );
