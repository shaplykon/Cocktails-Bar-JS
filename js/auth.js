let auth;

function initializeAuthentication(){
    const   firebaseConfig = {
        apiKey: "AIzaSyBsXotNUfYiDTXl3dJS9VfrXVik33tdxAs",
        authDomain: "cocktails-bar.firebaseapp.com",
        databaseURL: "https://cocktails-bar-default-rtdb.firebaseio.com",
        projectId: "cocktails-bar",
        storageBucket: "cocktails-bar.appspot.com",
        messagingSenderId: "1021982495967",
        appId: "1:1021982495967:web:e64ccf37bed108b20ac56a"
    };
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
}

async function isAuthorized() {
    return auth.currentUser !== null;
}

function loginFunction() {
    const email = document.getElementById("login");
    const pass = document.getElementById("password");

    const emailText = email.value;
    const passText = pass.value;

    auth.signInWithEmailAndPassword(emailText, passText).then(function (firebaseUser) {
        if (firebaseUser) {
            window.history.pushState({}, "/", window.location.origin + "/");
        }
        showAuthenticatedControls();
        displayContent("/index");
    }).catch(function (e) {
        console.log(e.message);
        const errorField = document.getElementById("errorField");
        errorField.innerHTML = e.message;
    });

}

function registerFunction() {
    const email = document.getElementById("login");
    const pass = document.getElementById("password");

    const emailText = email.value;
    const passText = pass.value;
    const auth = firebase.auth();

     auth.createUserWithEmailAndPassword(emailText, passText).then(function (firebaseUser) {
        if (firebaseUser) {
            window.history.pushState({}, "/", window.location.origin + "/");
        }
        showAuthenticatedControls();
        displayContent("/index");
    }).catch(function (e) {
        console.log(e.message);
        const errorField = document.getElementById("errorField");
        errorField.innerHTML = e.message;
    });
}

function logoutFunction(){
    auth.signOut().then(function() {
        hideAuthenticatedControls();
        onNavigate("/index")
    });
}

function checkboxClicked() {
    const checkbox = document.getElementById("rules_agreement");
    const button = document.getElementById("sign_button");
    checkbox.addEventListener('change', function () {
        button.disabled = !checkbox.checked;
    });
}

function showAuthenticatedControls() {
    let userLabel = document.getElementById("user-welcome-label");
    userLabel.innerHTML = auth.currentUser.email;
    userLabel.style.display = 'inline';

    let imageDiv = document.getElementById("user-login-img");

    imageDiv.src = "http://www.gravatar.com/avatar/" + MD5(auth.currentUser.email) +
        "?d=https://www.freeiconspng.com/uploads/flat-face-icon-23.png";
    imageDiv.style.display = 'inline';
    document.getElementById("log-out-link").style.display = 'inline-block';
    document.getElementById("create-link").style.display = 'inline-block';
    document.getElementById("index-link").style.display = 'inline-block';
    document.getElementById("login-link").style.display = 'none';
    document.getElementById("sign-up-link").style.display = 'none';
}

function hideAuthenticatedControls() {
    document.getElementById("log-out-link").style.display = 'none';
    document.getElementById("user-welcome-label").style.display = 'none';
    document.getElementById("create-link").style.display = 'none';
    document.getElementById("user-login-img").style.display = 'none';
    document.getElementById("index-link").style.display = 'inline-block';
    document.getElementById("login-link").style.display = 'inline-block';
    document.getElementById("sign-up-link").style.display = 'inline-block';
}

initializeAuthentication();