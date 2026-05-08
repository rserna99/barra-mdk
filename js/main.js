$(document).ready(function(){

    let productes = {};

    // Llegir preu del productes des de l'arxiu
    async function cargarProductes() {
        try {
            const resp = await fetch('productes.json');
            productes = await resp.json();

        } catch (error) {
            console.error("Error al llegir llista productes");
            console.log(error);
        }
    }

    cargarProductes();


    // Elements
    let btn_birra = $('#birra');
    let recompte_birra = $('#recompte_birra');
    let total_birra = $('#total_birra');
    //let preu_birra = 2;

    let btn_convinat = $('#convinat');
    let recompte_convinat = $('#recompte_convinat');
    let total_convinat = $('#total_convinat');
    //let preu_convinat = 5;

    let btn_xarrup = $('#xarrup');
    let recompte_xarrup = $('#recompte_xarrup');
    let total_xarrup = $('#total_xarrup');
    //let preu_xarrup = 2;

    let btn_vermut = $('#vermut');
    let recompte_vermut = $('#recompte_vermut');
    let total_vermut = $('#total_vermut');
    //let preu_vermut = 4;

    let btn_calimotxo = $('#calimotxo');
    let recompte_calimotxo = $('#recompte_calimotxo');
    let total_calimotxo = $('#total_calimotxo');
    //let preu_calimotxo = 4;

    let btn_refresc = $('#refresc');
    let recompte_refresc = $('#recompte_refresc');
    let total_refresc = $('#total_refresc');
    //let preu_refresc = 2;

    let btn_got = $('#got');
    let recompte_got = $('#recompte_got');
    let total_got = $('#total_got');
    //let preu_got = 1;

    let total = $('#total');
    let efectiu = $('#efectiu_donat');
    let canvi_retorn = $('#canvi_retorn');

    let btn_esborrar = $('#esborrar');

    function calcularCanvi(){

        if (efectiu.val() != ''){
            let retorn = efectiu.val() - total.val().slice(0, -1);
            
            if (retorn > 0){
                canvi_retorn.val(retorn + '€');
            }
            else {
                canvi_retorn.val(0);
            }
        }
    }

    // function calcularTotal(){
    //     let suma_birra = parseFloat(preu_birra) * parseInt(recompte_birra.val());
    //     let suma_convinat = parseFloat(preu_convinat) * parseInt(recompte_convinat.val());
    //     let suma_xarrup = parseFloat(preu_xarrup) * parseInt(recompte_xarrup.val());
    //     let suma_vermut = parseFloat(preu_vermut) * parseInt(recompte_vermut.val());
    //     let suma_calimotxo = parseFloat(preu_calimotxo) * parseInt(recompte_calimotxo.val());

    //     let suma_refresc = parseFloat(preu_refresc) * parseInt(recompte_refresc.val());
    //     let suma_got = parseFloat(preu_got) * parseInt(recompte_got.val());

    //     let suma_total = (suma_birra + suma_convinat + suma_xarrup + suma_vermut + suma_calimotxo + suma_refresc + suma_got);

    //     total.val(suma_total + '€');

    //     calcularCanvi();
    // }

    function calcularTotal() {
        let suma_total = 0;

        // Recorrer la llista de preus
        for (const beguda in productes) {
            
            const item = $(`#recompte_${beguda}`);
        
            if (item.length > 0) {
                const preu = productes[beguda];
                const cuantitat = parseInt(item.val()) || 0;
                suma_total += preu * cuantitat;
            }
        }

        // Actualizar DOM amb el resultat i calcular el canvi a retornar
        total.val(suma_total.toFixed(2) + '€');
        calcularCanvi();
    }
    
    
    btn_birra.click(function(){
        let contador = parseInt(recompte_birra.val()) + 1;

        recompte_birra.val(contador);
        total_birra.val((contador * preu_birra) + '€');

        calcularTotal();
    })

    btn_convinat.click(function(){
        let contador = parseInt(recompte_convinat.val()) + 1;

        recompte_convinat.val(contador);
        total_convinat.val((contador * preu_convinat) + '€');

        calcularTotal();
    })

    btn_xarrup.click(function(){
        let contador = parseInt(recompte_xarrup.val()) + 1;

        recompte_xarrup.val(contador);
        total_xarrup.val((contador * preu_xarrup) + '€');

        calcularTotal();
    })

    btn_vermut.click(function(){
        let contador = parseInt(recompte_vermut.val()) + 1;

        recompte_vermut.val(contador);
        total_vermut.val((contador * preu_vermut) + '€');

        calcularTotal();
    })

    btn_calimotxo.click(function(){
        let contador = parseInt(recompte_calimotxo.val()) + 1;
        
        recompte_calimotxo.val(contador);
        total_calimotxo.val((contador * preu_calimotxo) + '€');

        calcularTotal();
    })

    btn_refresc.click(function(){
        let contador = parseInt(recompte_refresc.val()) + 1;
        
        recompte_refresc.val(contador);
        total_refresc.val((contador * preu_refresc) + '€');

        calcularTotal();
    })

    btn_got.click(function(){
        let contador = parseInt(recompte_got.val()) + 1;
        
        recompte_got.val(contador);
        total_got.val((contador * preu_got) + '€');

        calcularTotal();
    })


    efectiu.on('change', function() {
        calcularCanvi();
    })

    btn_esborrar.click(function () {  

        recompte_birra.val(0);
        total_birra.val(0 + '€');

        recompte_convinat.val(0);
        total_convinat.val(0 + '€');

        recompte_xarrup.val(0);
        total_xarrup.val(0 + '€');

        recompte_vermut.val(0);
        total_vermut.val(0 + '€');

        recompte_calimotxo.val(0);
        total_calimotxo.val(0 + '€');

        recompte_refresc.val(0);
        total_refresc.val(0 + '€');

        recompte_got.val(0);
        total_got.val(0 + '€');

        efectiu.val(null);
        canvi_retorn.val(0);
        total.val(0);
    })

})