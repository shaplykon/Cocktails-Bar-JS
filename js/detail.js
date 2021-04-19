function leaveComment(){
    let commentText = document.getElementById("comment").value;
    let author = auth.currentUser.email;
    let comment = new Comments(author, commentText, new Date());
    let coffeeId = getParams('id');
    cocktailStorage.addComment(coffeeId, comment);
}

async function populateDetail(id){

    let cocktail = await cocktailStorage.getCocktail(id);

    let name = cocktail.name;
    let description = cocktail.description;

    let descriptionDiv = document.getElementById("description");
    let nameDiv = document.getElementById("name-label");
    let valueDiv = document.getElementById("value-label");
    let ingredientsDiv = document.getElementById("ingredients-section");
    let infoDiv = document.getElementById("info-section");

    descriptionDiv.innerHTML = description;
    nameDiv.innerHTML = name;
    valueDiv.innerHTML = "Value: " + cocktail.value + " ml";
    for(let i = 0; i < cocktail.ingredients.length; i++){
        let ingredient = document.createElement("p");
        ingredient.innerHTML = cocktail.ingredients[i].name + " : " + cocktail.ingredients[i].value + "ml";
        ingredientsDiv.appendChild(ingredient);
    }

    let author = document.createElement("p");
    author.innerHTML = "Author : " + cocktail.addedBy;
    infoDiv.appendChild(author);

    let date = document.createElement("p");
    date.innerHTML = "Date : " + cocktail.createDate;
    infoDiv.appendChild(date);

}
