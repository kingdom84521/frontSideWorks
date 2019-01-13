<?php
  $login = "yumekuii" ;
  $pwd = "leesyan0812" ;
  $cart = $_POST['cart'] ;
  $total = $_POST['total'] ;
  $orderId = $_POST['orderId'] ;

  require("../lib/php/rb.php") ;

  R::setup("mysql:host=120.105.129.33;dbname=yumekuiidatabase", $login, $pwd );

  if ( !R::testConnection() )
  {
      die("Error: Can't connect to database");
  }

  $newCart = R::dispense("order");
  $newCart->orderid = $orderId ;
  $newCart->total = $total ;
  R::store( $newCart ) ;

  foreach( $cart as $cart )
  {
      $newItem = R::dispense("cart") ;
      $newItem->oid = $orderId ;
      $newItem->name = $cart["name"] ;
      $newItem->unitPrice = $cart["unitPrice"] ;
      $newItem->quantity = $cart["quantity"] ;
      $newItem->subtotal = $cart["subtotal"] ;
      R::store( $newItem ) ;
  }

  R::close() ;
?>
