async function populateCatalog() {
    let root = document.getElementById("root");
    let loadRing = document.createElement("img");
    loadRing.src = "https://psv4.userapi.com/c536236/u138605199/docs/d35/1556056e9dde/loading.gif?extra=IwVbtJqKL3Rs3WXyKVHFYVIDHkrmzb-QFLYrcjqS7hSUf58TttV8kOain74A5vXiT4tJ3TTDIFTBC2e0khhmCtO7gGq86VNnOKd5Z3LBIQb63LJU5KQesbNJPAV5wWVK48cxrzRK5Jv9UuYTxkQ7Gjyz";
    loadRing.classList.add("load-ring");

    root.appendChild(loadRing);
    //let filterOption = getURLParam('filter');
    //let sortOption = getURLParam('sort');
    //setFilterTitles(filterOption, sortOption);
    let catalog = await cocktailStorage.getCatalog();

    let catalogArray = [];

    for (let cocktailId in catalog) {
        catalogArray.push({id: cocktailId, value: catalog[cocktailId]});
    }
    catalogArray.reverse();

    //catalog = filterCatalog(filterOption, sortOption, catalog);
    catalog = catalogArray;
    let catalogDiv = document.createElement("section");
    catalogDiv.classList.add("products");
    catalogDiv.id = "products";
    for (let cocktail of catalog) {
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
    root.removeChild(loadRing);
    root.appendChild(catalogDiv);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function filterCatalog(filterOption, sortOption, catalog) {
    let catalogArray = [];

    for (let cocktailId in catalog) {
        catalogArray.push({id: cocktailId, value: catalog[cocktailId]});
    }
    catalogArray.reverse();

    if (filterOption == null && sortOption == null) {
        return catalogArray;
    }

    if (filterOption == 'top') {
        catalogArray.sort((a, b) => getCoffeeRating(b.value) - getCoffeeRating(a.value));
        catalogArray = catalogArray.slice(0, 10);
    }

    switch (sortOption) {
        case 'name':
            catalogArray.sort(function(a, b) {
                var nameA = a.value.name.toLowerCase(), nameB = b.value.name.toLowerCase();
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
            catalogArray.sort((a, b) => getCoffeeRating(b.value) - getCoffeeRating(a.value));
            break;
        case 'date':
            catalogArray.sort((a, b) => Date.parse(b.value.createDate) - Date.parse(a.value.createDate));
            break;
    }

    return catalogArray;
}

function setFilterTitles(filterOption, sortOption) {
    if (filterOption != null) {
        let filterSelect = document.querySelector('.filter-select');
        switch (filterOption.toLowerCase()) {
            case 'all':
            case 'top':
                filterSelect.textContent = filterOption.toUpperCase();
                break;
        }
    }
    if (sortOption != null) {
        let sortSelect = document.querySelector('.sort-select');
        switch (sortOption.toLowerCase()) {
            case 'name':
            case 'rating':
            case 'date':
                sortSelect.textContent = sortOption.toUpperCase();
                break;
        }
    }
}

function changeFilter(filterOption) {
    let url = `/catalog?filter=${filterOption}`;
    let sortOption = getURLParam('sort');
    if (sortOption != null) {
        url += `&sort=${sortOption}`;
    }
    onNavigate(url);
}

function changeSort(sortOption) {
    let url = `/catalog?sort=${sortOption}`;
    let filterOption = getURLParam('filter');
    if (filterOption != null) {
        url += `&filter=${filterOption}`;
    }
    onNavigate(url);
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

populateCatalog();
