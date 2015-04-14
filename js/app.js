$(document).ready(function(){

    theAccordion = $( "#accordion" );
    theAccordion.accordion();

    numberOfQuestions = 0;

    var answers1 = ["Nero", "Julius Caesar", "Augustus", "Marcus Aurelius"];
    var question1 = new Question("1. Who was the first Emperor of Rome?",answers1, 2);
  	
   	var answers2 = ["Cicero", "Julius Caesar", "Sparticus", "Antony"];
    var question2 = new Question("2. Who was Augustus's adoptive uncle?",answers2, 2);
  	

  	theAccordion.accordion( "refresh" );
})

function Question(_questionText, _arrAnswers, _correctAnswer){
	this.questionText = _questionText || "Question Text";
	this.arrAnswers = _arrAnswers || new Array();

 	this.init = function(){
		createNewQuestionHTML(this.questionText, this.arrAnswers, _correctAnswer);
		numberOfQuestions++;
	}

	this.init();
}

function createNewQuestionHTML( _questionText, _arrAnswers, _correctAnswer){
	
		var answersHtmlString = "<h3>" + _questionText + "</h3>";

		answersHtmlString += "<div><ul id='answerList'>";

		$("#answerList").length;

		for(i in _arrAnswers){
			answersHtmlString += "<li><input type='radio' name='question" + numberOfQuestions + "' value=" + i + ">" + _arrAnswers[i] + "</li>";
		}

		answersHtmlString += "</ul></div>";

		theAccordion.append(answersHtmlString);
}
