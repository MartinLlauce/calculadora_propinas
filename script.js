//Variables del DOM
const $factura = document.querySelector(".bill-input");
const $num_personas = document.querySelector(".people-input");
const $propina_x_persona = document.getElementById("tip-amount");
const $totales_x_persona = document.getElementById("total-amount");
const $total_pagar = document.getElementById("total-pagar");
const $propinas = document.querySelectorAll(".propinas");
const $propina_personalizada = document.querySelector(".tip-custom");
const $btn_reset = document.querySelector(".reset");
const $error = document.querySelector(".error");
const $total_cuenta = document.querySelector(".total-cuenta");

//Eventos
$factura.addEventListener("input", func_factura);
$num_personas.addEventListener("input", func_num_personas);
$propinas.forEach(function(val){
    val.addEventListener("click", handleClick);
});
$propina_personalizada.addEventListener("click", func_entrada_propina);
$btn_reset.addEventListener("click", reset);


$factura.value = "0.0";
$num_personas.value = "1";
$total_pagar.innerHTML = `$` + (0.0).toFixed(2);
$propina_x_persona.innerHTML = `$` + (0.0).toFixed(2);
$totales_x_persona.innerHTML = `$` + (0.0).toFixed(2);


//inicialización
let factura = 0.0;
let personas = 1;
let propina = 0.15;

//Funciones
function func_factura(){
    factura =parseFloat($factura.value);
    //console.log(factura);
    calcular_propina();
}

function func_num_personas(){
    personas =parseFloat($num_personas.value);
    //console.log(personas);
    calcular_propina();

    if(personas < 1){
        $error.style.display = 'flex';
        $num_personas.style.border = 'thick solid red'
    }else{
        $error.style.display = 'none';
        $num_personas.style.border = 'none';
        calcular_propina();

    }
}

//Propina personalizada
function func_entrada_propina(){
    propina = parseFloat($propina_personalizada.value/ 100);

    $propinas.forEach(function (val){
        val.classList.remove("active"); 
    });
    calcular_propina();
}

function handleClick(event){
   $propinas.forEach(function (val) {
       val.classList.remove("active");  
       if(event.target.innerHTML == val.innerHTML){
            val.classList.add("active"); // Al hacer click activa color
            propina = parseFloat(val.innerHTML) /100; //Captura el porcentaje propina
       }
   })
   //console.log(propina);
   calcular_propina();
}

function calcular_propina(){
    if(personas >= 1){
        let monto_propina = factura * propina / personas; //Monto de propina por persona
        let total = (factura / personas) + monto_propina//Total por persona
        let total_pagar = factura + (monto_propina*personas)//Cuenta total

        $propina_x_persona.innerHTML = `$` + (monto_propina).toFixed(2);
        $totales_x_persona.innerHTML = `$` + (total).toFixed(2);
        $total_pagar.innerHTML = `$` + (total_pagar).toFixed(2);
        
    }
}

function reset(){
    $factura.value = "0.0";
    func_factura();
    $num_personas.value = "1";
    func_num_personas();
    $propina_personalizada.value = "";

}


