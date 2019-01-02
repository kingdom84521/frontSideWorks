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
    $.getJSON('../data/breakfastType.json')
      .then(( json ) => {
          breakfastType = json;
      })
      .then(() => {
          updateMenu();
      })

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

function deleteFromCart( event )
{
    var deleteId = parseInt( $( this ).closest("tr").children(":first-child").text() ) ;

    shoppingCart.splice( deleteId - 1, 1 ) ;

    $( this ).closest("tr").remove() ;
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
                       <div>
                          <button class="btn btn-danger btn-delete">
                              <i class="fas fa-minus"></i>
                          </button>
                       </div>
                    </td>
                 </tr>
                 `
    $("#cart tbody").append( nowRow ) ;

    $("#cart tbody tr:last td:last .btn-delete").click( deleteFromCart ) ;
}

export { shoppingCartAllAction } ;
