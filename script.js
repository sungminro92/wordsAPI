// ===========================*** WINDOW ONLOAD ***===========================
window.onload = function() {
    console.log("it's working");
    // console.log(test.definitions + test.synonyms);

    getWords("success");
    // console.log(WordData.words);
};
const searchButton = document.getElementById("search-button");
const input = document.getElementById("input-word");
const resultContainer = document.getElementById("result-container");
const clickedWordsContainer = document.getElementsByClassName("clicked-words-container");
const errorMessage = document.getElementById("error-message");
const wordAPI = "https://wordsapiv1.p.rapidapi.com/words/";

if (searchButton) {
    searchButton.addEventListener("click", function() {
      getSynonyms(getWords(input.value));
    })
}

if (input) {
    input.addEventListener("keyup", keyPress);
}

// PRESS ENTER AS TO CLICK SEARCH BUTTON
function keyPress(event) {
    if (event.keyCode === 13) {
        if (event.value !== undefined ) {
          input.value = event.value;
        }
        getWords(input.value);
    }
}

function clearError() {
  errorMessage.innerHTML = "";
}

function getWords(inputValue) {
  clearError();
  resultContainer.innerHTML = "";
  fetch(wordAPI + inputValue, {
    headers: {"X-Mashape-Key": "267a89e0c1msh4a664cb7046de60p1abc82jsna3d384a0934e"}
  })
  .then((resp) => resp.json())
  .then(function(data) {
    if(!data.success) {
      // console.log(data.message);
      if(data.message === undefined) {

      } else {errorMessage.innerHTML = data.message;}
    }
    let synonymsResults = data.results
      .map(result => result.synonyms)
      .filter(synonym => synonym)
      .flatMap(synonym => synonym);
    console.log(synonymsResults);
    for(let i=0; i<synonymsResults.length; i++) {
        let wordValue = synonymsResults[i];
        let wordDiv = document.createElement('div');
        wordDiv.innerHTML = wordValue;
        wordDiv.setAttribute("class", "words");
        wordDiv.addEventListener('click', function() {
          input.value = wordValue;
          clikedWords(wordValue);
          getWords();
        });
        resultContainer.appendChild(wordDiv);
    }
  })

}

function getSynonyms(data) {
  console.log(data);
  // let synonymsResult = data.results
  // .map(result => result.synonyms)
  // .filter(synonym => synonym)
  // .flatMap(synonym => synonym);
  // console.log(synonymsResult);
}

function clikedWords(word) {
    let clickedWordDiv = document.createElement("div");
    let x = document.createElement('a');
    x.innerHTML ="  x";
    x.style.color = "red";
    x.style.padding = "2px 3px 2px 3px";
    clickedWordDiv.innerHTML = word;
    clickedWordDiv.setAttribute("class", "words");
    clickedWordDiv.appendChild(x);
    $(".clicked-words-container").append(clickedWordDiv);
    clickedWordDiv.style.flexDirection = "column";
    x.addEventListener('click', remove, false);
}

function remove() {
    this.parentNode.remove();
}


const WordData = {
  words: [],
  definitions: true,
  synonyms: false,
  antonyms: false,

// SAVING WORD INTO WORDS DATA
  assignWord: function(definitions, partOfSpeech, synonyms, antonyms, examples) {
    this.words.push(new Word(definitions, partOfSpeech, synonyms, antonyms, examples));
  }
}

function displayResults() {
  getWords();
}

function Word(definitions, partOfSpeech, synonyms, antonyms, examples) {
  this.definitions = definitions;
  this.synonyms = synonyms;
  this.antonyms = antonyms;
  this.examples = examples;
  this.partOfspeech = partOfSpeech
}
