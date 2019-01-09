<?php
  $login = "yumekuii" ;
  $pwd = "leesyan0812" ;
  $cart = $_POST['cart'] ;

  require("../lib/php/rb.php") ;

  R::setup("mysql:host=120.105.129.33;dbname=yumekuiidatabase", $login, $pwd );

  if ( !R::testConnection() )
  {
      die("Error: Can't connect to database");
  }

  foreach( $cart as $cart )
  {
      $newItem = R::dispense("cart") ;
      $newItem->name = $cart["name"] ;
      $newItem->unitPrice = $cart["unitPrice"] ;
      $newItem->quantity = $cart["quantity"] ;
      $newItem->subtotal = $cart["subtotal"] ;
      R::store( $newItem ) ;
  }
?>
