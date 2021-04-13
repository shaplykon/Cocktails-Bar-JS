function leaveComment(){

}

async function populateDetail(id){

    let cocktail = await cocktailStorage.getCocktail(id);

    let name = cocktail.name;
    let description = cocktail.description;

    let descriptionDiv = document.getElementById("description");
    let nameDiv = document.getElementById("name-label");
    let valueDiv = document.getElementById("value-label");

    descriptionDiv.innerHTML = description;
    nameDiv.innerHTML = name;
    valueDiv.innerHTML = "Value: " + cocktail.value + " ml";
}
