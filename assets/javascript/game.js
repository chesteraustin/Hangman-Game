$( document ).ready(function() {
	var myWord = "";
	var newErrorCount;
	pickWordAJAX();

	function pickWordAJAX(){
		//Github pages runs on HTTPS, can't use this API
/*
		var requestStr = "http://randomword.setgetgo.com/get.php";
 		myWordAJAX = $.ajax({
  			type: "GET",
  			url: requestStr,
 			dataType: "jsonp",
 			jsonpCallback: 'RandomWordComplete
 			RandomWordComplete(response);
 			}
  		});
*/
		var requestStr = "assets/javascript/words.json";

		myWordAJAX = $.ajax({
			type: "GET",
			url: requestStr,
			success: function(response) {
//				console.log(response)
				RandomWordComplete(response);
			}
		});
	}

});

function RandomWordComplete(data) {
	var errorCounter = 0;

	//Put letters into cards
	for(var i = 65; i < 91; i++){
		var myLetter = String.fromCharCode(i)
		$("#letterCards").append(''
			+'<div id="letter_'+ myLetter +'" class="card selectedLetter text-center">'
			+	'<div class="card-block selectedLetter">'
			+		'<!--Card content -->'
			+		'<p class="card-text selectedLetter">' + myLetter + '</p>'
			+	'</div>'
			+'</div>'
			)
	}
		//Github pages runs on HTTPS, can't use this API
/*
	myWord = data.Word.toUpperCase();
*/
	wordPosition = Math.floor(Math.random()*data.Words.length);
	myWord = data.Words[wordPosition].toUpperCase();
	displayWord(myWord);

	//Listen for click
	//Bug where if clicked, multiple clicks are registered
	$(".selectedLetter").on("click", function(){
		//Letter of selected card
		console.log($(this));
		var selectedLetter = $(this).text();
		$($(this)).removeClass()
				.addClass("cardPlayed");
		correctLetter = checkLetter(selectedLetter);

		if (correctLetter == false) {
			showPart(errorCounter);
			errorCounter++;
		}

		//check for win
		checkWin(correctLetter);
	})

	//Listen for Keyup
	document.onkeyup = function(event){
		var correctLetter;
		var selectedLetter = event.key;

		//only letters are valid choices, anything else won't count
		if (event.which <= 90 && event.which >= 65) {
		$("#letter_" + selectedLetter.toUpperCase()).removeClass("card")
					.addClass("cardPlayed");
			correctLetter = checkLetter(selectedLetter);

			if (correctLetter == false) {
				showPart(errorCounter);
				errorCounter++;
			}
			//check for win
			checkWin(correctLetter);
		}
	}

	function showPart(errorCounter){
		$($("#hangmanBody .bodyPart")[errorCounter]).show();
		console.log(errorCounter)
		if (errorCounter == 5) {
			console.log("i lost")
		}
	}

}

function pickWord(){
	myWord = "Hello World";
	return myWord;
}

function displayWord(selectedWord){
	for(var i = 0; i < selectedWord.length; i++){
		this.letter = selectedWord.charAt(i);
		if (this.letter != ' ') {
			$("#hiddenWord").append("<span id='pos_"+ i +"'> _ </span>");
		}
		else {
			$("#hiddenWord").append(" ");
		}
	}
}

function checkWin(){
	var currentLetters = $("#hiddenWord").text();
	if (currentLetters == myWord) {
	console.log("i win")
	}
}

function checkLetter(letterToCheck){
	goodTurn = false;
	for(var i = 0; i < myWord.length; i++) {
		if(letterToCheck.toUpperCase() == myWord.charAt(i)) {
			//Show in Page
			$("#pos_" + i).text(letterToCheck.toUpperCase());
			goodTurn = true;
		}
		else {
		} 
	}
	return goodTurn
}