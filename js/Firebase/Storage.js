class Storage {
    constructor() {
        this.database = firebase.database();
    }

    addCoffee(coffee) {
        this.database.ref('coffees/').push({
            name: coffee.name,
            description: coffee.description,
            createDate: coffee.createDate.toISOString().slice(0, 10),
            addedBy: coffee.addedBy,
            value: coffee.value,
            ingredients: coffee.ingredients,
        })
    }

    async getCatalog() {
        return (await this.database.ref('coffees/').once('value')).val();
    }

    async getCoffee(id) {
        return (await this.database.ref('coffees/' + id).once('value')).val();
    }

    addMark(coffeeId, userId, mark) {
        this.database.ref(`coffees/${coffeeId}/marks/${userId}`).set(+mark);
    }

    addComment(coffeeId, comment) {
        this.database.ref(`coffees/${coffeeId}/comments/`).push({
                author: comment.author,
                text: comment.text,
                date: comment.date.toISOString().slice(0, 10)
            }
        );
    }
}

let coffeeStorage = new Storage();