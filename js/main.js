import { buttonAction } from './changeColor.js' ;

$( document ).ready(
  function(){
    $("#changeColor").load("../html/changeColor.html", buttonAction);
  }
)
