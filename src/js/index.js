import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import Search from './models/Search';
import Recipe from './models/Recipe';




/** Global state of the App *
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Linked recipes
 */

const state = {};


/**
 * SEARCH controller
 */

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput(); // TODO

  console.log(query);

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipes
      await state.search.getResult();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert(`Something went wrong with searching recipes...`)
      clearLoader();
    }


  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  // console.log(e);
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);


    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }

})


/**
 * RECIPE controller
 */

const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.slice(1, -1);
  console.log(id);

  if (id) {
    // Prepare UI for changes

    // Create Recipe obj
    state.recipe = new Recipe(id);

    try {
      // Get recipe data
      await state.recipe.getRecipe();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      console.log(state.recipe);
    } catch (error) {
      alert(`Something went wrong with processing recipe... => ${error}`);
    }
  }
};


/** INSTEAD OF two separate listeneres you can loop through array of multiple events */

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));






