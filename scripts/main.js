const inputTypeProperty = document.getElementById('input1')
const inputPropertyLocation = document.getElementById('input2')
const inputSearch = document.getElementById('input3')
const searchButton = document.getElementById('searchButton')
const propertiesCardsContainer = document.getElementById('propertiesCardsContainer')
const detailsButton = document.getElementById('detailsButton')
let favoritos = JSON.parse(localStorage.getItem("favoritospage")) || [];
let dataFiltered = [];
let data = [];


const getData = async () => {
  const URL_API = "http://localhost:3000/properties";
  const response = await fetch(URL_API);
  data = await response.json();
  dataFiltered = data;
  renderData();
  console.log(data);
};

getData();

const handleSearch = (e) => {
  e.preventDefault();
  let query = inputSearch.value;
  console.log('Buscando');
  filterArray(query);
  renderData();
};

const filterArray = (word) => {
  dataFiltered = data.filter((property) => 
    property.name.toLowerCase().includes(word.toLowerCase())&& property.location == inputPropertyLocation.value&& property.type == inputTypeProperty.value
  );

  console.log(dataFiltered);
};

const renderData = () => {
  propertiesCardsContainer.innerHTML = "";
  dataFiltered.forEach((element) => {
    propertiesCardsContainer.innerHTML += `
    <article class="propertyCard">
    <div class="topCard">
        <figure>
            <img src="${element.imageP}" alt="${element.name}" class="imageCard">
        </figure>
        <span class="favoriteButton"><img src="../images/favorite.svg" class="favoriteImg" name="${element.id}"></span>
        <span class="detailsButton" id="detailsButton">Ver detalles</span>
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


searchButton.addEventListener("click", handleSearch);

document.addEventListener("click", ({ target }) => {

  //Evento favoritos

  if (target.classList.contains("favoriteImg")) {
    const savefav = dataFiltered.find(
      (item) => item.id == target.getAttribute("name")
    );
    const elementExist = favoritos.some((item) => item.id === savefav.id);
    console.log(elementExist);
    if (elementExist == false) {
      favoritos.push(savefav);
      localStorage.setItem("favoritospage", JSON.stringify(favoritos));
    }
  }

  //Evento ver detalles

  if (target.classList.contains('detailsButton')) {
    localStorage.setItem('idVer', JSON.stringify())
    window.location.href = "../pages/details.html";
}
});

