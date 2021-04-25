function addIngredient() {
    let ingredientListItem = ingredientInput;

    const maxIngredientsCount = 5;
    let items = document.getElementsByClassName('ingredient-select-list-item');

    if (items.length === maxIngredientsCount - 1) {
        let addButton = document.getElementById('add-ingredient-button');
        addButton.style.display = 'none';
    }

    if (items.length < maxIngredientsCount) {
        let ingredientsList = document.querySelector('.ingredients-select-list');
        let ingredientItem = document.createElement('li');
        ingredientItem.classList.add('ingredient-select-list-item');
        ingredientItem.innerHTML = ingredientListItem;
        ingredientsList.appendChild(ingredientItem);
    }
}

function removeIngredient() {
    let items = document.getElementsByClassName('ingredient-select-list-item');

    const maxIngredientsCount = 5;
    if (items.length === maxIngredientsCount) {
        let addButton = document.getElementById('add-ingredient-button');
        addButton.style.display = 'block';
    }
    let item = event.srcElement.closest(".ingredient-select-list-item");
    item.parentNode.removeChild(item);
}


async function submitForm() {
    let submitBuftton = document.getElementById("create-button");
    submitBuftton.disabled = true;
    let name = document.getElementById('coffee-name').value;
    let value = document.getElementById('coffee-value').value;
    let description = document.getElementById('description-textarea').value;
    let user = auth.currentUser.email;
    name = name.trim().toLowerCase();

    let isInputValid = await validateInput(name, value, description);
    if (!isInputValid) {
        submitBuftton.disabled = false;
        return;
    }

    let ingredientsList = [];
    let ingredientsSelects = document.getElementsByClassName('ingredients-select');
    let ingredientsValues = document.getElementsByClassName('ingredient-value-input');

    let sumOfValues = 0;
    for (let value of ingredientsValues) {
        sumOfValues += +value.value;
    }

    if (sumOfValues < 95 || sumOfValues > 100) {
        alert('Sum of ingredients should be сlose to 100');
        return;
    }

    for (let i = ingredientsSelects.length - 1; i >= 0; i--) {
        let name = ingredientsSelects[i].options[ingredientsSelects[i].selectedIndex].value;
        let value = +ingredientsValues[i].value;
        ingredientsList.push(new Ingredient(name, value));
    }

    let coffee = new Cocktail(name.trim().toLowerCase(), user, value, description, ingredientsList);

    let file = document.getElementById('uploaded-file1').files[0];

    if(file !== undefined){
        let storageRef = firebase.storage().ref();
        let uploadTask = storageRef.child('images/'+ name + "_" + user).put(file);
        uploadTask.on('state_changed',
           () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    coffee.image = downloadURL;
                    cocktailStorage.addCocktail(coffee);

                    updateCatalog().then(() => {
                        displayContent('/index')
                    });
                });
            }
        );
    }
    else{
        coffee.image = "https://psv4.userapi.com/c520036/u138605199/docs/d4/1c0504863463/tequila-sunrise.png?extra=v6c02JM9cLKomZ5UZpAd1nPEUr15_0S9Zp0CQ9geVQZqne_AOCLJIaOweFUlCD2KQHvtFQjacXyjTlJs6xweO2PJLoR4hEiJW5eQsfGGQnXK67DfSTRfwhyc9rnjS3jQZ9OjR5Ql8jK36n3m-dWL1hwq";
        cocktailStorage.addCocktail(coffee);
        updateCatalog().then(() => {
            displayContent('/index')
        });
    }
}


async function validateInput(name, value, description) {
    if (name === "" || value === "" || description === "") {
        return false;
    }

    if (value < 10 || value > 1000) {
        alert('Standard value should be between 10 and 1000 ml.');
        return false;
    }

    if (name.length < 3) {
        alert('Name length should be at least 3 symbols.');
        return false;
    }

    let coffees = await cocktailStorage.getCatalog();
    for (let id in coffees) {
        if (coffees[id].name === name) {
            alert ('Name already exists.');
            return false;
        }
    }
    return true;
}

function getFileParam() {
    let file;
    try {
        file = document.getElementById('uploaded-file1').files[0];

        if (file) {
            let fileSize;

            if (file.size > 1024 * 1024) {
                fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
            }else {
                fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
            }

            document.getElementById('file-size1').innerHTML = 'Size: ' + fileSize;

            if (/\.(jpe?g|bmp|gif|png)$/i.test(file.name)) {
                const elPreview = document.getElementById('preview1');
                elPreview.innerHTML = '';
                const newImg = document.createElement('img');
                newImg.className = "preview-img";

                if (typeof file.getAsDataURL=='function') {
                    if (file.getAsDataURL().substr(0,11)==='data:image/') {
                        newImg.onload=function() {
                            document.getElementById('file-name1').innerHTML+=' ('+newImg.naturalWidth+'x'+newImg.naturalHeight+' px)';
                        }
                        newImg.setAttribute('src',file.getAsDataURL());
                        elPreview.appendChild(newImg);
                    }
                }else {
                    const reader = new FileReader();
                    reader.onloadend = function(evt) {
                        if (evt.target.readyState == FileReader.DONE) {
                            newImg.setAttribute('src', evt.target.result);
                            elPreview.appendChild(newImg);
                        }
                    };

                    let blob;
                    if (file.slice) {
                        blob = file.slice(0, file.size);
                    }else if (file.webkitSlice) {
                        blob = file.webkitSlice(0, file.size);
                    }else if (file.mozSlice) {
                        blob = file.mozSlice(0, file.size);
                    }
                    reader.readAsDataURL(blob);
                }
            }
        }
    }catch(e) {
        file = document.getElementById('uploaded-file1').value;
        file = file.replace(/\\/g, "/").split('/').pop();
        document.getElementById('file-name1').innerHTML = '���: ' + file;
    }
}
