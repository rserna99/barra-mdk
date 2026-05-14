$(document).ready(function(){

    let productes = {}; // LLista amb els diferents productes
    let UI = {}; // Llista amb els elements HTML dels productes

    // let total = $('#total');
    // let efectiu = $('#efectiu_donat');
    // let canvi_retorn = $('#canvi_retorn');

    let btn_esborrar = $('#esborrar');

    // Llegir preu del productes des de l'arxiu
    async function cargarProductes() {
        console.log("init");

        try {
            const resposta = await fetch('/barra-mdk/js/productes.json');
            const llista = await resposta.json();
        
            const contenidor = $('#llista_productes'); // On van els botons
            
            llista.forEach(p => {
                // 1. Guardem la info en un objecte indexat pel nom per accedir ràpid
                productes[p.nom] = p;

                // 2. Generem l'HTML dinàmicament
                const card = `
                    <li class="list-group-item d-flex align-items-center">
                        <button class="w-50 btn-barra border-0 bg-transparent" data-id="${p.nom}">
                            <img src="${p.ruta_img}" style="width: 128px" alt="${p.nom}">
                        </button>
                        <input type="text" disabled id="recompte_${p.nom}" value="0" class="w-25 inp-barra">
                        <input type="text" disabled id="total_${p.nom}" value="0€" class="w-25 inp-barra">
                    </li>
                `;

                contenidor.append(card);

                // 3. Afegim els elements de la UI dels diferents productes dins de la variable
                UI[p.nom] = {
                    recompte: $(`#recompte_${p.nom}`),
                    total: $(`#total_${p.nom}`)
                };
            });

            // 4. Afegim els elements fixos de la UI
            UI[total] = $('#total');
            UI[efectiu] = $('#efectiu_donat');
            UI[canvi_retorn] = $('#canvi_retorn');
            UI[btn_esborrar] = $('#esborrar');

            iniciarEvents();
        
        } catch (e) {
            console.error("Error carregant el JSON", e);
        }
    }

    // Crear els diferents events
    function iniciarEvents() {

        //TODO afegir el botor de esborrar i la resta d'inputs restant
        $(document).off('click', '.btn-barra').on('click', '.btn-barra', function() {
            
            const id = $(this).data('id'); // Recuperem el nom (birra, vermut...)
            
            if (!id || !UI[id]) return; // Seguretat: si no hi ha ID, no fem res

            const producteInfo = productes[id];
            const elements = UI[id];

            let quantitat = parseInt(elements.recompte.val()) + 1;
            elements.recompte.val(quantitat);

            let preuTotalProducte = (quantitat * producteInfo.preu).toFixed(2);
            elements.total.val(preuTotalProducte + '€');

            calcularTotal();
        });
    }


    // TODO
    function calcularCanvi(){

        if (UI[efectiu].val() != ''){
            let retorn = UI[efectiu].val() - UI[total].val().slice(0, -1);
            
            if (retorn > 0){
                UI[canvi_retorn].val(retorn + '€');
            }
            else {
                UI[canvi_retorn].val(0);
            }
        }
    }

    // TODO
    function calcularTotal() {
        let suma_total = 0;

        // Recorrer la llista de productes
        $.each(productes, function(id, info) {
            // Busquem el valor de l'input que hem guardat a UI
            const quantitat = parseInt(UI[id].recompte.val()) || 0;
            suma_total += quantitat * info.preu;
        });

        // Actualizar DOM amb el resultat i calcular el canvi a retornar
        UI[total].val(suma_total.toFixed(2) + '€');
        calcularCanvi();
    }
    
    
    // btn_birra.click(function(){
    //     let contador = parseInt(recompte_birra.val()) + 1;

    //     recompte_birra.val(contador);
    //     total_birra.val((contador * productes.birra) + '€');

    //     calcularTotal();
    // })

    // btn_convinat.click(function(){
    //     let contador = parseInt(recompte_convinat.val()) + 1;

    //     recompte_convinat.val(contador);
    //     total_convinat.val((contador * productes.convinat) + '€');

    //     calcularTotal();
    // })

    // btn_xarrup.click(function(){
    //     let contador = parseInt(recompte_xarrup.val()) + 1;

    //     recompte_xarrup.val(contador);
    //     total_xarrup.val((contador * productes.xarrup) + '€');

    //     calcularTotal();
    // })

    // btn_vermut.click(function(){
    //     let contador = parseInt(recompte_vermut.val()) + 1;

    //     recompte_vermut.val(contador);
    //     total_vermut.val((contador * productes.vermut) + '€');

    //     calcularTotal();
    // })

    // btn_calimotxo.click(function(){
    //     let contador = parseInt(recompte_calimotxo.val()) + 1;
        
    //     recompte_calimotxo.val(contador);
    //     total_calimotxo.val((contador * productes.calimotxo) + '€');

    //     calcularTotal();
    // })

    // btn_refresc.click(function(){
    //     let contador = parseInt(recompte_refresc.val()) + 1;
        
    //     recompte_refresc.val(contador);
    //     total_refresc.val((contador * productes.refresc) + '€');

    //     calcularTotal();
    // })

    // btn_got.click(function(){
    //     let contador = parseInt(recompte_got.val()) + 1;
        
    //     recompte_got.val(contador);
    //     total_got.val((contador * productes.got) + '€');

    //     calcularTotal();
    // })

    // TODO
    UI[efectiu].on('change', function() {
        calcularCanvi();
    })

    // TODO
    btn_esborrar.click(function () { 
        
        $.each(UI, function(id, element) {
            element.recompte.val(0);
            element.total.val('0€');
        });

        // Netegem els camps globals
        UI[efectiu].val(null);
        UI[canvi_retorn].val('');
        UI[total].val('0.00€');

        // recompte_birra.val(0);
        // total_birra.val(0 + '€');

        // recompte_convinat.val(0);
        // total_convinat.val(0 + '€');

        // recompte_xarrup.val(0);
        // total_xarrup.val(0 + '€');

        // recompte_vermut.val(0);
        // total_vermut.val(0 + '€');

        // recompte_calimotxo.val(0);
        // total_calimotxo.val(0 + '€');

        // recompte_refresc.val(0);
        // total_refresc.val(0 + '€');

        // recompte_got.val(0);
        // total_got.val(0 + '€');

        // efectiu.val(null);
        // canvi_retorn.val(0);
        // total.val(0);
    })

    cargarProductes();

})