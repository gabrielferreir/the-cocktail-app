export default class Repository {

    async getRandomDrink() {
        return await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(response => response.json());
    }

    async getDrinkById(id) {
        return await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => response.json());
    }

    async searchDrinks(query) {
        return await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${query}`)
            .then(response => response.json());
    }

    async filterDrinks(query) {
        return await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${query}`)
            .then(response => response.json());
    }

    async getList(type) {
        return await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${type}=list`)
            .then(response => response.json());
    }


}