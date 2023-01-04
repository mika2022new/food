
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);                    // Deleg modal window //

    modal.classList.add('show');
    modal.classList.remove('hide');
    //   modal.classList.toggle('show');                                    // 2-nd Version - Pokazivaet Modal //
    document.body.style.overflow = 'hidden';                              // Blokiruet Prukrutku stranici //

    if (modalTimerId) {
        clearInterval(modalTimerId);                                         // Pokazivaet modal tolko 1 raz //  
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);                    // Deleg modal window //

    modal.classList.add('hide');
    modal.classList.remove('show');                                              
  //   modal.classList.toggle('show');                                      // Skrivaet Modal //
    document.body.style.overflow = '';                                      // Vostanavlivaet Prukrutku stranici //
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    //  --------   M o d a l - 3-rd Version (New Optimised) --------  //

    const modalTrigger = document.querySelectorAll(triggerSelector),        // Deleg All buttons //
          modal = document.querySelector(modalSelector);                    // Deleg modal window //
        //   modalCloseBtn = document.querySelector('[data-close]');        // Deleg modal close button //
          


    modalTrigger.forEach(btn => {                                           // Prisvaevaet vsem knopkam peremennuyu "btn" //
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });
   
//-----------------//

    modal.addEventListener('click', (e) => {                                      // deistvie pri najatii na outside zone..
        if (e.target === modal || e.target.getAttribute('data-close') == '') {    // I TAKJE na 'x' //
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {                           // deistvie pri najatii na "Escape"   //
          if (e.code ==="Escape" && modal.classList.contains('show')) {     // Tolko esli "modal" otkrit         //
            closeModal(modalSelector);
        }
    });

//--------------- //

    function showModalByScroll() {
        if (window.pageYOffset + 100 + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


}

export default modal;

export {openModal};
export {closeModal};