function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    //  ------------ T A B S -----------  //

const tabs = document.querySelectorAll(tabsSelector),     //  svyaz s knopkami vibora pitaniya po otdelnosti //
tabsContent = document.querySelectorAll(tabsContentSelector),         //  svyaz so slaydami  //
tabsParent = document.querySelector(tabsParentSelector);       //  svyaz s konteynerom knopok //

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none';                            //  01 Skrivaet element  //

            item.classList.add('hide');                                //  02 Skrivaet elementi 
            item.classList.remove('show', 'fade');                     //  ispolzuya Animation 'fade'  //
        
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);                         //  Dezaktiviruet element  //
        });
    }

    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';                     // 01 Pokazivaet element  //
        
        tabsContent[i].classList.add('show', 'fade');                  // 02 Pokazivaet elementi ispolzuya
        tabsContent[i].classList.remove('hide');                       //    ispolzuya Animation 'fade'  //

        tabs[i].classList.add(activeClass);                             //  Aktiviruet element  //
    }

    hideTabContent();
    showTabContent();

    //  --- Obrabotka Sobitiy  ---  //

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {    // Opredelyaet esli click TOCHNO na element //

            tabs.forEach((item, i) => {                                 // Sravnivaet i opredelyaet nomer //
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

export default tabs;