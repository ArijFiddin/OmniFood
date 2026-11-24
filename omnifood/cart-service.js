(() => {
const CART_KEY = 'omnifood-cart';
const FAVORITES_KEY = 'omnifood-favorites';

const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const getCart = () => read(CART_KEY, []);
const addToCart = (recipe) => {
  const cart = getCart(); const existing = cart.find((item) => item.id === recipe.id);
  if (existing) existing.quantity += 1;
  else cart.push({ id: recipe.id, name: recipe.name, price: recipe.price, image: recipe.image, quantity: 1 });
  write(CART_KEY, cart); return cart;
};
const updateCartQuantity = (id, adjustment) => {
  const cart = getCart().map((item) => item.id === id ? { ...item, quantity: item.quantity + adjustment } : item).filter((item) => item.quantity > 0);
  write(CART_KEY, cart); return cart;
};
const removeFromCart = (id) => { const cart = getCart().filter((item) => item.id !== id); write(CART_KEY, cart); return cart; };
const getFavorites = () => read(FAVORITES_KEY, []);
const toggleFavorite = (id) => { const favorites = getFavorites(); const next = favorites.includes(id) ? favorites.filter((favorite) => favorite !== id) : [...favorites, id]; write(FAVORITES_KEY, next); return next; };

window.OmnifoodCartService = { getCart, addToCart, updateCartQuantity, removeFromCart, getFavorites, toggleFavorite };
})();
