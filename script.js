// ===========================*** WINDOW ONLOAD ***===========================
window.onload = function() {
    console.log("it's working");
    // console.log(test.definitions + test.synonyms);

    console.log(WordData.words);
};


const WordData = {
  words: [],
  definitions: true,
  synonyms: false,
  antonyms: false,

  assignWord: function(definitions, partOfSpeech, synonyms, antonyms, examples) {
    this.words.push(new Word(definitions, partOfSpeech, synonyms, antonyms, examples));
  }
}


WordData.assignWord("this","thisss","th","thd","thids");
WordData.assignWord("thias","thissss","tfh","thddd","thsssds");

function Word(definitions, partOfSpeech, synonyms, antonyms, examples) {
  this.definitions = definitions;
  this.synonyms = synonyms;
  this.antonyms = antonyms;
  this.examples = examples;
  this.partOfspeech = partOfSpeech
}
