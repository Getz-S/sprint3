
let favoritos = JSON.parse(localStorage.getItem("favoritospage")) || [];
console.log(favoritos)
const propertiesCardsContainer=document.getElementsByClassName('propertiesCardsContainer')[0]
const renderData = () => {
    propertiesCardsContainer.innerHTML = "";
    favoritos.forEach((element) => {
        propertiesCardsContainer.innerHTML += `
        <article class="propertyCard">
        <div class="topCard">
            <figure>
                <img src="${element.imageP}" alt="${element.name}" class="imageCard">
            </figure>
            <span class="favoriteButton"><img src="../images/favorite.svg" class="favoriteImg" name="${element.id}"></span>
        </div>
        <div class="bottomCard">
            <h3 class="cardTitle">${element.name}</h3>
            <div class="cardInformation">
                <p>Area: ${element.area}</p>
                <p>Precio: ${element.price}</p>
                <p>Ubicación: ${element.location}</p>
            </div>
        </div>
    </article>
          `;
    });
  };
  renderData()
