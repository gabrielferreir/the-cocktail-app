export default class Repository {

    async getRandomDrink() {
        let response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        let responseJson = response.json();
        return responseJson;
    }

}