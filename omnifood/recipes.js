(() => {
const { getRecipes, filterAndSortRecipes } = window.OmnifoodRecipesService;
const { addToCart, getCart, getFavorites, removeFromCart, toggleFavorite, updateCartQuantity } = window.OmnifoodCartService;

const PER_PAGE = 8;
const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
const formatPrice = (value) => currency.format(value).replace('Rp', 'Rp').replace(/\s/g, '');

const state = {
  recipes: [], page: 1,
  filters: { search: '', categories: ['All'], minPrice: 20000, maxPrice: 100000, calories: [], diets: [], sort: 'popular' }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const elements = {
  grid: $('[data-recipe-grid]'), empty: $('[data-empty-state]'), count: $('[data-recipe-count]'), pagination: $('[data-pagination]'),
  search: $('[data-search]'), sort: $('[data-sort]'), minRange: $('[data-price="min"]'), maxRange: $('[data-price="max"]'),
  minPrice: $('[data-min-price]'), maxPrice: $('[data-max-price]'), rangeFill: $('.range-track span'), filterPanel: $('.filter-panel'),
  cartDrawer: $('[data-cart-drawer]'), backdrop: $('[data-drawer-backdrop]'), cartItems: $('[data-cart-items]'), cartEmpty: $('[data-cart-empty]'), cartSummary: $('[data-cart-summary]'), cartTotal: $('[data-cart-total]'), toast: $('[data-toast]')
};

function selectedRecipes() { return filterAndSortRecipes(state.recipes, state.filters); }
function pageCount(recipes) { return Math.max(1, Math.ceil(recipes.length / PER_PAGE)); }

function renderCard(recipe, favorites) {
  const badge = recipe.badge ? `<span class="recipe-badge ${recipe.badge === 'New' ? 'recipe-badge--new' : ''}"><ion-icon name="${recipe.badge === 'New' ? 'star' : recipe.badge === 'Best Seller' ? 'ribbon' : 'flame'}"></ion-icon>${recipe.badge}</span>` : '';
  const isFavorite = favorites.includes(recipe.id);
  return `<article class="recipe-card">
    <div class="recipe-image-wrap"><img src="${recipe.image}" alt="${recipe.name}" />${badge}
      <button class="favorite-button ${isFavorite ? 'is-favorite' : ''}" type="button" data-favorite="${recipe.id}" aria-label="${isFavorite ? 'Remove' : 'Add'} ${recipe.name} ${isFavorite ? 'from' : 'to'} favorites"><ion-icon name="${isFavorite ? 'heart' : 'heart-outline'}"></ion-icon></button>
    </div>
    <div class="recipe-card__body"><h2>${recipe.name}</h2><p class="recipe-description">${recipe.description}</p>
      <div class="recipe-meta"><span><ion-icon name="flame-outline"></ion-icon>${recipe.calories} kcal</span><span><ion-icon name="leaf-outline"></ion-icon>${recipe.dietType[0]}</span></div>
      <div class="recipe-footer"><strong>${formatPrice(recipe.price)}</strong><button type="button" data-add-cart="${recipe.id}"><ion-icon name="cart-outline"></ion-icon>Add to Cart</button></div>
    </div>
  </article>`;
}

function renderRecipes() {
  const recipes = selectedRecipes();
  const totalPages = pageCount(recipes);
  if (state.page > totalPages) state.page = totalPages;
  const from = (state.page - 1) * PER_PAGE;
  const recipesForPage = recipes.slice(from, from + PER_PAGE);
  elements.count.textContent = `${recipes.length} Recipe${recipes.length === 1 ? '' : 's'} Found`;
  elements.grid.innerHTML = recipesForPage.map((recipe) => renderCard(recipe, getFavorites())).join('');
  elements.grid.hidden = recipes.length === 0;
  elements.empty.hidden = recipes.length !== 0;
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  if (totalPages <= 1) { elements.pagination.innerHTML = ''; return; }
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  elements.pagination.innerHTML = `<button type="button" data-page="prev" aria-label="Previous page" ${state.page === 1 ? 'disabled' : ''}><ion-icon name="chevron-back-outline"></ion-icon></button>${pages.map((page) => `<button type="button" data-page="${page}" class="${page === state.page ? 'is-current' : ''}" aria-label="Page ${page}" aria-current="${page === state.page ? 'page' : 'false'}">${page}</button>`).join('')}<button type="button" data-page="next" aria-label="Next page" ${state.page === totalPages ? 'disabled' : ''}><ion-icon name="chevron-forward-outline"></ion-icon></button>`;
}

function updateRangeUI() {
  const min = Number(elements.minRange.min); const max = Number(elements.minRange.max);
  const minValue = Number(elements.minRange.value); const maxValue = Number(elements.maxRange.value);
  const start = ((minValue - min) / (max - min)) * 100; const end = 100 - ((maxValue - min) / (max - min)) * 100;
  elements.rangeFill.style.left = `${start}%`; elements.rangeFill.style.right = `${end}%`;
  elements.minPrice.textContent = formatPrice(minValue); elements.maxPrice.textContent = formatPrice(maxValue);
}

function syncFilterInputs() {
  $$('input[name="category"]').forEach((input) => { input.checked = state.filters.categories.includes(input.value); });
  $$('input[name="calories"]').forEach((input) => { input.checked = state.filters.calories.includes(input.value); });
  $$('input[name="diet"]').forEach((input) => { input.checked = state.filters.diets.includes(input.value); });
  elements.search.value = state.filters.search; elements.sort.value = state.filters.sort;
  elements.minRange.value = state.filters.minPrice; elements.maxRange.value = state.filters.maxPrice;
  updateRangeUI();
}

function updateFilterCounts() {
  const countCategory = (category) => category === 'All' ? state.recipes.length : state.recipes.filter((recipe) => recipe.category === category).length;
  $$('[data-category-count]').forEach((element) => { element.textContent = `(${countCategory(element.dataset.categoryCount)})`; });
  const calories = { 'under-300': (recipe) => recipe.calories < 300, '300-500': (recipe) => recipe.calories >= 300 && recipe.calories <= 500, 'above-500': (recipe) => recipe.calories > 500 };
  $$('input[name="calories"]').forEach((input) => { input.closest('label').querySelector('b').textContent = `(${state.recipes.filter(calories[input.value]).length})`; });
  $$('input[name="diet"]').forEach((input) => { input.closest('label').querySelector('b').textContent = `(${state.recipes.filter((recipe) => recipe.dietType.includes(input.value)).length})`; });
}

function showToast(message) { elements.toast.textContent = message; elements.toast.classList.add('is-visible'); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => elements.toast.classList.remove('is-visible'), 2600); }

function renderCart() {
  const cart = getCart(); const count = cart.reduce((sum, item) => sum + item.quantity, 0); const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  $$('[data-cart-count]').forEach((badge) => { badge.textContent = count; badge.hidden = count === 0; });
  elements.cartItems.innerHTML = cart.map((item) => `<article class="cart-item"><img src="${item.image}" alt="${item.name}" /><div><h3>${item.name}</h3><p>${formatPrice(item.price)}</p><div class="quantity-control"><button type="button" data-cart-change="${item.id}" data-change="-1" aria-label="Decrease ${item.name}">−</button><span>${item.quantity}</span><button type="button" data-cart-change="${item.id}" data-change="1" aria-label="Increase ${item.name}">+</button></div></div><button class="remove-item" type="button" data-cart-remove="${item.id}" aria-label="Remove ${item.name}"><ion-icon name="trash-outline"></ion-icon></button></article>`).join('');
  elements.cartEmpty.hidden = cart.length > 0; elements.cartSummary.hidden = cart.length === 0; elements.cartTotal.textContent = formatPrice(total);
}

function toggleCart(open) {
  elements.cartDrawer.classList.toggle('is-open', open); elements.backdrop.classList.toggle('is-visible', open); elements.cartDrawer.setAttribute('aria-hidden', String(!open)); document.body.classList.toggle('drawer-open', open);
}

function resetFilters() {
  state.filters = { search: '', categories: ['All'], minPrice: 20000, maxPrice: 100000, calories: [], diets: [], sort: 'popular' }; state.page = 1; syncFilterInputs(); renderRecipes();
}

function bindEvents() {
  let debounce;
  elements.search.addEventListener('input', () => { window.clearTimeout(debounce); debounce = window.setTimeout(() => { state.filters.search = elements.search.value; state.page = 1; renderRecipes(); }, 150); });
  elements.sort.addEventListener('change', () => { state.filters.sort = elements.sort.value; state.page = 1; renderRecipes(); });
  $$('input[name="category"]').forEach((input) => input.addEventListener('change', () => {
    if (input.value === 'All') state.filters.categories = ['All'];
    else { state.filters.categories = $$('input[name="category"]:checked').map((item) => item.value).filter((value) => value !== 'All'); if (!state.filters.categories.length) state.filters.categories = ['All']; }
    state.page = 1; syncFilterInputs(); renderRecipes();
  }));
  $$('input[name="calories"]').forEach((input) => input.addEventListener('change', () => { state.filters.calories = $$('input[name="calories"]:checked').map((item) => item.value); state.page = 1; renderRecipes(); }));
  $$('input[name="diet"]').forEach((input) => input.addEventListener('change', () => { state.filters.diets = $$('input[name="diet"]:checked').map((item) => item.value); state.page = 1; renderRecipes(); }));
  [elements.minRange, elements.maxRange].forEach((input) => input.addEventListener('input', () => { let min = Number(elements.minRange.value); let max = Number(elements.maxRange.value); if (max - min < 5000) { if (input === elements.minRange) min = max - 5000; else max = min + 5000; } state.filters.minPrice = min; state.filters.maxPrice = max; elements.minRange.value = min; elements.maxRange.value = max; state.page = 1; updateRangeUI(); renderRecipes(); }));
  document.addEventListener('click', (event) => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'reset-filters') resetFilters();
    if (action === 'focus-search') { elements.search.focus(); elements.search.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    if (action === 'open-cart') toggleCart(true); if (action === 'close-cart') toggleCart(false);
    if (action === 'toggle-filters') { const open = elements.filterPanel.classList.toggle('is-expanded'); event.target.closest('[data-action]').setAttribute('aria-expanded', String(open)); }
    if (action === 'profile-menu') { const menu = $('.profile-menu'); const open = menu.hidden; menu.hidden = !open; event.target.closest('[data-action]').setAttribute('aria-expanded', String(open)); }
    if (action === 'toggle-menu') { const header = $('.recipes-header'); const open = header.classList.toggle('menu-open'); event.target.closest('[data-action]').setAttribute('aria-expanded', String(open)); }
    if (action === 'checkout') showToast('Checkout will be available when payments are connected.');
    const favorite = event.target.closest('[data-favorite]'); if (favorite) { toggleFavorite(Number(favorite.dataset.favorite)); renderRecipes(); }
    const add = event.target.closest('[data-add-cart]'); if (add) { const recipe = state.recipes.find((item) => item.id === Number(add.dataset.addCart)); addToCart(recipe); renderCart(); showToast(`${recipe.name} added to your cart`); }
    const page = event.target.closest('[data-page]')?.dataset.page; if (page) { const pages = pageCount(selectedRecipes()); state.page = page === 'next' ? Math.min(state.page + 1, pages) : page === 'prev' ? Math.max(state.page - 1, 1) : Number(page); renderRecipes(); $('.catalog-area').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    const change = event.target.closest('[data-cart-change]'); if (change) { updateCartQuantity(Number(change.dataset.cartChange), Number(change.dataset.change)); renderCart(); }
    const remove = event.target.closest('[data-cart-remove]'); if (remove) { removeFromCart(Number(remove.dataset.cartRemove)); renderCart(); showToast('Item removed from cart'); }
  });
  elements.backdrop.addEventListener('click', () => toggleCart(false));
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    toggleCart(false);
    const menu = $('.profile-menu');
    if (!menu.hidden) { menu.hidden = true; $('[data-action="profile-menu"]').setAttribute('aria-expanded', 'false'); }
  });
}

async function init() { state.recipes = await getRecipes(); updateFilterCounts(); syncFilterInputs(); renderRecipes(); renderCart(); bindEvents(); }
init();
})();
