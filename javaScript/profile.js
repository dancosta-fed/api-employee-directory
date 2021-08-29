//=== My Own Profile ===//

const myCard = document.getElementById('myProfile');
const myContainer = document.querySelector(".myContainer");
let myProfile = [];

function displayProfile(index) {
    if(myCard.addEventListener('click', () => e )){
        overlay.classList.remove("hidden")
    }
    
}
    
    myContainer.addEventListener('click', e => {

      if (e.target !== gridContainer) {
      const card = e.target.closest(".card");
      const index = card.getAttribute('myProfile');
      displayModal(index);
      }
    });
   
  
    modalClose.addEventListener('click', () => {
      overlay.classList.add("hidden");
    });

    console.log();