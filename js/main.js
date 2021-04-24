async function populateCatalog(search = false) {
    let root = document.getElementById("root");

    if(catalogArray.length === 0){
        if(!search){
            await updateCatalog();
        }
    }

        let catalogDiv = document.createElement("section");
        catalogDiv.classList.add("products");
        catalogDiv.id = "products";

        for (let cocktail of catalogArray) {
            let cocktailNode = document.createElement("a");
            cocktailNode.setAttribute('href', '#');
            cocktailNode.setAttribute('onclick', `onNavigate('/detail?id=${cocktail.id}'); return false;`);

            let cocktailItemDiv = document.createElement("div");
            cocktailItemDiv.classList.add('card');

            //let coffeeImageDiv = createCoffeeImageDiv(coffee.value);
            //coffeeItemDiv.appendChild(coffeeImageDiv);

            let cocktailName = document.createElement("h2");
            //coffeeName.classList.add('coffee-title');

            cocktailName.textContent = cocktail.value.name.toUpperCase();
            cocktailItemDiv.appendChild(cocktailName);

            //let ratingDiv = createRatingDiv(coffee.value);
            //coffeeItemDiv.appendChild(ratingDiv);
            cocktailNode.appendChild(cocktailItemDiv);
            catalogDiv.append(cocktailNode);
        }
        root.appendChild(catalogDiv);


}

function sortCatalog(sortOption) {
    if(getParams("sort") === sortOption){
        catalogArray = catalogArray.reverse();
    }
    else{
        switch (sortOption) {
            case 'name':
                catalogArray.sort(function(a, b) {
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
                //catalogArray.sort((a, b) => getCoffeeRating(b.value) - getCoffeeRating(a.value));
                break;
            case 'date':
                catalogArray.sort((a, b) => Date.parse(b.value.createDate) - Date.parse(a.value.createDate));
                break;
        }
    }

}

function setSortFilter(sortOption) {
    let url = `/index?sort=${sortOption}`;
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

function createRatingDiv(coffee) {
    let ratingDiv = document.createElement("div");
    ratingDiv.classList.add('grid-item-rating');
    for (let i = 0; i < 5; i++) {
        let starSpan = document.createElement("span");
        starSpan.classList.add("fa");
        starSpan.classList.add("fa-star");
        if (getCoffeeRating(coffee) >= i + 0.5) {
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