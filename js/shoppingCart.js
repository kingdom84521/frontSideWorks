var breakfastType = null ;
var shoppingCart = [] ;


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
    var typeNum ;
    var breakfastStore = breakfastType.chinese.content ;

    $("#menu option").remove() ;

    if ( isChecked( "#chinese" ) )
    {
        breakfastStore = breakfastType.chinese.content ;
        typeNum        = breakfastType.chinese.type ;
    }
    else if ( isChecked( "#british" ) )
    {
        breakfastStore = breakfastType.british.content ;
        typeNum        = breakfastType.british.type ;
    }
    else if ( isChecked( "#french" ) )
    {
        breakfastStore = breakfastType.french.content ;
        typeNum        = breakfastType.french.type ;
    }

    for ( var i in breakfastStore )
    {
        var nowName   = typeNum.toString() + breakfastStore[i].id.toString() + "->" + breakfastStore[i].name ;
        var nowOption = new Option( nowName, breakfastStore[i].price ) ;

        $("#menu").append( nowOption );
    }

    setUnitPrice() ;
    setSubtotal() ;
}

function setUnitPrice()
{
    $("#unitPrice").val( $("#menu").find(":selected").val() ) ;
    $("#quantity").val("0");

    setSubtotal() ;
}

function setSubtotal()
{
    $("#subtotal").val( parseInt( $("#unitPrice").val() ) * parseInt( $("#quantity").val() ) ) ;
    if ( $("#subtotal").val() === "NaN" )
    {
        $("#subtotal").val("0");
    }
}

function shoppingCartAllAction()
{
    setOrderId() ;

    $.getJSON('./data/breakfastType.json')
      .then(( json ) => {
          breakfastType = json;
      })
      .then(() => {
          updateMenu();
      })

    setTotal() ;

    $("#menu").change( setUnitPrice );
    $("#british").click( updateMenu ) ;
    $("#addToCart").click( addToCart ) ;
    $("#quantity").on( "input", setSubtotal ) ;
    $("#checkout").click( checkoutButtonAction ) ;
    $("#clearCart").click( clearCartButtonAction ) ;
    $("#toInquire").click( toInquireButtonAction ) ;
    $("#toBuy").click( toBuyButtonAction ) ;
}

function getCartItems()
{
    var nowId = parseInt( $("#cart tr:last td:first").text() );
    var selected = $("#menu").find(":selected").text().slice( $("#menu").find(":selected").text().search("->") + "->".length ) ;

    if ( isNaN( nowId ) )
    {
        nowId = 0 ;
    }

    var item = {
                   "id":        nowId + 1,
                   "name":      selected,
                   "unitPrice": $("#unitPrice").val(),
                   "quantity":  $("#quantity").val(),
                   "subtotal":  $("#subtotal").val()
               }

    return item ;
}

function deleteFromCart()
{
    var deleteId = parseInt( $( this ).closest("tr").children(":first-child").text() ) - 1 ;
    var nowPosition = $( this ).closest("tr") ;

    shoppingCart.splice( deleteId, 1 ) ;

    for ( var i in shoppingCart )
    {
        shoppingCart[i].id = parseInt( i ) + 1
    }

    for ( var i = 0 ; i < $("#cart tbody tr").length - deleteId ; ++i )
    {
        nowPosition = nowPosition.next("tr") ;

        nowPosition.children(":first-child").text( i + deleteId + 1 ) ;
    }

    $( this ).closest("tr").remove() ;

    setTotal() ;
}

function getTotal()
{
    var total = 0 ;

    $("#cart tbody tr").each( function(){
          total += parseInt( $( this ).children(":nth-child(5)").text() ) ;
    } )

    return total ;
}

function setTotal()
{
    $("#total").text( "總計：$" + getTotal() ) ;
}

function addToCart()
{
    if ( $("#quantity").val() === "0" )
    {
        return false ;
    }

    var nowItem = getCartItems() ;

    shoppingCart.push( nowItem ) ;

    var nowRow = `
                 <tr>
                    <td scope="row">${nowItem.id}</td>
                    <td>${nowItem.name}</td>
                    <td>${nowItem.unitPrice}</td>
                    <td>${nowItem.quantity}</td>
                    <td>${nowItem.subtotal}</td>
                    <td>
                       <button class="btn btn-danger btn-delete">
                          <i class="fas fa-minus"></i>
                       </button>
                    </td>
                 </tr>
                 `
    $("#cart tbody").append( nowRow ) ;
    $("#quantity").val("0") ;

    setTotal() ;

    $("#cart tbody tr:last td:last .btn-delete").click( deleteFromCart ) ;
}

function setOrderId()
{
    var nowOrderId ;

    $.get("./php/getOrderId.php", "json")
     .done( ( data ) => {
              var todayDate = new Date( Date.now() ) ;
              todayDate = numeral( todayDate.getFullYear() ).format("0000") + numeral( todayDate.getMonth() + 1 ).format("00") + numeral( todayDate.getDate() ).format("00") ;

              data = $.parseJSON( data ) ;

              if ( data && data.length <= 0 )
              {
                  nowOrderId = todayDate + "0001" ;
              }
              else
              {
                  var lastOrderId = data[ Object.keys( data )[ Object.keys( data ).length - 1 ] ].orderid ;
                  if ( lastOrderId.startsWith( todayDate ) )
                  {
                      nowOrderId = parseInt( lastOrderId ) + 1 ;
                  }
                  else
                  {
                      nowOrderId = todayDate + "0001" ;
                  }
              }

              console.log( todayDate ) ;
              $("#orderId").val( nowOrderId ) ;
              $("#oid").text( "訂單：" + nowOrderId ) ;
     } )
}

function checkoutButtonAction()
{
    if ( $("#cart tbody tr").length <= 0 )
    {
        alert("購物車為空！請先進行購物再結帳。") ;
        return false ;
    }
    else
    {
        $.post("./php/checkoutAction.php", {
            "cart": shoppingCart,
            "orderId": $("#orderId").val(),
            "total": parseInt( $("#total").text().split('$')[1] )
        }, "json")
         .done( () => {
            clearCartButtonAction() ;
            setTotal() ;
            setOrderId() ;
         } );


    }

}

function clearCartButtonAction( event )
{
    if ( $("#cart tbody tr").length <= 0 )
    {
        alert("購物車已經是空的了！") ;
        return false ;
    }
    else
    {
        if ( $( this ).id = "checkout" )
        {
            shoppingCart = [] ;
            $("#cart tbody").empty() ;
        }
        else
        {
            var choice = confirm("你確定要清除購物車內所有商品嗎？") ;
            if ( choice )
            {
              shoppingCart = [] ;
              $("#cart tbody").empty() ;
            }
        }
    }
}

function toInquireButtonAction()
{
    $("#inquire").attr( "hidden", false ) ;
    $("#buyContent").attr( "hidden", true ) ;
    $("#inquireContent").attr( "hidden", false ) ;
    $("#orderId").val("") ;
    $("#orderId").attr("readOnly", false) ;
}

function toBuyButtonAction()
{
    $("#inquire").attr( "hidden", true ) ;
    $("#buyContent").attr( "hidden", false ) ;
    $("#inquireContent").attr( "hidden", true ) ;
    setOrderId() ;
    $("#orderId").attr("readOnly", false) ;
}

function inquireButtonAction()
{
    
}

export { shoppingCartAllAction } ;
