import { elements } from './views/base';
import Search from './models/Search';
import * as searchView from './views/searchView';


/** Global state of the App *
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Linked recipes
 */

const state = {};

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
    // 4) Search for recipes
    await state.search.getResult();

    // 5) Render results on UI
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  // console.log(e);
  controlSearch();
})

