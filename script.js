// ===========================*** WINDOW ONLOAD ***===========================
window.onload = function() {
    console.log("it's working");
    // console.log(test.definitions + test.synonyms);

    // getWords("success");
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

    // console.log(data.results);
    let synonymsResults = data.results
      .map(result => result.synonyms)
      .filter(synonym => synonym)
      .flatMap(synonym => synonym);

    let partOfSpeechResults = data.results
      .map(result => result.partOfSpeech);

    let definitionResults = data.results
      .map(result => result.definition);
    // console.log(synonymsResults);

    for(let i=0; i<synonymsResults.length; i++) {
        let wordValue = synonymsResults[i];
        let wordDiv = document.createElement('div');
        wordDiv.innerHTML = wordValue;
        wordDiv.setAttribute("class", "words");
        wordDiv.addEventListener('click', function() {
          input.value = wordValue;
          clikedWords(wordValue);
        });
        resultContainer.appendChild(wordDiv);
    }
  })
}

function getSynonyms(data) {
  // console.log(data);
  // let synonymsResult = data.results
  // .map(result => result.synonyms)
  // .filter(synonym => synonym)
  // .flatMap(synonym => synonym);
  // console.log(synonymsResult);
}

function clikedWords(word) {
    // WordData.assignWord(object);
    getWords(word);

    fetch(wordAPI + word, {
      headers: {"X-Mashape-Key": "267a89e0c1msh4a664cb7046de60p1abc82jsna3d384a0934e"}
    })
    .then((resp) => resp.json())
    .then(function(data) {
      if(!data.success) {
        // console.log(data.message);
        if(data.message === undefined) {

        } else {errorMessage.innerHTML = data.message;}
      }

        // let partOfSpeechResults = data.results
        //   .map(result => result.partOfSpeech);
        console.log(data);
        let partOfSpeechResults = data.results
        .map( result => new Word(word, result.definition, result.partOfSpeech));
        console.log(partOfSpeechResults);
        // let definitionResults = data.results
        //   .map(result => result.definition);

        // console.log(partOfSpeechResults);
        // console.log(definitionResults);

        // WordData.assignWord(word, definitionResults, partOfSpeechResults);
        // console.log(WordData.words);
    })


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
  definitions: [],
  partOfspeech: [],

// SAVING WORD INTO WORDS DATA
  // assignWord: function(definitions, partOfSpeech, synonyms, antonyms, examples) {
  //   this.words.push(new Word(definitions, partOfSpeech, synonyms, antonyms, examples));
  // }
  assignWord: function(wordValue, definitions, partOfSpeech) {
    this.words.push(new Word(wordValue, definitions, partOfSpeech));
  }

}

function displayResults() {
  getWords();
}

function Word(word, definitions, partOfSpeech) {
  this.word = word;
  this.definitions = definitions;
  // this.synonyms = synonyms;
  // this.antonyms = antonyms;
  // this.examples = examples;
  this.partOfspeech = partOfSpeech
}
