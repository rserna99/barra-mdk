$(document).ready(function(){

    let productes = {}; // LLista amb els diferents productes
    let UI = {}; // Llista amb els elements HTML dels productes

    // Llegir preu del productes des de l'arxiu
    async function cargarProductes() {
        console.log("init");

        try {
            const resposta = await fetch('/barra-mdk/js/productes.json');
            const llista = await resposta.json();
        
            const contenidor = $('#llista-productes'); // On van els botons
            
            console.log("Començar a generar la llista de productes");

            llista.forEach(p => {
                // 1. Guardem la info en un objecte indexat pel nom per accedir ràpid
                dadesProductes[p.nom] = p;

                // 2. Generem l'HTML dinàmicament
                const card = `
                    <li class="list-group-item d-flex align-items-center">
                        <button class="w-50 btn-barra border-0 bg-transparent" id="birra">
                            <img src="${p.ruta_img}" style="width: 128px" alt="${p.nom}">
                        </button>
                        <input type="text" disabled id="recompte_${p.nom}" value="0" class="w-25 inp-barra">
                        <input type="text" disabled id="total_${p.nom}" value="0€" class="w-25 inp-barra">
                    </li>
                `;
                contenidor.append(card);

                // 3. Creem la "variable global" dins de l'objecte UI
                UI[p.nom] = {
                    recompte: $(`#recompte_${p.nom}`),
                    total: $(`#total_${p.nom}`)
                };
            });

            iniciarEvents();
        
        } catch (e) {
            console.error("Error carregant el JSON", e);
        }
    }

    function iniciarEvents() {
        // 'this' fa referència al botó que s'ha clicat. 
        // Amb $(this).data('id') obtenim el nom del producte (birra, refresc, etc.)
        const id = $(this).data('id'); 
        
        // Accedim a la info del producte i als elements del DOM guardats a UI
        const producte = dadesProductes[id];
        const elements = UI[id];

        // 1. Obtenir el valor actual de l'input de recompte
        let quantitat = parseInt(elements.recompte.val()) + 1;

        // 2. Actualitzar l'input de recompte
        elements.recompte.val(quantitat);

        // 3. Calcular el total d'aquest producte i actualitzar l'input de total
        // fem servir .toFixed(2) per assegurar-nos que sempre hi hagi 2 decimals
        let preuTotalProducte = (quantitat * producte.preu).toFixed(2);
        elements.total.val(preuTotalProducte + '€');

        // 4. Executar la funció general que suma tots els productes
        // Fem una comprovació de seguretat per si la funció existeix
        if ($.isFunction(window.calcularTotal)) {
            calcularTotal();
        }
}
    


    // async function cargarProductes() {
    //     try {
    //         const resp = await fetch('/barra-mdk/js/productes.json');
    //         productes = await resp.json();

    //     } catch (error) {
    //         console.error("Error al llegir llista productes");
    //         console.log(error);
    //     }
    // }

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
        total_birra.val((contador * productes.birra) + '€');

        calcularTotal();
    })

    btn_convinat.click(function(){
        let contador = parseInt(recompte_convinat.val()) + 1;

        recompte_convinat.val(contador);
        total_convinat.val((contador * productes.convinat) + '€');

        calcularTotal();
    })

    btn_xarrup.click(function(){
        let contador = parseInt(recompte_xarrup.val()) + 1;

        recompte_xarrup.val(contador);
        total_xarrup.val((contador * productes.xarrup) + '€');

        calcularTotal();
    })

    btn_vermut.click(function(){
        let contador = parseInt(recompte_vermut.val()) + 1;

        recompte_vermut.val(contador);
        total_vermut.val((contador * productes.vermut) + '€');

        calcularTotal();
    })

    btn_calimotxo.click(function(){
        let contador = parseInt(recompte_calimotxo.val()) + 1;
        
        recompte_calimotxo.val(contador);
        total_calimotxo.val((contador * productes.calimotxo) + '€');

        calcularTotal();
    })

    btn_refresc.click(function(){
        let contador = parseInt(recompte_refresc.val()) + 1;
        
        recompte_refresc.val(contador);
        total_refresc.val((contador * productes.refresc) + '€');

        calcularTotal();
    })

    btn_got.click(function(){
        let contador = parseInt(recompte_got.val()) + 1;
        
        recompte_got.val(contador);
        total_got.val((contador * productes.got) + '€');

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