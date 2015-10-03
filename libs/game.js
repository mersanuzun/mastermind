var colors = ["red", "blue", "yellow", "brown", "gray", "green", "black", "pink"];
var guesses = [];
var guessLimit = 10;
var hiddenColorLimit = 4;
var hiddenColors;
var selectedColorNumber = 0;
var guessNumber = 1;
var wrongPlaceColor = "Red";
var correctColor = "green";

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
                    var result = $("<div>");
                    for (var k = 0; k < hiddenColorLimit; k++){
                        result = $("<div>");
                        result.addClass("correctResult" + i);
                        result.addClass("results");
                        $td.append(result); 
                    }
                    for (var l = 0; l < hiddenColorLimit; l++){
                        result = $("<div>");
                        result.addClass("wrongResult" + i);
                        result.addClass("results");
                        $td.append(result);
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
            $(".colors tbody td").each(function(){
                $(this).show();
            });
            for (var i = 0; i < guess.correctColorNumber; i++){
                $(".correctResult" + guessNumber + ":eq("+ i +")").css("backgroundColor", correctColor);    
            }
            for (var i = 0; i < guess.wrongPlaceColorNumber; i++){
                $(".wrongResult" + guessNumber + ":eq("+ i +")").css("backgroundColor", wrongPlaceColor);    
            }
            if (guess.correctColorNumber == hiddenColorLimit){
                for(var i = 0; i < guess.colorIndexes.length; i++){
                    $(".hidden-color div:eq(" + i + ")").addClass("show-hidden-color");
                    $(".hidden-color div:eq(" + i + ")").css("background-color", colors[guess.colorIndexes[i]])
                }
                $(".colors td").off("click");
            }
            guessColors = [];
            selectedColorNumber = 0;
            guessNumber++;
            guesses.push(guess); // guess is pushed to global guesses variable
        }
    })
})