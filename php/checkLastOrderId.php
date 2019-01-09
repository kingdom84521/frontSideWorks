<?php
  require('rb.php');

  $login = "yumekuii";
  $password = "leesyan0812";

  R::setup( "mysql:host=120.105.129.33;dbname=yumekuiidatabase", $login, $password );

  if ( !R::testConnection() )
  {
      die("Error: Can't connect to database");
  }

  $order = R::dispense('order');
  $order->orderid = "201801030001" ;
  $order->total = 100 ;
  $id = R::store( $order ) ;

  echo $id ;
?>
