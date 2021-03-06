var next = false ;
var forbid = false ;

function defaultEvent( event ){
    if ( !forbid )
    {
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

}

function backwardEvent(){
    if ( !forbid )
    {
        $("#expression").val( $("#expression").val().slice( 0, -1 ) );
    }
}

function clearEvent(){
    if ( !forbid )
    {
        $("#expression").val("");
    }
}

function operatorEvent( event ){
    if ( !forbid )
    {
      if ( event.target.innerText === "＋" )
      {
        if ( next )
        {
          $("#expression").val( "+" );
          next = false ;
        }
        else
        {
          $("#expression").val( $("#expression").val() + "+" );
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
      else if ( event.target.innerText === "．" )
      {
        if ( next )
        {
          $("#expression").val( "." );
          next = false ;
        }
        else
        {
          $("#expression").val( $("#expression").val() + "." );
        }
      }
      else if ( event.target.innerText === "＝" )
      {
        var expressionString = $("#expression").val().replace(/÷/g, "/");

        try
        {
          $("#expression").val( eval( expressionString ) );
          next = true ;
        }
        catch ( exception )
        {
          if ( exception instanceof SyntaxError )
          {
            forbid = true ;
            $("#expression").css( "color","red" );
            $("#expression").val( "計算式邏輯錯誤，請重新輸入。" );
            setTimeout( function(){
              forbid = false ;
              $("#expression").css( "color","black" );
              $("#expression").val( "" );
            }, 2000 );
          }
          else
          {
            forbid = true ;
            $("#expression").css( "color","red" );
            $("#expression").val( "發生了未知的錯誤。" );
            setTimeout( function(){
              forbid = false ;
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
}

function calculatorButtonAction(){
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
    $("#dot"         ).click( operatorEvent );
    $("#plus"        ).click( operatorEvent );
    $("#minus"       ).click( operatorEvent );
    $("#multiple"    ).click( operatorEvent );
    $("#divide"      ).click( operatorEvent );
    $("#leftBracket" ).click( operatorEvent );
    $("#rightBracket").click( operatorEvent );
    $("#equal"       ).click( operatorEvent );
}

export { calculatorButtonAction };
