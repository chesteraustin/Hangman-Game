$( document ).ready(function() {
	var errorCounter = 0;
	var goodTurn = false;

	//Put letters into cards
	for(var i = 65; i < 91; i++){
		var myLetter = String.fromCharCode(i)
		$("#letterCards").append(''
			+'<div id="letter_'+ myLetter +'" class="card card-outline-primary mb-3 text-center">'
			+	'<div class="card-block selectedLetter">'
			+		'<blockquote class="card-blockquote">'
			+			'<h1>'+ myLetter + '</h1>'
			+		'</blockquote>'
			+	'</div>'
			+'</div>'
			)
	}

	var myWord = pickWord().toUpperCase();
	displayWord(myWord);

	//Listen for click
	$(".selectedLetter").on("click", function(){
		//Letter of selected card
		var selectedLetter = $(this).text();
		checkLetter(selectedLetter);

		//check for win
	})

	//Listen for Keyup
	document.onkeyup = function(event){
		var selectedLetter = event.key;
		correctLetter = checkLetter(selectedLetter);
		console.log("correctLetter : " + correctLetter);

		if (correctLetter == false) {
			showPart();
		}

//		console.log(correctLetter);
		//check for win
		checkWin(correctLetter);
	}

	function pickWord(){
		var currentWord = "hello world";
		return currentWord;
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

	function checkWin(){
		var currentLetters = $("#hiddenWord").text();
		if (currentLetters == myWord) {
		console.log("i win")
		}
	}

	function showPart(goodTurn){
		$($("#hangmanBody .bodyPart")[errorCounter]).show();
		errorCounter++;
		if (errorCounter == 6) {
			alert("Game Over. You Lost.")
			console.log("i lost")
		}
	}

});