let lastScrollTop = 0;


window.onload = () => {

    let root = document.getElementById("root");

    let routes= {
        "/": "index",
        "/index": index,
        "/login": login,
        '/register': register
    };


    let scripts= {
        "/": "js/index.js",
        "/index": "js/index.js",
        "/login": "/js/auth.js",
        '/register':"js/auth.js"
    };




    let definedRoutes = Array.from(document.getElementsByClassName("nav-link"));

    let navigate = e => {
        let route = e.target.attributes[0].value;

        // redirect to the router instance
        if (!routes.hasOwnProperty(route)) {
            window.history.pushState({}, '', 'error')
            root.innerHTML = `<h1 style="margin:auto auto">This route is not Defined</h1>`
        } else {
            if(!(routes[route] === index)){
                showNavbar();
            }
            else{
                hideNavbar();
            }

            window.history.pushState({}, '', route)
            root.innerHTML = routes[route]
            const scriptSrc = scripts[route];
            const script = document.createElement("script");
            script.src = scriptSrc
            root.appendChild(script);
        }
    }

    const cards = document.getElementsByClassName("card");
    cards.forEach(card => {
        card.addEventListener('onclick', navigate, false)
    })

    definedRoutes.forEach(route => {
        route.addEventListener('click', navigate, false)
    })

    window.onpopstate = () => {
        navigate(window.location.pathname);
    }

    const firebaseConfig = {
        apiKey: "AIzaSyBsXotNUfYiDTXl3dJS9VfrXVik33tdxAs",
        authDomain: "cocktails-bar.firebaseapp.com",
        projectId: "cocktails-bar",
        storageBucket: "cocktails-bar.appspot.com",
        messagingSenderId: "1021982495967",
        appId: "1:1021982495967:web:e64ccf37bed108b20ac56a"
    };

    firebase.initializeApp(firebaseConfig);

}

window.addEventListener("scroll", function () {
    const bg = document.getElementById("background");
    if (isInViewport(bg) && isDownwardScrolling()) {
        showNavbar();
    } else if (isInViewport(bg) && !isDownwardScrolling()) {
        hideNavbar();
    }
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
    const position = el.getBoundingClientRect();
    if (position.top >= 0 && position.bottom < window.innerHeight) {
        return true;
    }

    if (position.top < window.innerHeight && position.bottom > 0) {
        return true;
    }
}

function isDownwardScrolling(){
    const st = window.pageYOffset || document.documentElement.scrollTop;
    let isDownward;
    isDownward = st > lastScrollTop;
    lastScrollTop = st <= 0 ? 0 : st;
    return isDownward;
}




