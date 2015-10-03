function Guess(){
    this.colorIndexes = [];
    this.wrongPlaceColorNumber = 0;
    this.correctColorNumber = 0;
}
Guess.prototype.setColors = function(colorIndexes){
    for(var i = 0; i < colorIndexes.length; i++){
        this.colorIndexes.push(colorIndexes[i]);
    }
}
Guess.prototype.checkColors = function(hiddenColors){
    for (var i = 0; i < hiddenColors.colorIndexes.length; i++){
        for (var j = 0; j < this.colorIndexes.length; j++){
            if (hiddenColors.colorIndexes[i] == this.colorIndexes[j]){
                if (i == j){
                    this.correctColorNumber++;
                }else 
                    this.wrongPlaceColorNumber++;
            }
        }
    }
}