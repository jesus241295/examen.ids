
A = 270;
B = 340; 
C= 390;
let productos = new Map()
    productos.set('A', A)
    productos.set('B', B)
    productos.set('C', C)

let precioProducto = 0;
let dineroIngresado = 0; 
let efectivo = 0;
let product ="";
let cambio = 0;
let taHistoryContent;
let bHistory = true;
let bPrecio = true;
let bmoney  = true;

const moneda = 10;
const monedaMediana = 50;
const monedaGrande = 100;

function init(){
    $('#step').val("product");
    $('#divName').hide();
    $('#divProcess').show();
    $('#divMoney').hide();
    $('#transaction').hide();

    $('#btnGeneral').show();
    $('#btnExit').hide()
    $('#btnOk').hide();
    $('#product').val("");

    precioProducto =0;
    dineroIngresado = 0; 
    efectivo = 0;
    product ="";
    cambio = 0;
    bHistory = true;
    bPrecio = true;
    bmoney  = true;
    
}

/**
 * Get client name
 * @returns name
 */
function getName(){
    return $('#name').val(); 
}

function genaralProccess(){
    
    let value = $('#step').val();

    //Run the selection of product
    if(value === 'getName'){
        getProduct();
    }
    //calculate money
    if(value === 'product'){
        calculateMoney();

    }
}
/**
 * This method get the product
 */
const getProduct = () => {
    let user = getName();
    if(user === '' || user === null){
        alert("Por favor ingresa tu nombre");
    }else{
        $('#divName').hide();
        $('#divProcess').show();
        $('#step').val('product');
        $('#welcome').text(`Bienvenido ${user}`);
        $('#divProduct').text(`Elije un producto:  A = $${A},  B = $${B}, C = $${C} `);
    }
}
/**
 * This method get the calculate of money
 */
function calculateMoney(){

    product = $('#product').val();
    if(product==='' || product === null){
        alert("Ingresa un producto");

    }else if(product !== 'A' && product !== 'B' && product !== 'C' ){
        alert("Selecciona una opcion valida")

    }else{
        if(bmoney){
            $('#divProcess').hide();
            $('#divMoney').show();
            $('#choice').text(`Usted eligo ${product} ingrese monedas de numeracion $10  $50  o  $100`)
            bmoney = false
        }else{

            efectivo = $('#money').val();
            $('#money').val(0);
            if(efectivo ==='' || efectivo === null){
                alert("Por favor ingrese un numero")
            }else if(efectivo != 10 && efectivo != 50 && efectivo != 100 ){
                alert("Por favor agregar los montos solicitados");
            }else{
                if(bHistory){
                    let user = getName();
                    taHistoryContent += `<tr><td>${user}</td>`
                    product = $('#product').val();
                    taHistoryContent += `<td>${product}</td>`
                    
                    bHistory = false;
                }
                precioProducto = productos.get(product)
                dineroIngresado += Number(efectivo) 
                
                //historial
                if(bPrecio){
                    taHistoryContent += `<td>${precioProducto}</td>`
                    bPrecio = false;
                }
                    
                if(dineroIngresado > precioProducto){
                    $('#divMoney').hide();
                    $('#btnGeneral').hide();
                    $('#btnOk').show();
                    $('#transaction').show();
                    $('#btnExit').show()
    
                    taHistoryContent += `<td>${dineroIngresado}</td>`
                    
                    cambio = dineroIngresado - precioProducto
                    taHistoryContent += `<td>${cambio}</td></tr>`
                    let mensajeCambio = `Su cambio es:`;
                    while(cambio > 0){
                        if(cambio >= monedaGrande){
                            mensajeCambio += "\n" + monedaGrande;
                            cambio -= monedaGrande;
                        }else if(cambio >= monedaMediana ){
                            mensajeCambio += "\n" + monedaMediana;
                            cambio -= monedaMediana;
                        }else{
                            mensajeCambio += "\n" + moneda;
                            cambio -= moneda;
                        }
                    }
                    $('#transaction').text(mensajeCambio)
    
                }
            }
        }
    }
    
}


 /**
  * Show history in table
  */
function getHistory(){
    $('#tbHistory').append(taHistoryContent)
    $('#btnOk').hide()
    $('#btnExit').hide()
    $('#divName').hide();
    $('#transaction').hide();
    $('#historial').show()
    $('#btnNew').show()
}

/**
 * Start new proccess
 */
function reset(){

    $('#step').val("getName");
    $('#divName').show();
    $('#divProcess').hide();
    $('#divMoney').hide();
    $('#transaction').hide();

    $('#btnGeneral').show();
    $('#btnExit').hide()
    $('#btnOk').hide();
    $('#product').val("");
    $('#name').val("");
    $('#historial').hide()
    $('#welcome').empty()
    $('#btnNew').hide()
    $('#tbHistory').empty()


    precioProducto = 0;
    dineroIngresado = 0; 
    efectivo = 0;
    product ="";
    cambio = 0;
    taHistoryContent = "";
    bHistory = true;
    bPrecio = true;
    bmoney  = true;
}