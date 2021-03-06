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

    async search(string) {
        const query = `s=${string}`;
        return await this.repository.searchDrinks(query)
            .then(response => (response.drinks || [])
                .map(response => this.transformDrink(response))
            );
    }

    async filter(string, type) {
        let query = `${type}=${string}`;
        return await this.repository.filterDrinks(query)
            .then(response =>
                (response.drinks || [])
                    .map(response => this.transformDrink(response))
            );
    }

    async getGlasses() {
        return await this.repository.getList('g')
            .then(response => (response.drinks || [])
                .map(glass => ({name: glass.strGlass}))
            );
    }

    async getAlcoholic() {
        return await this.repository.getList('a')
            .then(response => (response.drinks || [])
                .filter(alcoholic => alcoholic.strAlcoholic)
                .map(alcoholic => ({name: alcoholic.strAlcoholic}))
            );
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

}