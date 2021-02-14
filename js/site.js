let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    const bg = document.getElementById("background");
    if (isInViewport(bg) && isDownwardScrolling()) {
        document.getElementById("header").style.backgroundColor = "black";
        document.getElementById("header").style.boxShadow = "0px 15px 8px 0px rgba(34, 60, 80, 0.2)";
        console.log("Scrolled down");

    }
    else if (isInViewport(bg) && !isDownwardScrolling()) {
        document.getElementById("header").style.backgroundColor = "transparent";
        document.getElementById("header").style.boxShadow = "none";
        console.log("Scrolled up");
    }
});

function isInViewport(el) {
    const position = el.getBoundingClientRect();
    if (position.top >= 0 && position.bottom  <= window.innerHeight) {
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

function cardClick(){
    window.open("detail.html", "_self", false);
}




