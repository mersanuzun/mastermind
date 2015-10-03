var colors = ["red", "blue", "yellow", "brown", "gray", "green", "black", "pink"];
var guesses = [];
var guessLimit = 10;
var hiddenColorLimit = 4;
var hiddenColors;
var selectedColorNumber = 0;
var guessNumber = 1;
$(document).ready(function(){
    var $table, $tr, $td;
    function drawBoard(){
        $table = $(".guessBoard tbody");
        for(var i = 1; i <= guessLimit + 1; i++){
            $tr = $("<tr></tr>");
            for(var j = 0; j < hiddenColorLimit + 1; j++){
                $td = $("<td></td>");
                if (j == hiddenColorLimit){
                    if (j == hiddenColorLimit && i == guessLimit + 1) break;
                    $td.addClass("result");
                    for (var k = 0; k < hiddenColorLimit; k++){
                       $td.append($("<div>").addClass("correctResult")); 
                    }
                    for (var l = 0; l < hiddenColorLimit; l++){
                        $td.append($("<div>").addClass("wrongResult")); 
                    }
                }else{
                    if (i == guessLimit + 1){
                        $td.addClass("hidden-color")
                        $td.append("<div id=hidden-color-"+ (j + 1) + ">")
                    }else{
                        $td.addClass("guess")
                        $td.append("<div id='guess" + i + j +"' class='guess-color'></div>");                    
                    }
                }
                $tr.append($td);
            }
            $table.append($tr);
        }
    }
    
    function setHiddenColors(){
        var tempIndexes = [];
        while(tempIndexes.length != hiddenColorLimit){
            var index = Math.floor((Math.random() * colors.length - 1) + 1);
            if (tempIndexes.indexOf(index) == -1){
                tempIndexes.push(index);
            }   
        }
        hiddenColors = new Guess();
        hiddenColors.setColors(tempIndexes);
    }
    
    setHiddenColors();
    $table = $(".colors tbody");
    $tr = $("<tr>");
    colors.forEach(function(color){
        $tr.append($("<td></td>").append($("<div style='background-color:" + color + "'></div>").addClass("selection-color")).data({colorIndex : colors.indexOf(color)}));
    })
    $table.append($tr);
    drawBoard();
    
    //event listener
    var guessColors = [];
    var guess;
    $(".colors td").on("click", function(){
        $that = $(this);
        $that.hide();
        guessColors.push($that.data("colorIndex"));
        $("#guess" + guessNumber + selectedColorNumber++).css("background-color", colors[$that.data("colorIndex")]);
        if (selectedColorNumber == 4){
            guess = new Guess(); // create a new guess objects
            guess.setColors(guessColors); // setting colors
            guess.checkColors(hiddenColors); // check colors
            console.log(guess)
            $(".colors tbody td").each(function(){
                $(this).show();
            });
            guessColors = [];
            selectedColorNumber = 0;
            guessNumber++;
            guesses.push(guess); // guess is pushed to global guesses variable
        }
    })
    /*
    a = new Guess()
    a.setColors([1,9,4,8])
    b = new Guess()
    b.setColors([1,4,2,8])
    b.checkColors(a)*/
})