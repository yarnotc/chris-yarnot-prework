//#DEFINES
const MAXIMUM_GUESSES=  10; //number of wrong guesses before a loss
const MAXIMUM_MANA= 10; //maximum number of stars on the magic bar 
const MANA_HEIGHT= 24;  //height per mana.

//document constants
const docWinCounter=    document.querySelector("#wins");
const docLoseCounter=   document.querySelector("#losses");
// [wins]/[losses]
const docWLCounter=      document.querySelector("#winLoseCounter");
//the word/phrase in the play area "_ O _ _ O _   _ N I G H T"
const docWord=          document.querySelector("#word");
//the list of incorrectly guessed letters
const docGuessed=       document.querySelector("#guessed");
//the number of remaining guesses before a loss
const docRemainCounter= document.querySelector("#remaining");
//decorative health bar (controlled by reamining guesses)
const docHealthBar=     document.querySelector("#health");
//decorative mana bar (controlled by wins losses)
const docManaBarFull=   document.querySelector("#manaFull");
const docManaBarEmpty=  document.querySelector("#manaEmpty");
//Congrats/too bad! the phrase was [phrase]
const docWinLoseMess=   document.querySelector("#winLoseMessage");

const docWinLoseDet=    document.querySelector("#winLoseDetails");

class word{
    val= "";
    upperVal= "";
    details= "";
    musicURL= "";
    musicDetails= "";
    constructor(val, details, musicURL, musicDetails){
        this.val= val;
        this.upperVal= val.toUpperCase();
        this.details= details;
        this.musicURL= "";
        this.musicDetails= "";
    }
    //check to see if character is in word
    isInWord(c){
        return (this.upperVal.indexOf(c) != -1);
    }
    //convert word into a displayable series of underscores/characters
    toHangman(guessed){
        //create default value for output
        let out= "";
        //iterate through the characters in val
        for(let i= 0; i<this.upperVal.length; i++){
            if(this.upperVal[i] == ' '){
                //if theres a ' ' create space between underscores recognizable as a space
                out= out + " ";
            }else if(guessed.indexOf(this.upperVal[i]) == -1){
                //create "_" if letter not guessed yet
                out= out + "_";
            }else{
                //show letter has been guessed 
                out= out+ this.upperVal[i];
            }
        }
        //return the output
        return out;
    }
    //check to see if the player has guessed all the characters
    hasWon(guessed){
        //add a " " to the guessed list
        guessed= guessed + " ";
        //iterate through the characters in val
        for(let i= 0; i<this.upperVal.length; i++){
            //if the character hasn't been guessed yet return false
            if(guessed.indexOf(this.upperVal[i]) == -1){
                return false;
            }
        }
        //after iterating through all letters have been checked return true
        return true;
    }
}


//event handler
function onKeyDown( event ){
    let key= event.key;
    //check if key pressed is letter
    if(key.length != 1){
        return;
    }
    key= key.toUpperCase()[0];
    if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(key) == -1){
        return;
    }
    //call game on character
    game.onCharacter(key);

};
//the font I'm using for my theme is an array of pictures so this is needed
function stringToHTML(str){
    //initiallize the output
    let out= "<div class=\"letters row\">";
    for(let i=0; i<str.length; i++){
        if(str[i] == " "){
            //if letter is a " " new line
            out= out + "</div><div class=\"letters row\">";
        }else{
            //otherwise add the image for the character
            out= out+ "<img src=\"assets/images/" 
                + str[i] + ".png\" class=\"letter\">";
        }
    }
    //return the output with the ending
    return out+ "</div>";
}

