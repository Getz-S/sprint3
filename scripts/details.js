const propertiesCardsContainer = document.getElementById('propertiesCardsContainer')
//Crear función que nos permita obtener el API

const getData = async (url) => {
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return data.results

    } catch (error) {
        console.log(error);
        return null
    }
}


//Declaro función que permite pintar las cards en el HTML

const printCards = (data) => {
    //Primero debemos limpiar lo que sea que se encuentre en el contenedor
    propertiesCardsContainer.innerHTML = '';

    //recorre el array data para pintar las cards dinámicamente
    data.forEach(element => {
        //podemos desestructurar el objeto element para trabajar directamente con las propiedades de cada objeto.
        const { id, name, imageP, location, area, price} = element;
        propertiesCardsContainer.innerHTML += `
        <article class="propertyCard">
        <div class="topCard">
            <figure>
                <img src="${element.imageP}" alt="${element.name}" class="imageCard">
            </figure>
            <span class="favoriteButton"><img src="../images/favorite.svg" class="favoriteImg" name="${element.id}"></span>
            <span class="detailsButton">Ver detalles</span>
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
        `
    });
}

const urlApi = 'http://localhost:3000/properties';

//capturar el id que guardamos en el LocalStorage

const idVer = JSON.parse(localStorage.getItem('idVer'));


//Vamos a escuchar al evento DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {
    getData(urlApi)
        .then(resp => {
            const property = resp.filter(item => item.id === parseInt(idVer));
            printCards(property);
        })
        .catch(error => console.log(error))
})
