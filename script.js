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
      if(finGrade.prop('disabled') ) {
      	finGrade.prop('disabled', '');
      	assScore.prop('disabled', 'true');
      } else {
      	finGrade.prop('disabled', 'true');
      	assScore.prop('disabled', '');
      }
    });

    updateGrade();
    curGrade.select();
});

function updateGrade() {
	let current_grade = parseInt(curGrade.val() );
	let assignment_weight = parseInt(assWeight.val() );
	let assignment_score = parseInt(assScore.val() );
	let final_grade = parseInt(finGrade.val() );

	if($('#calcToggle').prop('checked') ) { //calc final grade
		if(isNaN(current_grade) || isNaN(assignment_weight) || isNaN(assignment_score) ) {
			warningText.html('Please enter current grade, assignment weight, and assignment score').css('display','');
		} else if(current_grade<0 || assignment_weight<0 || assignment_weight>100 || assignment_score<0) {
			warningText.html('Current grade must be at least 0, assignment weight must be between 0 and 100, and assignment score must be at least 0').css('display','');
		} else {
			warningText.html('').css('display','none');
			let result = (current_grade*(100-assignment_weight)/100)+(assignment_score*assignment_weight/100);
			finGrade.val(result);
		}
	} else { //calc assignment grade
		if(isNaN(current_grade) || isNaN(assignment_weight) || isNaN(final_grade) ) {
			warningText.html('Please enter current grade, assignment weight, and final grade').css('display','');
		} else if(current_grade<0 || assignment_weight<0 || assignment_weight>100 || final_grade<0) {
			warningText.html('Current grade must be at least 0, assignment weight must be between 0 and 100, and final grade must be at least 0').css('display','');
		} else {
			warningText.html('').css('display','none');
			result = (final_grade-(current_grade*(100-assignment_weight)/100) )/assignment_weight*100;
			assScore.val(result);
		}
	}
}
