function calc() {

//  ==========  Calculator  ========= //

        const result = document.querySelector('.calculating__result span');                     // Deleg 'span' result //

        let sex, height, weight, age, ratio;
    
    
        if (localStorage.getItem('sex')) {                                                      // Esli v 'localStorage' est peremennay 'sex' to ..
            sex = localStorage.getItem('sex');                                                  // .. togda 'sex' ustanavlivaetsya 'par Default on Page' //
    
        } else {
            sex = 'female';                                                                     // Esli Net to 'female' - "par Default" //
            localStorage.setItem('sex', 'female');                                              // Takje v 'localStorage' 'sex' = "female" //
        }
    
    
        if (localStorage.getItem('ratio')) {                                                    // Esli v 'localStorage' est peremennay 'ratio' to ..
            ratio = localStorage.getItem('ratio');                                              // .. togda 'ratio' ustanavlivaetsya 'par Default on Page' //
    
        } else {
            ratio = 1.375;                                                                      // Esli Net to 'ratio = 1.375' - "par Default" //
            localStorage.setItem('ratio', 1.375);                                               // Takje v 'localStorage' 'ratio' = "1.375" //
        }
    
    
        function initLocalSettings(selector, activeClass) {                                     // Ustanavlivaet "activeClass" otnositelno "localStorage" //
    
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
    
                elem.classList.remove(activeClass);                                             // Reset "activeClass" //
    
                if(elem.getAttribute('id') === localStorage.getItem('sex')) {                   // ESli atribute 'sex' sootvetstvuet s "localStorage" to ..
                    elem.classList.add(activeClass);                                            // set "activeClass" //
                }
    
                if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {         // ESli atribute 'ratio' sootvetstvuet s "localStorage" to ..
                    elem.classList.add(activeClass);                                            // set "activeClass" //
                }
            });
        }
    
     // Optimal Version //
    
        initLocalSettings('#gender div', 'calculating__choose-item_active');                        // Zapusk "init" knopok 'Pol' //
    
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');       // Zapusk "init" knopok 'Activnost' //
    
    
        function calcTotal() {                                                                      // ==== MAIN Function ==== //
    
            if (!sex || !height || !weight || !age || !ratio) {                                     // Predvaritelnaya proverka dannix //
                result.textContent = '____';
                return;                                                                             // Ostanovka funkcii //
            }
    
            if (sex === 'female') {
    
                    result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                    result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    
        calcTotal();
    
        // Optimal Version //
    
        function getStaticInformation(selector, activeClass) {                              // Funkciya dlya Konrolya i Poluchenia "sex" i "ratio" //

            const elements = document.querySelectorAll(selector);                               // Deleg vse 'block' vnutri "selector" //

            elements.forEach(elem => {
                elem.addEventListener('click', (e) => {                     // Deistvie pri 'click' na sodergimoe "elem"/"elements"/"parentSelector" - 'div' //

                    if (e.target.getAttribute('data-ratio')) {                                  // Deistvie pri vibore "Activnost" //
                        ratio = +e.target.getAttribute('data-ratio');                           // Prisvaevaet 'ratio' atribut "ratio" najatoi knopki-(e) //

                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));    // Dobavlenie peremennoi 'ratio' v "localStorage" //
        
                    } else {                                                                    // Deistvie pri vibore "Pol" //
                        sex = e.target.getAttribute('id');                                      // Prisvaevaet 'sex' atribut najatoi knopki-(e) //

                        localStorage.setItem('sex', e.target.getAttribute('id'));               // Dobavlenie peremennoi 'sex' v "localStorage" //
                    }
        
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);                                     // Reset vsex knopok 'class-active' //
                    });
        
                    e.target.classList.add(activeClass);                                        // Ustanovke 'class-active' na najatuyu knopku-(e) //
        
                    calcTotal();
                });
            });

        }

        // Optimal Version //
    
        getStaticInformation('#gender div', 'calculating__choose-item_active');                     // Zapusk kontrolya knopok 'Pol' //
    
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');    // Zapusk kontrolya knopok 'Activnost' //
    
    
        function getDynamicInformation(selector) {                                              // Funkciya dlya obrabotki vvedenix dannix v "Konstituciya" //
    
            const input = document.querySelector(selector);                                     // Individualniy kontrol kajdogo 'input'-a //
    
            input.addEventListener('input', () => {                                             // Deistvie pri kajdom vvode 'input'-a //
    
                if(input.value.match(/\D/g)) {                                                  // Deistvie esli vvedenniy "symbol" ne 'digit' // 
                    input.style.border = '1px solid red';
                    input.style.background = '#fba3a3';
    
    
                } else {                                                                        // Reset "alert-color" //
                    input.style.border = 'none';
                    input.style.background = 'none';
    
                }
    
                switch(input.getAttribute('id')) {                                              // Opredelenie 'id' -"input"-a //
    
                    case 'height':                                                              // Deistvie pri vvode 'input' "Rost"" //
                        height = +input.value;                                                  // Zapis dannix v peremennuyu "height" //
    
                        break;
    
                    case 'weight':                                                              // Deistvie pri vvode 'input' "Ves"" //
                        weight = +input.value;                                                  // Zapis dannix v peremennuyu "weight" //
                        break;
    
                    case 'age':                                                                 // Deistvie pri vvode 'input' "Vozvrast"" //
                        age = +input.value;                                                     // Zapis dannix v peremennuyu "age" //
                        break;
                }
    
                calcTotal();
            });
        }
    
        getDynamicInformation('#height');                                                       // Zapusk kontrolya 'input' "Rost"" //
        getDynamicInformation('#weight');                                                       // Zapusk kontrolya 'input' "Ves"" //
        getDynamicInformation('#age');                                                          // Zapusk kontrolya 'input' "Vozvrast"" //
    
}

export default calc;