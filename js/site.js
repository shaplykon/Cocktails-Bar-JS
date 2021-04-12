let lastScrollTop = 0;
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

window.onload = () => {

    let root = document.getElementById("root");
    let definedRoutes = Array.from(document.getElementsByClassName("nav-link"));

    let navigate = e => {
        let route = e.target.attributes[0].value;

        // redirect to the router instance
        if (!routes.hasOwnProperty(route)) {
            window.history.pushState({}, '', 'error')
            root.innerHTML = `<h1 style="margin:auto auto">This route is not Defined</h1>`
        } else {
            if((route !== "\index")){
                showNavbar();
            }
            else{
             checkBgPosition();
            }

           displayContent(route);
        }
    }

    const cards = Array.from(document.getElementsByClassName("card"));
    cards.forEach(card => {
        card.addEventListener('onclick', navigate, false)
    })

    definedRoutes.forEach(route => {
        route.addEventListener('click', navigate, false)
    })

    if(auth == null){
        initializeAuthentication();
    }

    if (isAuthorized()){
        showAuthenticatedControls();
    }
    else{
        hideAuthenticatedControls();
    }

    onNavigate(window.location.pathname);

    window.onpopstate = () =>{ displayContent(window.location.pathname)};


}

const onNavigate = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    );
    displayContent(pathname);
}

function checkBgPosition(){
    const bg = document.getElementById("background");
    if (isInViewport(bg) && isDownwardScrolling()) {
        showNavbar();
    } else if (isInViewport(bg) && !isDownwardScrolling()) {
        hideNavbar();
    }
}

async function displayContent(path="index"){
    showNavbar();
    let root = document.getElementById("root");
    // const path = window.location.pathname
    window.history.pushState({}, '', path)
    root.innerHTML = routes[path]
    const scriptSrc = scripts[path];
    const script = document.createElement("script");
    script.src = scriptSrc
    root.appendChild(script);
}

window.addEventListener("scroll", function () {
  checkBgPosition();
});

function showNavbar(){
    document.getElementById("header").style.backgroundColor = "black";
    document.getElementById("header").style.boxShadow = "0px 15px 8px 0px rgba(34, 60, 80, 0.2)";
}

function hideNavbar(){
    document.getElementById("header").style.backgroundColor = "transparent";
    document.getElementById("header").style.boxShadow = "none";
}

function isInViewport(el) {
    if(el !== null){
        const position = el.getBoundingClientRect();
        if (position.top >= 0 && position.bottom <= window.innerHeight) {
            return true;
        }

        if (position.top < window.innerHeight && position.bottom > 0) {
            return true;
        }
    }
}

function isDownwardScrolling(){
    const st = window.pageYOffset || document.documentElement.scrollTop;
    let isDownward;
    isDownward = st > lastScrollTop;
    lastScrollTop = st <= 0 ? 0 : st;
    return isDownward;
}

function  cardClick(){
    displayContent("/detail");
}



