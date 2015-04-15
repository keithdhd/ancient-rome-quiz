$(document).ready(function(){

    theAccordion = $( "#accordion" );
    theAccordion.accordion({ header: "h3", collapsible: true, active: false, fillSpace: true});

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

		answersHtmlString += "<div><ul class='answerList'>";

		$("#answerList").length;

		for(i in _arrAnswers){
			answersHtmlString += "<li><input type='radio' name='question" + numberOfQuestions + "' value=" + i + ">" + _arrAnswers[i] + "</li>";
		}

		answersHtmlString += "</ul>";

		var theAnswerButton = new Button("Submit Answer","#587DB4", _correctAnswer).init();

		answersHtmlString += theAnswerButton.outerHTML + "</div>";
		theAccordion.append(answersHtmlString);
}

function markAnswer(){
	alert(this.correctAnswer);
}

function Button(_text, _color, _correctAnswer){

	this.EL = document.createElement("button");

	this.color = _color || "#FFA500";
	this.text = _text || "Master Button";
	this.clickable = true;
	this.correctAnswer = _correctAnswer;

	//this.EL.onclick = function(){markAnswer(_correctAnswer)};



	this.init = function(){
		t = document.createTextNode(this.text);
		this.EL.appendChild(t);

		this.EL.addEventListener("click", function() {
	    	markAnswer(this.correctAnswer);
		});

		this.EL.style.backgroundColor = this.color;
		this.EL.style.color = 'white';
		this.EL.style.border = 'none';
	    this.EL.style.padding = '5px';
	    this.EL.style.margin = '10px';
	    this.EL.style.width = '150px';
	    this.EL.style.borderRadius = '10px';
	    this.EL.style.fontSize = '14px';
	    this.EL.style.outline = 0;

	   return this.EL;
	}

}
