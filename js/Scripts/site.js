let routes= {
    "/": index,
    '403':error_403,
    "/index": index,
    "/login": login,
    "/register": register,
    "/detail":detail,
    "/create":create
};
let scripts= {
    "/": "js/index.js",
    "/index": "js/index.js",
    "/login": "js/auth.js",
    "/register":"js/auth.js",
    "/detail":"js/detail.js",
    "/create":"js/create.js"
};

window.onload = async () => {
    window.onpopstate = () => {
        displayContent(window.location.pathname, true).then(() => { })
    };

    let root = document.getElementById("root");
    let definedRoutes = Array.from(document.getElementsByClassName("nav-link"));
    await populateCatalog();
    let navigate = e => {
        let route = e.target.attributes[0].value;
        // redirect to the router instance
        if (!routes.hasOwnProperty(route)) {
            window.history.pushState({}, '', 'error')
            root.innerHTML = error_404;
        } else {
            displayContent(route).then(() => { });
        }
    }

    const cards = Array.from(document.getElementsByClassName("card"));
    cards.forEach(card => {
        card.addEventListener('onclick', navigate, false)
    })

    definedRoutes.forEach(route => {
        route.addEventListener('click', navigate, false)
    })

    if (auth == null) {
        initializeAuthentication();
    }

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            showAuthenticatedControls();
        } else {
            hideAuthenticatedControls();
        }
    });

    await displayContent(window.location.pathname);
}

function getPath(pathname) {
    let startParamsIndex = pathname.indexOf('?');
    if (startParamsIndex !== -1) {
        return pathname.slice(0, startParamsIndex);
    }
    return pathname;
}

function getParams(param) {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

async function displayContent(pathname="index", pop = false, searchText = ''){
    window.scrollTo(0, 0);

    let root = document.getElementById("root");

    let path = getPath(pathname);

    if (!routes.hasOwnProperty(path)) {
        root.innerHTML = error_404;
    } else {
        if(!pop){
            window.history.pushState({}, '', pathname);
        }
        if(path === '/create'){
            if(auth.currentUser === null){
                root.innerHTML = error_403;
                return;
            }
        }
        root.innerHTML = routes[path];
        if(path === '/index' || path === '/'){
            if(catalogArray.length === 0){
                let contentDiv = document.getElementById("content");
                let notFoundDiv = document.createElement("div");
                notFoundDiv.innerHTML = "It's nothing to display here"
                notFoundDiv.classList.add("not-found");
                contentDiv.appendChild(notFoundDiv);
            }

            if(searchText !== ''){
                let searchBar = document.getElementById("search-field");
                searchBar.value = searchText;
                searchBar.focus();
                await populateCatalog(true);
                let sortDiv = document.getElementById("sort");
                sortDiv.style.display = 'none';
            }
            else{
                if(window.location.search.indexOf("sort") !== -1){
                    await sortCatalog(getParams("sort"), getParams("direction"));
                }

                await populateCatalog();
                let sortDiv = document.getElementById("sort");
                sortDiv.style.display = 'inline-block';
            }
        }

        if(path === '/detail'){
            await populateDetail(getParams("id"))
        }
    }
}

function getCocktailRating(cocktail) {
    if (!('marks' in cocktail)) {
        return 0;
    }

    let marks = Object.values(cocktail.marks);
    if (marks.length === 0) {
        return 0;
    }
    return marks.reduce((a, b) => (a + b)) / marks.length;
}