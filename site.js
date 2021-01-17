var lastScrollTop = 0;

window.addEventListener("scroll", function () {
    const bg = document.getElementById("background");


    if (isInViewport(bg) && isDownwardScrolling()) {
        const element = document.getElementById("content");
        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        document.getElementById("header").style.backgroundColor = "black";
    }
    else if (isInViewport(bg) && !isDownwardScrolling()) {
        const element = document.getElementById("background");
        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        document.getElementById("header").style.backgroundColor = "transparent";
    }

});

function isInViewport(el) {
    var position = el.getBoundingClientRect();
    if (position.top >= 0 && position.bottom <= window.innerHeight) {
        return true;
    }

    if (position.top < window.innerHeight && position.bottom >= 0) {
        return true;
    }
}

function isDownwardScrolling(){
    const st = window.pageYOffset || document.documentElement.scrollTop;

    let isDownward;
    if (st > lastScrollTop){
        isDownward = true;
    } else {
        isDownward = false;
    }
    lastScrollTop = st <= 0 ? 0 : st;
    return isDownward;

}


