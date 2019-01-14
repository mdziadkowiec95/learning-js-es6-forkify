import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    const key = '1cbfac3efeb70199ac43a1f60cf51b0c';

    try {
      const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = res.data.recipes;
    }

    catch (error) {
      alert(error);
    }

  }
}






// getRecipes('tomato pasta');
