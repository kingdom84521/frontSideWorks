var breakfastType = null ;

//store json to variable
$.getJSON("../data/breakfastType.json")
 .then( function( json ){
              breakfastType = json ;
          } );
