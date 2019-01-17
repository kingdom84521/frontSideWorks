<?php
  $login = "yumekuii" ;
  $pwd = "leesyan0812" ;
  $id = $_GET["id"] ;

  require("../lib/php/rb.php") ;

  R::setup("mysql:host=120.105.129.33;dbname=yumekuiidatabase", $login, $pwd );

  if ( !R::testConnection() )
  {
      die("Error: Can't connect to database");
  }

  $orderItem = R::findOne( "order", "id = :id", array( ":id" => $id ) ) ;
  $cartItems = R::find( "cart", "oid = :orderid", array( ":orderid" => $orderItem->orderid ) ) ;

  $returnValue = array( "total" => $orderItem->total, "content" => $cartItems ) ;

  echo json_encode( $returnValue ) ;
?>
