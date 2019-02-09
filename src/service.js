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

    transformDrink(drink) {
        return {
            id: drink.idDrink,
            name: drink.strDrink,
            image: drink.strDrinkThumb,
            ingredients: this.getIngredients(drink),
            measures: this.getMeasure(drink),
            instructions: drink.strInstructions,
            alcoholic: drink.strAlcoholic === 'Alcoholic',
            category: drink.strCategory
        }
    }

}