var next = false;

function defaultEvent( event ){
    if ( next )
    {
        $("#expression").val( event.target.innerText );
        next = false ;
    }
    else
    {
        $("#expression").val( $("#expression").val() + event.target.innerText );
    }
}

function backwardEvent(){
    $("#expression").val( $("#expression").val().slice( 0, -1 ) );
}

function clearEvent(){
    $("#expression").val("");
}

function operatorEvent( event ){
    if ( event.target.innerText === "＋" )
    {
      if ( next )
      {
          $("#expression").val( "+" );
          next = false ;
      }
      else
      {
          $("#expression").val( $("#expression").val() + "-" );
      }
    }
    else if ( event.target.innerText === "－" )
    {
      if ( next )
      {
          $("#expression").val( "-" );
          next = false ;
      }
      else
      {
          $("#expression").val( $("#expression").val() + "-" );
      }
    }
    else if ( event.target.innerText === "＊" )
    {
      if ( next )
      {
          $("#expression").val( "*" );
          next = false ;
      }
      else
      {
          $("#expression").val( $("#expression").val() + "*" );
      }
    }
    else if ( event.target.innerText === "＝" )
    {
        var expressionString = $("#expression").val();

        try
        {
            $("#expression").val( eval( expressionString ) );
            next = true ;
        }
        catch ( exception )
        {
            if ( exception instanceof SyntaxError )
            {
              $("#expression").css( "color","red" );
              $("#expression").val( "計算式邏輯錯誤，請重新輸入。" );
              setTimeout( function(){
                $("#expression").css( "color","black" );
                $("#expression").val( "" );
              }, 2000 );
            }
            else
            {
              $("#expression").css( "color","red" );
              $("#expression").val( "發生了未知的錯誤。" );
              setTimeout( function(){
                $("#expression").css( "color","black" );
                $("#expression").val( "" );
              }, 2000 );
            }


        }
    }
    else
    {
        defaultEvent( event );
    }
}

function calculatorButtonAction(){
    $("#dot"         ).click( defaultEvent  );
    $("#zero"        ).click( defaultEvent  );
    $("#one"         ).click( defaultEvent  );
    $("#two"         ).click( defaultEvent  );
    $("#three"       ).click( defaultEvent  );
    $("#four"        ).click( defaultEvent  );
    $("#five"        ).click( defaultEvent  );
    $("#six"         ).click( defaultEvent  );
    $("#seven"       ).click( defaultEvent  );
    $("#eight"       ).click( defaultEvent  );
    $("#nine"        ).click( defaultEvent  );
    $("#backward"    ).click( backwardEvent );
    $("#clear"       ).click( clearEvent    );
    $("#plus"        ).click( operatorEvent );
    $("#minus"       ).click( operatorEvent );
    $("#multiple"    ).click( operatorEvent );
    $("#divide"      ).click( operatorEvent );
    $("#leftBracket" ).click( operatorEvent );
    $("#rightBracket").click( operatorEvent );
    $("#equal"       ).click( operatorEvent );
}

export { calculatorButtonAction };
