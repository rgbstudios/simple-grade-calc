// https://stackoverflow.com/a/18473154/4907950

function polarToCartesian(cx, cy, r, deg) {
	let rad = (deg-90) * Math.PI / 180;

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

// https://www.smashingmagazine.com/2019/03/svg-circle-decomposition-paths/
function describeCircle(cx, cy, r) {
	return [
		'M', (cx-r), cy,
		'a', r, r, 0, 1, 0, (r*2), 0,
		'a', r, r, 0, 1, 0, (-r*2), 0
	].join(' ');
}

const drawArc = (percent)=> {
	let d;
	if(percent==1)
		d = describeCircle(16,16,12);
	else
		d = describeArc(16,16,12,0,percent*360);
	$('#weight-arc').attr('d', d);
};
