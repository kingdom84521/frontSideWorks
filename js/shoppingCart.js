var breakfastType = null ;

//store json to variable
$.getJSON("../data/breakfastType.json")
 .then( function( json ){
              breakfastType = json ;
          } );

function isChecked( id ){
    id += ":checked" ;
    if ( $( id ).val() === "on" )
    {
      return true;
    }
    if ( $( id ).val() === undefined )
    {
      return false;
    }
  	else
    {
      return id;
    }
}

function updateMenu(){
    var length ;
    if ( isChecked( "#chinese" ) )
    {
      length = breakfastType.chinese.content.length ;

    }
    else if ( isChecked( "#british" ) )
    {

    }
    else if ( isChecked( "#french" ) )
    {

    }
}
