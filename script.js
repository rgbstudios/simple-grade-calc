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
	});

	updateGrade();
	curGrade.select();
});

function updateGrade() {
	let current_grade = parseFloat(curGrade.val() );
	let assignment_weight = parseFloat(assWeight.val() );
	let assignment_score = parseFloat(assScore.val() );
	let final_grade = parseFloat(finGrade.val() );

	if($('#calcToggle').prop('checked') ) { // final grade
		if(isNaN(current_grade) || isNaN(assignment_weight) || isNaN(assignment_score) ) {
			warningText.html('Please enter current grade, assignment weight, and assignment score').show();
		} else if(!isValid(current_grade) || !isValid(assignment_weight,0,100) || !isValid(assignment_score) ) {
			warningText.html('Current grade must be at least 0, assignment weight must be between 0 and 100, and assignment score must be at least 0').show();
		} else {
			warningText.html('').hide();
			let result = (current_grade*(100-assignment_weight)/100)+(assignment_score*assignment_weight/100);
			result = round(result);
			finGrade.val(result);
		}
	} else { // assignment grade
		if(isNaN(current_grade) || isNaN(assignment_weight) || isNaN(final_grade) ) {
			warningText.html('Please enter current grade, assignment weight, and final grade').show();
		} else if(!isValid(current_grade) || !isValid(assignment_weight,0,100) || !isValid(final_grade) ) {
			warningText.html('Current grade must be at least 0, assignment weight must be between 0 and 100, and final grade must be at least 0').show();
		} else {
			warningText.html('').hide();
			result = (final_grade-(current_grade*(100-assignment_weight)/100) )/assignment_weight*100;
			result = round(result);
			assScore.val(result);
		}
	}
}

const isValid = (num, min=0, max=Infinity) => !isNaN(num) && num!=Infinity && num >= min && num <= max;

const round = (num, places=3) => Number( (num).toFixed(places) );
