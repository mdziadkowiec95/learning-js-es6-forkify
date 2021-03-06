import axios from 'axios';
import { proxy, key, key2 } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {

    try {
      const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key2}&rId=${this.id}`);

      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;

    } catch (error) {
      alert(`Something went wrong... => ${error}`);
    }
  }

  calcTime() {
    // avg. time to prepare meal (assuming that we need 15 for every 3 ingredients)
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g']

    const newIngredients = this.ingredients.map(el => {
      // 1- uniform units (all units the same)

      let ingredient = el.toLowerCase();

      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      })

      // 2 remove parentheses

      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');



      // 3 parse ingredients into count, unit and ingredient

      // find the position of the unit in ingredient string
      const arrIng = ingredient.split(' '); // convert to array
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2)); // loop through array

      let objIng;

      if (unitIndex > -1) {
        // There is a unit
        const arrCount = arrIng.slice(0, unitIndex); // Ex. 4 1/2 cups ===> arrCount is [4, 1/2]

        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));  // we used eval because of for ex. => "1-1/2" ... we replace '-' with '+' and eval it
        } else {
          // count = arrIng.slice(0, arrCount);
          count = eval(arrIng.slice(0, unitIndex).join('+')); // eval("4+1/2")   evals to 4.5
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')

        }

      } else if (parseInt(arrIng[0], 10)) {
        // There is NO unit, but the 1st element is a Number

        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }
      } else if (unitIndex === -1) {
        // There is NO unit and NO Number at 1st position
        objIng = {
          count: 1,
          unit: '',
          ingredient // the same as ---> ingredient: ingredient  (ES6)
        }
      }

      return objIng;

    });

    this.ingredients = newIngredients;
  }

  updateServings(type) {

    // update servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
    // update ingredients
    // const newCount = type === 'dec' ? this.ingredient.count - 1 : this.ingredient

    this.ingredients.forEach(ing => {
      ing.count *= (newServings / this.servings);  // ex. 4 * (3/4);
    });
    this.servings = newServings;
  }

}


// 4 x 3/4