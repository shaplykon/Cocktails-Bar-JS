class Cocktail {
    constructor(name, addedBy, value, description, ingredients, image) {
        this.description = description;
        this.name = name;
        this.addedBy = addedBy;
        this.value = value;
        this.ingredients = ingredients;
        this.image = image;
        this.createDate = new Date();
        this.marks = [];
        this.comments = [];

    }
}