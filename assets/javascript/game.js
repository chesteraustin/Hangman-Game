$( document ).ready(function() {
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

	var myWord = pickWord();
	displayWord(myWord);

	//Listen for click
	$(".selectedLetter").on("click", function(){
		//Letter of selected card
		var selectedLetter = $(this).text();
		checkLetter(selectedLetter);
	})


	function pickWord(){
		var currentWord = "hello world";
		return currentWord;
	}

	function displayWord(selectedWord){
		for(var i = 0; i < selectedWord.length; i++){
			this.letter = selectedWord.charAt(i);
//			console.log(this.letter);
			if (this.letter != ' ') {
				$("#hiddenWord").append("<span id='pos_"+ i +"'> _ </span>");
			}
			else {
				$("#hiddenWord").append("-");
			}

		}
	}

	function checkLetter(letterToCheck){
		for(var i = 0; i < myWord.length; i++) {
			if(letterToCheck.toUpperCase() == myWord.charAt(i).toUpperCase()) {
				//Show in Page
				$("#pos_" + i).text(letterToCheck.toUpperCase());
			}
			else {
				console.log("I'm NOT here")
			}
		}
	}
});