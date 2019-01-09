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
    getOrderId() ;

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

function getOrderId()
{
    var lastId ;

    $.ajax({
        type: "POST",
        datatype: "html",
        data: {},
        url: "./php/checkLastOrderId.php"
    })
      .done( function( data ){
          console.log( data ) ;
      })
      .fail( function( err ){
      })
}

export { shoppingCartAllAction } ;