//game
const game = {
    //variables
    currentWord:    new word("Hollow Knight","<span>Hollow Knight is an indie game.</span>"),
    possibleWords:  [],
    wins:           0,
    losses:         0,
    guessRemain:    MAXIMUM_GUESSES,
    wrongLetters:   "",
    rightLetters:   "",
    //update things that change when you're wrong:
    //healthbar, remaining counter, and guessed letters
    updateWrong: function(){
        //iterate 0->MAX_GUESSES
        
        //update the document
        docHealthBar.style.width= (this.guessRemain*100/MAXIMUM_GUESSES) + "%";
        //update remaining guesses counter
        docRemainCounter.innerText= "Guesses Remaining: " + this.guessRemain + "/" + MAXIMUM_GUESSES;
        //update guessed letters
         //convert string to pictures
         //update guessed letters HTML
        docGuessed.innerHTML= stringToHTML(this.wrongLetters);
    },
    //update things that change when you're right:
    //the word
    updateRight : function(){
        //convert word to displayable series of underscores/characters
        let str= this.currentWord.toHangman(this.rightLetters);
        //add spacers to center the word vertically
        if(str.indexOf(" ") == -1){
            //if the word has no spaces (takes up 1 row)
            str= "  "+ str +"  ";
        }
        if(str.indexOf(" ") == str.lastIndexOf(" ")){
            //if the word has 1 space (takes up 2 rows)
            str= " " + str + " ";
        }
        //convert word to pictures
        //update word display
        docWord.innerHTML= stringToHTML(str);
    },
    //this isn't necessary for the game to work but it'll look nice
    updateMagicBar : function(){
        //update the W/L at the top
        docWLCounter.innerText= this.wins + "/" + this.losses;
        let games= this.wins + this.losses;
        //if fewer games than MAX_MANA have been played 
        
        //set height to be propotional to wins
        docManaBarFull.style.height= (this.wins*100/games)+"%";
        if(games < MAXIMUM_MANA){
            //make the # of stars total= to the number of games
            docManaBarEmpty.style.height= (MANA_HEIGHT * games) + "px";
        }else{
            //make the # of stars MAX_MANA
            docManaBarEmpty.style.height= (MANA_HEIGHT * MAXIMUM_MANA) + "px";
        }
    },

    //(re)start
    start : function() {
        //set all values to default
        this.wrongLetters=  "";
        this.rightLetters=  "";
        this.guessRemain= MAXIMUM_GUESSES;

        //pick a random word
        if(this.possibleWords.length > 1){
            let rand= Math.random()* this.possibleWords.length;
            rand= Math.floor(rand);
            if(rand>= this.possibleWords.length){
                this.possibleWords.length;
            }
            this.currentWord= this.possibleWords[rand];
        }
        //set game area to default
        this.updateWrong();
        this.updateRight();
    },
    
    //when a character is pressed
    onCharacter : function(key){
        //check if character was already checked
        if((this.wrongLetters.indexOf(key) != -1) || (this.rightLetters.indexOf(key) != -1)){
            return;
        }
        console.log(key);
        //check if character is in word
        if (this.currentWord.isInWord(key)){
            //update characters
            this.rightLetters= this.rightLetters + key;
            //update stuff that changes when you get a letter right
            this.updateRight();
            if(this.currentWord.hasWon(this.rightLetters)){
                //call win
                this.onWinLose(true);
            }else{
                this.updateRight();
            }
        } else {
            //subtract 1 from letters remaining
            this.guessRemain--;
            //check if letters remaining is 0
            if(this.guessRemain == 0) {
                //call loss
                this.onWinLose(false);
            }else{
                //update guessed letters and letters remaining
                this.wrongLetters= this.wrongLetters + key;
                this.updateWrong();
            }

        }
    },

    //on win or loss
    onWinLose : function(hasWon){
        if(hasWon){
            console.log("WINNER WINNER CHICKEN DINNER!!");
            
            //update wins
            this.wins ++;
            docWinCounter.innerText= this.wins;
            //show congrats message
            docWinLoseMess.innerText= "Congrats! The game was " + this.currentWord.val + "!";
            //play music? 
                //many music scripts for js seem to be queue based
                //so the problem in the video is probably that the first song 
                //was still playing when the second song started.
        } else {
            console.log("TO BAD");
            //update losses
            this.losses ++;
            docLoseCounter.innerText= this.losses;
            //show lose message
            docWinLoseMess.innerText= "Too Bad! The game was " + this.currentWord.val + ".";
        }
        //show description
        docWinLoseDet.innerHTML= this.currentWord.details;
        this.updateMagicBar();
        //restart game
        this.start();
    }
};
//on startup

//load words data from hidden index
let phrases= document.querySelectorAll("#phrase");
let phraseDescs= document.querySelectorAll("#phraseDesc");
for(i= 0; i<phrases.length; i++){
    game.possibleWords.push(new word(phrases[i].innerText, phraseDescs[i].innerHTML));
}
//initialize win/lose count (default values setup)
//add event listener
window.addEventListener("keydown", onKeyDown);
//(re)start game
game.start();