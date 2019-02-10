import Repository from './repository';

export default class Service {

    repository = new Repository();

    async getRandomDrink() {
        return await this.repository.getRandomDrink()
            .then(response => response.drinks[0])
            .then(drink => this.transformDrink(drink));
    }

    async getDrinkById(id) {
        return await this.repository.getDrinkById(id)
            .then(response => response.drinks[0])
            .then(drink => this.transformDrink(drink));
    }

    getIngredients(drink) {
        return Object.keys(drink)
            .filter(item => item.indexOf('strIngredient') > -1)
            .filter(item => drink[item])
            .map(item => drink[item]);
    }

    getMeasure(drink) {
        return Object.keys(drink)
            .filter(item => item.indexOf('strMeasure') > -1)
            .filter(item => drink[item])
            .map(item => drink[item]);
    }

    mergeIngredientsWithMesure(drink) {
        const ingredients = this.getIngredients(drink);
        const measure = this.getMeasure(drink);
        return ingredients.map((ingredient, index) => ({name: ingredient, measure: measure[index]}));
    }

    transformDrink(drink) {
        return {
            id: drink.idDrink,
            name: drink.strDrink,
            image: drink.strDrinkThumb,
            ingredients: this.mergeIngredientsWithMesure(drink),
            instructions: drink.strInstructions,
            alcoholic: drink.strAlcoholic === 'Alcoholic',
            category: drink.strCategory
        }
    }

    search() {

    }

}