import { changeColorButtonAction } from './changeColor.js' ;
import { calculatorButtonAction } from './calculator.js' ;

$( document ).ready(
  function(){
    $("#changeColor").load("../html/changeColor.html", changeColorButtonAction);
    $("#calculator").load("../html/calculator.html", calculatorButtonAction);
  }
)
