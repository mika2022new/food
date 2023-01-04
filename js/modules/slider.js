function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

//  S l i d e s  -  O p t i m i s e d  //

        const slider = document.querySelector(container),
        
              slides = document.querySelectorAll(slide),
              prev = document.querySelector(prevArrow),
              next = document.querySelector(nextArrow),
              total = document.querySelector(totalCounter),
              current = document.querySelector(currentCounter),

              slidesWrapper = document.querySelector(wrapper),
              slidesField = document.querySelector(field),
              
              width = window.getComputedStyle(slidesWrapper).width;           // Poluchaet 'width' iz objekta nastroek //

        let slideIndex = 1;                                                   // Poryadkoviy nomer pokazivaemogo slayda //

        let offset = 0;                                                       // Otstup = 0 //

        // ========== //

        // Counter //

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
        
        function addZero() {
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;          // Esli nado, Podstavlyaet "0" v 'current' //
            } else {
                current.textContent = slideIndex;
            }
        }
        // Karusel //

        slidesField.style.width = 100 * slides.length + '%';    // Ustanavlivaet "max-width" dlya "slidesField" v Format "CSS" Style //

        slidesField.style.display = 'flex';                        // "flex" delaet posledovatelnost objektov "string" //
        slidesField.style.transition = '0.5s all';

        slidesWrapper.style.overflow = 'hidden';             // Skrivaet vse objekti vixodyashie za granicu oblasti vidimosti //

        slides.forEach(slide => {                                
            slide.style.width = width;                             // Ustanavlivaet kajdomu "slide" fix width //
        });

        //  ===================  //

        slider.style.position = 'relative';

        const indicators = document.createElement('ol'),               // Sozdanie 'ol' contenta //

              dots = [];                                               // Sozdanie pustogo massiva 'dot' //

        indicators.classList.add('carousel-indicators');               // Sozdanie 'classList' dlya 'ol' contenta //

// Integraciya 'CSS-Text' v 'HTML' code
        indicators.style.cssText = `                                                 
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;        
        `;

        slider.append(indicators);                                      // Dobavlyaet 'indicators' v konec 'slider' //

        for (let i = 0; i < slides.length; i++) {     // Perebiraet vse 'slides' poka ne zakonchatsya -> "i < slides.length" //

            const dot = document.createElement('li');                   // Sozdanie "dots" 'i' kol-vo raz v 'li' contente //

            dot.setAttribute('data-slide-to', i + 1);            // Privyazivaet kajduyu "dot" k 'slide' po nomeru "i" //

// Integraciya 'CSS-Text' v 'HTML' code
            dot.style.cssText = `            
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;            
            `;

            if (i == 0) {                                            // Delaet 1-uy "dot" neprozrachnoi - tolko 1 raz ! //
                dot.style.opacity = 1;    
            }

            indicators.append(dot);                                   // Dobavlyaet "dot" v 'indicators' //

            dots.push(dot);                                            // Dobavlyaet "dot" v massiv 'dots' //

        }

        function updateDot() {
            dots.forEach(dot => dot.style.opacity = '.5');          // Vse 'dot' delaet polu-prozracnoi //
            dots[slideIndex - 1].style.opacity = 1;                 // 'dot' tekushey kartinki delaet ne-prozracnoi //
        }
        

        function deleteNotDigits(str) {
            return +str.replace(/\D/g, '');
        }        

        //  ===================  //

        next.addEventListener('click', () => {
            if (offset == deleteNotDigits(width) * (slides.length - 1)){   // if = "shirina 1-ogo slide" * "kol-vo slides" //
                offset = 0;
            } else {
                offset += deleteNotDigits(width);
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == slides.length) {                               // Make "slide" in "Circle" //
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            addZero();
            updateDot();
        });

        prev.addEventListener('click', () => {
            if (offset == 0){     
                offset = deleteNotDigits(width) * (slides.length - 1);
            } else {
                offset -= deleteNotDigits(width);
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 1) {                                                          // Make "slide" in "Circle" //
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }

            addZero();
            updateDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click',(e) => {
            const slideTo = e.target.getAttribute('data-slide-to');       // Prisvaevaet nomer 'data-slide-to' k "slideTo" // 

            slideIndex = slideTo;                                         // Prisvaevaet nomer tekushego 'slide' k "slideIndex" //

            offset = deleteNotDigits(width) * (slideTo - 1);              // 'replace' zamenyaet vse ne digits na "" - '15px = 15' //       

            slidesField.style.transform = `translateX(-${offset}px)`;     // Pere-Transformatiya karuseli na nujniy otstup //

            addZero();
            updateDot();
        });
    });

}

export default slider;