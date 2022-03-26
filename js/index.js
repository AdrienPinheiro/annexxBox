const MINIMUM_SEARCH_LENGTH = 3;

let listBox = document.querySelector('.resultSearch');
let input = document.querySelector("#search");
let boxes = []

Array.prototype.remove = Array.prototype.remove || function(){this.splice(0, this.length)};

/** 
 * @description Prend la valeur de l'input et lance la fonction loadBox()
 * @param  {string} e
 */
function searchBox(e){
    let search = input.value.trim() || e
    if(search.length >= MINIMUM_SEARCH_LENGTH){
        let maj = search.slice(0,1).toUpperCase()
        let other = search.slice(1)
        let searchValue = maj + other
        loadBox(searchValue);
    }
}

/**
 * @description Fonction qui permet de récuperer les fichiers JSON et de trier la response
 * @param  {string} searchValue
 */
async function loadBox(searchValue){
    const URL = `/json/box.json`;
    const response = await fetch(`${URL}`)
    const data = await response.json()
        .catch((error) => {
            console.log(error);
        })
    for(i=0;i<data.length; i++){
        if(data[i].city == searchValue ){
            boxes.push(data[i])
        } else{
            listBox.innerHTML = `<p class="notFound">Pas de box trouvé</p>`
        }
    }
    if (boxes[0].city == searchValue) return showListBox(boxes)
}

/**
 * @description Passe dans le tableau boxes pour écrire l'html des données triées
 * @param  {Array} boxes
 */
function showListBox(boxes){
    listBox.innerHTML = "";

    boxes.map((box) => {
        let cardBox = document.createElement("div");
        cardBox.classList.add('cardBox')
        cardBox.dataset.id = box.id;
        cardBox.innerHTML = `
        <div class="cardBoxTop">
            <h4>${box.localisation}</h4>
            <p>${box.address}</p>
            <p>${box.phone}</p>
            <p>Horaires des bureaux :</p>
            <p>${box.hourly}</p>
        <div>
        `;
        listBox.appendChild(cardBox);
    });
    boxes.remove();
    loadOneBox();
}
