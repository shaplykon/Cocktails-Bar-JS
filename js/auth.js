document.addEventListener('DOMContentLoaded', ready());



function checkboxClicked(){
    const checkbox = document.getElementById("rules_agreement");
    const button = document.getElementById("sign_button");
    checkbox.addEventListener('change', function (event) {
        button.disabled = !checkbox.checked;
    });

}

