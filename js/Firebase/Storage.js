class Storage {
    constructor() {
        this.database = firebase.database();
    }

    addCocktail(cocktail) {
        this.database.ref('coffees/').push({
            name: cocktail.name,
            description: cocktail.description,
            createDate: cocktail.createDate.toISOString().slice(0, 10),
            addedBy: cocktail.addedBy,
            value: cocktail.value,
            ingredients: cocktail.ingredients,
            image :cocktail.image
        })
    }

    async getCatalog() {
        return (await this.database.ref('coffees/').once('value')).val();
    }

    async getCocktail(id) {
        return (await this.database.ref('coffees/' + id).once('value')).val();
    }

    addMark(cocktailId, userId, mark) {
        this.database.ref(`coffees/${cocktailId}/marks/${userId}`).set(+mark);
    }

    addComment(cocktailId, comment) {
        this.database.ref(`coffees/${cocktailId}/comments/`).push({
                author: comment.author,
                text: comment.text,
                date: comment.date.toISOString().slice(0, 10)
            }
        );
    }

    async deleteComment(cocktailId, commentId){
        this.database.ref(`coffees/${cocktailId}/comments/${commentId}`).remove();
    }
}



let cocktailStorage = new Storage();