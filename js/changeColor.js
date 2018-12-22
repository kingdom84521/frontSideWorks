function colorChange( event ){
    if ( event.target.id === "changeBlueButton" )
    {
        $("#result").text( "The text color is now blue." );
        $("#result").attr( "class","text-primary" );
    }
    if ( event.target.id === "changeGreenButton" )
    {
        $("#result").text( "The text color is now green." );
        $("#result").attr( "class","text-success" );
    }
    if ( event.target.id === "resetButton" )
    {
        $("#result").text( "The text color is now dark." );
        $("#result").attr( "class","text-dark" );
    }
}

function buttonAction(){
    $( "#changeBlueButton" ).click( colorChange );
    $( "#changeGreenButton" ).click( colorChange );
    $( "#resetButton" ).click( colorChange );
}

export { buttonAction } ;
