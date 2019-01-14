import Search from './models/Search';

/** Global state of the App *
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Linked recipes
 */

const state = {};

const controlSearch = async () => {
  // 1) Get query from view
  const query = 'tomato pasta'; // TODO

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results

    // 4) Search for recipes
    await state.search.getResult();

    // 5) Render results on UI
    console.log(state.search.result);
  }



}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
})

