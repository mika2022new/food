function timer(id, deadline) {
    
    //  ------------ T I M E R -----------  //

    function getTimeRemaining(endtime) {                                // Raschitivaet raznicu vremeni //
        
        const t = Date.parse(endtime) - Date.parse(new Date()),     // " Date.parse " prevrashaet datu v millisekund //

                days = Math.floor(t / (1000 * 60 * 60 * 24)),        // Delit raznicu v mlsek na kol-vo mlsek v sutkax 
                                                                    // i prevrashaet v dni BEZ OSTATKA //
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),    // Delit raznicu v mlsek na kol-vo mlsek v 1-om chase
                                                                    // i podschitivaet OSTATK //
                minutes = Math.floor((t / 1000 / 60) % 60),         // Delit raznicu v mlsek na kol-vo mlsek v 1-oi minute
                                                                    // i podschitivaet OSTATK //                
                seconds = Math.floor((t / 1000) % 60);            

        return {                                        //  Vivodit dannie Naruju //

            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero(num) {                             // Dobavlyaet '0' //
        if (num >=0 && num <10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),

              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),

              timeInterval = setInterval(updateClock, 1000);


        updateClock();                                          // Korrektnoe obnovlenie page //


        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }

    }

    setClock(id, deadline);

}

export default timer;