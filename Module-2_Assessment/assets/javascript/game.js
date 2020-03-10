//#DEFINES
const MAXIMUM_GUESSES=  10;

//document constants
const docWinCounter=    document.querySelector("#wins");
const docLoseCounter=   document.querySelector("#losses");
const docWord=          document.querySelector("#word");
const docGuessed=       document.querySelector("#guessed");
const docRemainCounter= document.querySelector("#remaining");
const docHealthBar=     document.querySelector("#health");
const docManaBar=       document.querySelector("#mana");

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
    isInWord(c){
        return (this.upperVal.indexOf(c.toUpperCase()) != -1);
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
                //create blank if letter not guessed yet
                out= out + "_";
            }else{
                //show letter has been guessed 
                out= out+ this.upperVal[i];
            }
        }
        //return the output
        return out;
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
    for(i=0; i<str.length; i++){
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
    currentWord:    new word("Hollow Knight","Hollow Knight is an indie game."),
    wins:           0,
    losses:         0,
    guessRemain:    MAXIMUM_GUESSES,
    wrongLetters:   "",
    rightLetters:   "",
    //update things that change when you're wrong:
    //healthbar, remaining counter, and guessed letters
    updateWrong(){
        //iterate 0->MAX_GUESSES
        let innerHTML= "";
        for(i= 0; i<MAXIMUM_GUESSES; i++){
            //add a full heart if i < remaining guesses and empty otherwise
            innerHTML= innerHTML + "<img src=\"assets/images/";
            if(i > this.guessRemain){
                innerHTML= innerHTML + "empty";
            }
            innerHTML= innerHTML + "heart.png\" class=\"hp\">";
        }
        //update the document
        docHealthBar.innerHTML= innerHTML;
        //update remaining guesses counter
        docRemainCounter.innerText= " " + this.guessRemain + "/" + MAXIMUM_GUESSES;
        //guessed letters
        //convert string to pictures
        //update guessed letters HTML
        docGuessed.innerHTML= stringToHTML(this.wrongLetters);
    },
    //update things that change when you're right:
    //the word
    updateRight(){
        //convert word to displayable series of underscores/characters
        let str= this.currentWord.toHangman(this.rightLetters);
        //convert word to pictures
        //update word display
        docWord.innerHTML= stringToHTML(str);
    },

    //(re)start
    start : function() {
        //set all values to default
        this.wrongLetters=  "",
        this.rightLetters=  "",
        this.guessRemain= MAXIMUM_GUESSES,

        //pick a random word
        //set game area to default
        this.updateWrong();
        this.updateRight();
    },
    //on win or loss
    onWinLose : function(hasWon){
        if(hasWon){
            //update wins
            //show congrats message
            //play music?
        } else {
            //update losses
            //show lose message
        }
        //show description
    },
    //when a character is pressed
    onCharacter : function(key){
        console.log(key);
        //check if character is in word
        if (true){
            //update word
            //check if word is complete
            if(true){
                //call win
            }
        } else {
            //subtract 1 from letters remaining
            //update guessed letters and letters remaining
            //check if letters remaining is 0
            if(true) {
                //call loss
            }

        }
    }

};
//on startup

//load words data from file? information
//initialize win/lose count
//(re)start game
//add event listener
window.addEventListener("keydown", onKeyDown);
game.start();