class Coffee {
    constructor(name, addedBy, value, description, ingredients) {
        this.description = description;
        this.name = name;
        this.addedBy = addedBy;
        this.value = value;
        this.ingredients = ingredients;
        this.createDate = new Date();
        this.marks = [];
        this.comments = [];
    }
}