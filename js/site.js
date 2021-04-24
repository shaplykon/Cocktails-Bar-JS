let routes= {
    "/": index,
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

    let navigate = e => {
        let route = e.target.attributes[0].value;

        // redirect to the router instance
        if (!routes.hasOwnProperty(route)) {
            window.history.pushState({}, '', 'error')
            root.innerHTML = `<h1 style="margin:auto auto">This route is not Defined</h1>`
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

    if (auth.currentUser !== null) {
        showAuthenticatedControls();
    } else {
        hideAuthenticatedControls();
    }

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            showAuthenticatedControls();
        } else {
            hideAuthenticatedControls();
        }
    });

    onNavigate(window.location);
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

const onNavigate = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    );
    displayContent(pathname).then(() => {});
}

async function displayContent(pathname="index", pop = false, searchText = ''){
    window.scrollTo(0, 0);

    let root = document.getElementById("root");

    let path = getPath(pathname);
    if(!pop){
        window.history.pushState({}, '', pathname);
    }
    root.innerHTML = routes[path];

    if(path === '/index'){
        if(searchText !== ''){
            let searchBar = document.getElementById("search-field");
            searchBar.value = searchText;
            searchBar.focus();
            await populateCatalog(true);
        }
        else{
            await populateCatalog();
        }

        if(window.location.search.indexOf("sort") !== -1){
            sortCatalog(getParams("sort"));
        }
        else{
            sortCatalog("date");
        }


    }

    if(path === '/detail'){
        await populateDetail(getParams("id"))
    }

    const scriptSrc = scripts[path];
    const script = document.createElement("script");
    script.src = scriptSrc
    root.appendChild(script);
}


