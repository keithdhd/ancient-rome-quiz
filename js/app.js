$(document).ready(function(){

    theAccordion = $( "#accordion" );
    theAccordion.accordion({ header: "h3", collapsible: true, active: false, fillSpace: true});

    numberOfQuestions = 0;
    questionStack = new Array();
    currentScore = 0;

    var answers1 = ["Nero", "Julius Caesar", "Augustus", "Marcus Aurelius"];
    var question1 = new Question("1. Who was the first Emperor of Rome?",answers1, 2);
  	
   	var answers2 = ["Cicero", "Julius Caesar", "Sparticus", "Antony"];
    var question2 = new Question("2. Who was Augustus's adoptive uncle?",answers2, 1);

   	var answers3 = ["True", "False"];
    var question3 = new Question("3. Rome was a Republic before it became an Empire.",answers3, 0);

   	var answers4 = ["Pompey", "Crassus", "Cato", "Scipio"];
    var question4 = new Question("4. Julius Caesar crossed the Rubicon to drive out who from Rome?",answers4, 0);

   	var answers5 = ["Battle of Queribus", "Battle of Actium", "Battle of Naples", "Battle of Alexandria"];
    var question5 = new Question("5. Octavian annihilated Egyptian forces in which battle?",answers5, 1);

  	theAccordion.accordion( "refresh" );
})

function Question(_questionText, _arrAnswers, _correctAnswer){
	this.questionText = _questionText || "Question Text";
	this.arrAnswers = _arrAnswers || new Array();
	this.rightOrWrong;

 	this.init = function(){
		createNewQuestionHTML(this.questionText, this.arrAnswers, _correctAnswer);
		numberOfQuestions++;
		questionStack[numberOfQuestions] = 0;
	}

	this.init();
}

function createNewQuestionHTML( _questionText, _arrAnswers, _correctAnswer){
	
		theAccordion.append("<h3>" + _questionText + "</h3>");

		var questionDiv = document.createElement("div");
		questionDiv.id = "questionDiv" + numberOfQuestions;
		theAccordion.append(questionDiv);

		var ulElement = document.createElement("ul");
		ulElement.id = "ulElement"+numberOfQuestions;
		$("#questionDiv"+numberOfQuestions).append(ulElement);

		for(i in _arrAnswers){
			$("#ulElement"+numberOfQuestions).append("<li><input type='radio' name='question" + numberOfQuestions + "' value=" + i + ">" + _arrAnswers[i] + "</li>");
		}

		var theAnswerButton = new Button("Submit Answer","#587DB4", _correctAnswer, numberOfQuestions, _questionText).init();
		$("#questionDiv"+numberOfQuestions).append(theAnswerButton);
}

function markAnswer(_userAnswer, _correctAnswer, _qNumber, _questionText){
	thisQuestionHeader = $("#ui-accordion-accordion-header-" + (_qNumber));

	if(_userAnswer == _correctAnswer){
		//Append a tick to question text
		thisQuestionHeader.html(_questionText + " &#x2714;");
		//Set header text to green
		thisQuestionHeader.css("color","green");		
		//Update currentScore. 
		questionStack[_qNumber] = 1;

	}
	else{
		//Append a cross to question text
		thisQuestionHeader.html(_questionText +  " &#x2718;");
		//Set header text to red
		thisQuestionHeader.css("color","red");
		questionStack[_qNumber] = 0;
	}

	currentScore = 0;
	//Set current-score 
	for(j in questionStack){
		if(questionStack[j] == 1){
			currentScore++;
		}
	}

	//This doesn't work! And doesn't show an error. Why not?
	//$("#current-score").text(currentScore);

	$(".score").text("Score: " + currentScore + "/5");
	theAccordion.accordion('option', {active: false});
}

function Button(_text, _color, _correctAnswer, _qNumber, _questionText){

	this.EL = document.createElement("button");

	this.color = _color || "#FFA500";
	this.text = _text || "Master Button";
	this.correctAnswer = _correctAnswer;

	this.init = function(){
		t = document.createTextNode(this.text);
		this.EL.appendChild(t);

		this.EL.addEventListener("click", function() {
			var userAnswer = $("input:radio[name=question" +_qNumber + "]:checked").val();
			if( typeof userAnswer != 'undefined'){
	    		markAnswer(userAnswer,_correctAnswer, _qNumber, _questionText);
	    	}
	    	else{
	    		alert("Please select answer!");
	    	}
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
