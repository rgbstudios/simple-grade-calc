let curGrade, assWeight, assScore, finGrade, warningText;

$( ()=> {
	curGrade = $('#curGrade');
	assWeight = $('#assWeight');
	assScore = $('#assScore');
	finGrade = $('#finGrade');
	warningText = $('#warningText');

	curGrade.keyup(updateGrade);
	assWeight.keyup(updateGrade);
	assScore.keyup(updateGrade);
	finGrade.keyup(updateGrade);

	$('#calcToggle').change( ()=> {
		let calcFinGrade = finGrade.prop('disabled');
		finGrade.prop('disabled', !calcFinGrade);
		assScore.prop('disabled', calcFinGrade);

		finGrade.parent().find('.input-group-text').toggleClass('highlight');
		assScore.parent().find('.input-group-text').toggleClass('highlight');
	});

	updateGrade();
	curGrade.select();
});

const isValid = (num, min=0, max=Infinity)=> !isNaN(num) && num!=Infinity && num >= min && num <= max;
const round = (num, places=4)=> Number( (num).toFixed(places) );
// const round = (num, places=4) => Math.round(num * Math.pow(10,places) ) / Math.pow(10,places);

const warn = (msg)=> warningText.html(msg).show();
const nowarn = ()=> warningText.html('').hide();

function updateGrade() {
	let current_grade = parseFloat(curGrade.val() );
	let assignment_weight = parseFloat(assWeight.val() );
	let assignment_score = parseFloat(assScore.val() );
	let final_grade = parseFloat(finGrade.val() );

	if($('#calcToggle').prop('checked') ) { // final grade
		if(isNaN(current_grade) || isNaN(assignment_weight) || isNaN(assignment_score) ) {
			warn('Please enter current grade, assignment weight, and assignment score');
			return;
		}
		if(!isValid(current_grade) || !isValid(assignment_weight,0,100) || !isValid(assignment_score) ) {
			warn('Current grade must be at least 0, assignment weight must be between 0 and 100, and assignment score must be at least 0');
			return;
		}
		finGrade.val(round(current_grade*(100-assignment_weight)/100)+(assignment_score*assignment_weight/100) );
	}
	else { // assignment grade
		if(isNaN(current_grade) || isNaN(assignment_weight) || isNaN(final_grade) ) {
			warn('Please enter current grade, assignment weight, and final grade');
			return;
		}
		if(!isValid(current_grade) || !isValid(assignment_weight,0,100) || !isValid(final_grade) ) {
			warn('Current grade must be at least 0, assignment weight must be between 0 and 100, and final grade must be at least 0');
			return;
		}
		assScore.val(round( (final_grade-(current_grade*(100-assignment_weight)/100) )/assignment_weight*100) );
	}
	nowarn();
	drawArc(assignment_weight/100);
}
