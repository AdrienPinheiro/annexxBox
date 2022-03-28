const MINIMUM_SEARCH_LENGTH = 3;

let infoBox = document.querySelector('.resultSearch');
let input = document.querySelector("#search");
let boxes = []

Array.prototype.remove = Array.prototype.remove || function(){this.splice(0, this.length)};

/** 
 * @description Prend la valeur de l'input et lance la fonction loadBox()
 * @param  {string} e
 */
function searchBox(e){
    let search;
    if(!e){
        search = input.value.trim()
    } else {
        search = e
        input.value = ""
    }
    if(search.length >= MINIMUM_SEARCH_LENGTH){
        let maj = search.slice(0,1).toUpperCase()
        let other = search.slice(1).toLowerCase()
        let searchValue = maj + other
        loadBox(searchValue);
    }
}

/**
 * @description Fonction qui permet de récuperer les fichiers JSON et de trier la response
 * @param  {string} searchValue
 */
async function loadBox(searchValue){
    const URL = `/annexxBox/json/box.json`;
    const response = await fetch(`${URL}`)
    const data = await response.json()
        .catch((error) => {
            console.log(error);
        })
    for(i=0;i<data.length; i++){
        if(data[i].city == searchValue ){
            boxes.push(data[i])
        } else{
            infoBox.innerHTML = `
            <p class="notFound">Nous n'avons malheureusement pas de box disponible.
            Vous pouvez néanmoins nous contacter pour en réserver !</p>
            <p class="contactPhone"><i class="fas fa-phone-alt"></i> 05 62 19 19 79.</p>
            <p class="otherBox">Nous avons aussi des box situés dans plusieurs autres villes ! <i class="fas fa-arrow-down"></i></p>`
        }
    }
    if (boxes[0].city == searchValue) return showListBox(boxes)
}

/**
 * @description Passe dans le tableau boxes pour écrire l'html des données triées
 * @param  {Array} boxes
 */
function showListBox(boxes){
    infoBox.innerHTML = `
    <div class="topResultSearch">
        <h1>Garde Meuble ${boxes[0].city}</h1>
        <p>La solution à vos besoins d’espace et de stockage de vos affaires, c’est le garde-meubles ou le self-stockage à ${boxes[0].city}.</p>

        <p>Dans un garde meubles, vous même ou votre déménageur transporte vos biens et cartons vers un bâtiment sous surveillance, où vos biens seront stockés dans un boc pendant une période
        déterminée. Dans un garde meuble classique dès que vos affaires sont dans le box, vous ne pouvez plus y accéder jusqu’à la fin de la durée du stockage.</p>
        
        <p>La réponse la plus efficace est la nouvelle génération de garde-meubles: le self stockage. Un box individuel accueille vos biens et vous en avez la clef.
        L’avantage du self-stockage, c’est que quand vous le souhaitez, vous pouvez vous rendre à votre box pour ramener ou déposer des meubles et cartons.
        l’accès est illimité et gratuit, tous les jours.</p>
        
        <p>Voici notre sélection de sites ${boxes[0].resident} où vous pourrez ranger vos affaires: meubles, matériel ou affaires de sport, cartons... en toute sécurité et flexibilité, puisque vous louez sans aucun
        engagement de durée, et pourrez partir quand vous le voudrez.</p>
    </div>
    `
    let listBox = document.createElement("div");
    listBox.classList.add('listBox');
    infoBox.appendChild(listBox)
    boxes.map((box) => {
        let cardBox = document.createElement("div");
        cardBox.classList.add('cardBox')
        cardBox.dataset.id = box.id;
        cardBox.innerHTML = `
        <h4>${box.localisation}</h4>
        <p class="address">${box.address}</p>
        <p class="phone"><i class="fas fa-phone-alt"></i> ${box.phone}</p>
        <h4>Horaires des bureaux :</h4>
        <p class="hourly">${box.hourlyWeek}</p>
        <p class="hourly">${box.hourlyWeekEnd}</p>
        `;
        listBox.appendChild(cardBox);
    });
    boxes.remove();
} 
