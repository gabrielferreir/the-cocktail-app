export default class Repository {

    async getRandomDrink() {
        return await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(response => response.json());
    }

    async getDrinkById(id) {
        return await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => response.json());
    }

    async getDrinks(params) {

    }

}