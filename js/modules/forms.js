import {openModal, closeModal} from './modal';

import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {

//  Obrabotka 'Forms'  // 

    const forms = document.querySelectorAll(formSelector);                        // Deleg vse 'form' na sayte  //

    const message = {                                                       //  Sozdanie podskazki sobitiya //
        loading: 'img/form/spinner.svg',
        success: 'Spasibo, skoro svyagemsya !',
        failure: 'Error..'
    };

    forms.forEach(item => {                                                 // Obrabotka i OTPRAVKA formi //
        bindPostData(item);
    });


    function bindPostData(form) {                                           // Funksiya dlya privyazke  //

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');            // Sozdanie 'div' s podskazkoy i vivod v HTML // 
            statusMessage.src = message.loading;            
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);                                    // Sozdaet 'formData' iz kajdoy 'form' //

            //  ================  //

            const json = JSON.stringify(Object.fromEntries(formData.entries()));    // 1. "formData.entries" - massiv v massive //
                                                                                    // 2. "Object.fromEntries" - Object //
                                                                                    // 3. "JSON.stringify" - JSON format //

            //  ================  //           

            postData('http://localhost:3000/requests', json)

            // .then(data => data.text())             
            .then(data => {

                    console.log(data);
                    showThanksModal(message.success);                                       // Opoveshenie polzovatelya //
                    statusMessage.remove();                                                 // Ochistka podskazki cherez 2 min //
            })
            .catch(() => {
                showThanksModal(message.failure);                                           // Opoveshenie polzovatelya //
            })

            .finally(() => {
                    form.reset();                                                           // Ochistka formi //
            });

        });
    }

    //  'Thanks' Modal Window  //

    function showThanksModal(message) {

        const prevModalDialog = document.querySelector('.modal__dialog');       // Deleg 'modal window' dlya dalneyshey zameni //

        prevModalDialog.classList.add('hide');                                  // skrivaet prevModal //

        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');                      // Sozdanie novogo 'div' dlya vstavki v HTML //
        thanksModal.classList.add('modal__dialog');                             // Dobavlenie v 'div' roditelskogo klassa //

        thanksModal.innerHTML = `

            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>                      
        `;

        document.querySelector('.modal').append(thanksModal);               // Dobavlyaet 'div' v HTML kod //

        setTimeout(() => {                                                  // Cherez 4 sek udalyet thanks modal //
            thanksModal.remove();

            prevModalDialog.classList.add('show');                          // Vosstanavlivaet modal default //
            prevModalDialog.classList.remove('hide');

            closeModal('.modal');                                                   // Skrivaet modal window //
        }, 4000);
    }

}

export default forms;