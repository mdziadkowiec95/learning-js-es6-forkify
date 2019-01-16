import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

// function which is for limiting title lenth to max 17
const limitRecipeTitle = (title, limit = 17) => {
  if (title.length > limit) {
    const newTitle = [];

    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return formated title
    return `${newTitle.join(' ')} ...`;
  }
  return title;
}

// render every found recipe element
const renderRecipe = recipe => {
  const markup = `
      <li>
          <a class="results__link" href="#${recipe.recipe_id}">
              <figure class="results__fig">
                  <img src="${recipe.image_url}" alt="Test">
              </figure>
              <div class="results__data">
                  <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                  <p class="results__author">${recipe.publisher}</p>
              </div>
          </a>
      </li>
  `
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type) => `

    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    </button>
  `;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;

  if (page === 1 && pages > 1) {
    // button to go next page
    button = createButton(page, 'next');
  } else if (page < pages) {
    // btn both
    button = `
      ${createButton(page, 'next')}
      ${createButton(page, 'prev')}
    `;

  } else if (page === pages && pages > 1) {
    // btn prev
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

// set forEach for search results
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // console.log(recipes);
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;


  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, recipes.length, resPerPage);
} 