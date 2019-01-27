import axios from 'axios';
import { proxy, key, key2 } from '../config'

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {

    try {
      const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key2}&q=${this.query}`);
      this.result = res.data.recipes;
    }

    catch (error) {
      alert(error);
    }

  }
}






// getRecipes('tomato pasta');
