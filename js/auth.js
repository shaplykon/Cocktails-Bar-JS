const firebaseConfig = {
    apiKey: "AIzaSyBsXotNUfYiDTXl3dJS9VfrXVik33tdxAs",
    authDomain: "cocktails-bar.firebaseapp.com",
    projectId: "cocktails-bar",
    storageBucket: "cocktails-bar.appspot.com",
    messagingSenderId: "1021982495967",
    appId: "1:1021982495967:web:e64ccf37bed108b20ac56a",

};

firebase.initializeApp(firebaseConfig);


function loginFunction() {
    const email = document.getElementById("login");
    const pass = document.getElementById("password");

    const emailText = email.value;
    const passText = pass.value;
    const auth = firebase.auth();

    const response = auth.signInWithEmailAndPassword(emailText, passText);
    handleAuthentication(response);
}

function registerFunction() {
    const email = document.getElementById("login");
    const pass = document.getElementById("password");

    const emailText = email.value;
    const passText = pass.value;
    const auth = firebase.auth();

    const response = auth.createUserWithEmailAndPassword(emailText, passText);
    handleAuthentication(response);
}

function handleAuthentication(response) {
    response.then(firebaseUser => {
        if (firebaseUser) {
            window.history.pushState({}, "/", window.location.origin + "/");
        }
    })
    response.catch(e => {
        console.log(e.message);
        const errorField = document.getElementById("errorField");
        errorField.innerHTML = e.message;
    });
}

function checkboxClicked() {
    const checkbox = document.getElementById("rules_agreement");
    const button = document.getElementById("sign_button");
    checkbox.addEventListener('change', function () {
        button.disabled = !checkbox.checked;
    });
}




