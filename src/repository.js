export default class Repository {

    async getRandomDrink() {
        return await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(response => response.json());
    }


}