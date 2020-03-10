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
    //convert word into a displayable series of underscores
    toDisplay(guessed){
        //create default value for output
        let out= "";
        //iterate through the characters in val
        for(let i= 0; i<this.upperVal.length; i++){
            if(this.upperVal[i] == ' '){
                //if theres a ' ' create space between underscores recognizable as a space
                out= out + "<img src=\"assets/images/space.png\" class=\"letter\">";
            }else if(guessed.indexOf(this.upperVal[i]) == -1){
                //create blank if letter not guessed yet
                out= out + "<img src=\"assets/images/_.png\" class=\"letter\">";
            }else{
                //show letter has been guessed 
                out= out+ "<img src=\"assets/images/"+this.upperVal[i]+".png\" class=\"letter\">";
            }
        }
        //return the output
        return out+ "</span>";
    }

}


//event handler
function onKeyDown( event ){
    console.log(event.key);
    //check if key pressed is letter
    //set capitalization
    

};
//game
const game = {
    //variables

    //(re)start
    start : function() {
        //set all values to default
        //pick a random word
        //set game area to default
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
//check if letter is in word
    onCharacter : function(){
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