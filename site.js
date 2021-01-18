let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    const bg = document.getElementById("background");
    if (isInViewport(bg) && isDownwardScrolling()) {
        document.getElementById("header").style.backgroundColor = "black";
        console.log("Scrolled down");
    }
    else if (isInViewport(bg) && !isDownwardScrolling()) {
        document.getElementById("header").style.backgroundColor = "transparent";
        console.log("Scrolled up");
    }

});

function setTransparentColor() {
    if (!isDown) {
        const header = document.getElementById("header");
        let alpha = 1;
        const id = setInterval(step, 10);

        function step() {
            if (alpha === 0) {
                clearInterval(id);
            } else {
                alpha = (alpha - 0.1).toFixed(1);
                header.style.backgroundColor = "RGBA(0, 0, 0, " + alpha + ")";
            }
        }
    }
}

function isInViewport(el) {
    const position = el.getBoundingClientRect();
    if (position.top >= 0 && position.bottom  <= window.innerHeight) {
        return true;
    }

    if (position.top < window.innerHeight && position.bottom >= 0) {
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


