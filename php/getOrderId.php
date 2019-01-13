<?php
  $login = "yumekuii" ;
  $pwd = "leesyan0812" ;

  require("../lib/php/rb.php") ;

  R::setup("mysql:host=120.105.129.33;dbname=yumekuiidatabase", $login, $pwd );

  if ( !R::testConnection() )
  {
      die("Error: Can't connect to database");
  }

  $allItem = R::findAll("order") ;

  R::close() ;

  echo json_encode( $allItem ) ;
?>
