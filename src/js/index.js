import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';





/** Global state of the App *
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Linked recipes
 */

const state = {};

window.state = state;


/**
 * SEARCH controller
 */

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();


  // console.log(query);

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
      alert(`Something went wrong with searching recipes...`);
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
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipeList)

    // Highlight selected recipe on list
    if (state.recipe) {
      searchView.highlightSelected(id);
    }

    // Create Recipe obj
    state.recipe = new Recipe(id);
    window.r = state.recipe; // for TESTING

    try {
      // Get recipe data
      await state.recipe.getRecipe();
      console.log(state.recipe);

      // Calculate servings and time
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
      // console.log(state.recipe);

    } catch (error) {
      alert(`Something went wrong with processing recipe... => ${error}`);
    }
  }
};


/** INSTEAD OF two separate listeneres you can loop through array of multiple events */

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));



/**
 * LIST controller
 */

const controlList = () => {

  if (!state.list) state.list = new List();
  // Add an ingredient to the List and UI
  state.recipe.ingredients.forEach(ing => {
    const item = state.list.addItem(ing.count, ing.unit, ing.ingredient);
    listView.renderItem(item);
  });
  console.log(state.list);

};

// Handle delete and update list item events

elements.shoppingList.addEventListener('click', (e) => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // Handle the delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value);
    state.list.updateCount(id, val);

  }


});


elements.recipeList.addEventListener('click', (e) => {
  console.log(e.target);


  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
      console.log('dec');
    }

  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
    console.log('inc');

  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  }

  console.log(state.recipe);


});







// document.querySelector('.recipe-btn').addEventListener('click', (e) => {



// });

// window.l = new List();








