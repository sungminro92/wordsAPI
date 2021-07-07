// ===========================*** WINDOW ONLOAD ***===========================
window.onload = function() {
    console.log("it's working");
    // console.log(test.definitions + test.synonyms);
};


const WordData = {
  words: [],
  definitions: true,
  synonyms: false,
  antonyms: false,

  assignWord(definitions, partOfSpeech, synonyms, antonyms, examples){
    this.words[0] = new Word(definitions, partOfSpeech, synonyms, antonyms, examples);
  }
}

function Word(definitions, partOfSpeech, synonyms, antonyms, examples) {
  this.definitions = definitions;
  this.synonyms = synonyms;
  this.antonyms = antonyms;
  this.examples = examples;
}
