var colors = ["red", "blue", "yellow", "brown", "asdasd", "a123123", "wqeqweqwe", "weqweqw"];
var guesses = [];
var guessLimit = 10;
var hiddenColorLimit = 4;
$(document).ready(function(){
    var $table, $tr, $td;
    function drawBoard(){
        $table = $(".guessBoard tbody");
        for(var i = 0; i < guessLimit + 1; i++){
            $tr = $("<tr></tr>");
            for(var j = 0; j < hiddenColorLimit + 1; j++){
                $td = $("<td></td>");
                if (j == hiddenColorLimit){
                    if (j == hiddenColorLimit && i == guessLimit) break;
                    $td.addClass("result");
                }else{
                    if (i == guessLimit){
                        $td.addClass("hidden-color")
                        $td.append("<div id=hidden-color-"+ (j + 1) + ">")
                    }else{
                        $td.addClass("guess")
                        $td.append("<div id='guess" + i + j +"' class='guess-color'></div>");                    
                    }
                }
                $tr.append($td);
                console.log($tr)
            }
            $table.append($tr);
        }
    }
    $table = $(".colors tbody");
    $tr = $("<tr>");
    colors.forEach(function(color){
        $tr.append($("<td></td>").append($("<div></div>").addClass("selection-color")).data({colorIndex : colors.indexOf(color)}));
    })
    $table.append($tr);
    drawBoard();
    
    //event listener
    $(".colors td").on("click", function(){
        $that = $(this);
        console.log($that.data("colorIndex"))
    })
})

