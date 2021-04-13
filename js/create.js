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
    let name = document.getElementById('coffee-name').value;
    let value = document.getElementById('coffee-value').value;
    let description = document.getElementById('description-textarea').value;
    let user = auth.currentUser.email;
    name = name.trim().toLowerCase();

    let isInputValid = await validateInput(name, value, description);
    if (!isInputValid) {
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

    let coffee = new Coffee(name.trim().toLowerCase(), user, value, description, ingredientsList);
    cocktailStorage.addCocktail(coffee);
    onNavigate('/');
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

    let coffees = await coffeeStorage.getCatalog();
    for (let id in coffees) {
        if (coffees[id].name === name) {
            alert ('Name already exists.');
            return false;
        }
    }
    return true;
}
