async function populateCatalog(search = false) {
    let root = document.getElementById("root");
    let loadRing = document.createElement("img");
    loadRing.classList.add("load-ring");
    loadRing.src = "https://psv4.userapi.com/c536236/u138605199/docs/d35/b08f7dd44073/loading.gif?extra=OAxz3ogoiEaYusNhCHeuwpt6DeAdCtWCmUIxRW4Xqrv790Ey8wLzoEBMhOYJoaHF_0E9J0sEgus1bIRJIJvt8mXpLKBQqEMIcaxc5xtYjppnxXIa1Zt48iuNKwia8x4T1c6nKqLodMWmM4f93GKrX9TD";
    root.appendChild(loadRing);

    if (catalogArray.length === 0) {
        if (!search) {
            await updateCatalog();
        }
    }

    let catalogDiv = document.createElement("section");
    catalogDiv.classList.add("products");
    catalogDiv.id = "products";

    for (let cocktail of catalogArray) {
        let cocktailNode = document.createElement("a");
        cocktailNode.setAttribute('href', '#');
        cocktailNode.setAttribute('onclick', `displayContent('/detail?id=${cocktail.id}'); return false;`);

        let cocktailItemDiv = document.createElement("div");
        cocktailItemDiv.classList.add('card');

        let cocktailName = document.createElement("h2");
        cocktailName.textContent = cocktail.value.name.toUpperCase();
        cocktailItemDiv.appendChild(cocktailName);

        let coffeeImageDiv = document.createElement("img");
        coffeeImageDiv.src = cocktail.value.image;
        cocktailItemDiv.appendChild(coffeeImageDiv);

        let ratingDiv = createRatingDiv(cocktail.value);
        cocktailItemDiv.appendChild(ratingDiv);
        cocktailNode.appendChild(cocktailItemDiv);
        catalogDiv.append(cocktailNode);
    }
    root.removeChild(loadRing);
    root.appendChild(catalogDiv);
}

async function sortCatalog(sortOption, direction) {
    switch (sortOption) {
        case 'name':
            catalogArray.sort(function (a, b) {
                let nameA = a.value.name.toLowerCase(), nameB = b.value.name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            break;
        case 'rating':
            catalogArray.sort((a, b) => getCocktailRating(b.value) - getCocktailRating(a.value));
            break;
        case 'date':
            catalogArray.sort((a, b) => Date.parse(b.value.createDate) - Date.parse(a.value.createDate));
            break;
    }
    if (direction === 'up') {
        catalogArray.reverse();
    }
}

function setSortFilter(sortOption) {
    let direction;
    if (getParams('sort') !== sortOption) {
        direction = 'down';
    } else {
        direction = getParams('direction');
        if(direction === 'down'){
            direction = 'up';
        }
        else{
            direction = 'down';
        }

    }
    let url = `/index?sort=${sortOption}&direction=${direction}`;
    displayContent(url, false, document.getElementById("search-field").value);
}

async function updateCatalog() {
    let catalog = await cocktailStorage.getCatalog();
    catalogArray = [];
    for (let cocktailId in catalog) {
        catalogArray.push({id: cocktailId, value: catalog[cocktailId]});
    }
    catalogArray.reverse();
}

function createRatingDiv(cocktail) {
    let ratingDiv = document.createElement("div");
    ratingDiv.classList.add('grid-item-rating');
    for (let i = 0; i < 5; i++) {
        let starSpan = document.createElement("span");
        starSpan.classList.add("fa");
        starSpan.classList.add("fa-star");
        if (getCocktailRating(cocktail) >= i + 0.5) {
            starSpan.classList.add("checked");
        }
        ratingDiv.appendChild(starSpan);
    }
    return ratingDiv;
}

function search() {
    let searchBar = document.getElementById("search-field");
    let searchText = searchBar.value;

    let searchResults = [];
    updateCatalog().then(() => {});

    if (searchText !== '') {
        for (let cocktail of catalogArray) {
            if (cocktail.value.name.indexOf(searchText) !== -1) {
                searchResults.push(cocktail);
            }
        }
        catalogArray = searchResults;
    }

    displayContent('/index', true, searchText);
}
populateCatalog().then(() => {});
let catalogArray = [];