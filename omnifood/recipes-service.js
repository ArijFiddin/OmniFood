(() => {
// API boundary: replace this function with fetch('/api/recipes') when Laravel is ready.
const getRecipes = async () => window.OmnifoodRecipes.map((recipe) => ({ ...recipe }));

function filterAndSortRecipes(allRecipes, filters) {
  const search = filters.search.trim().toLowerCase();
  const selectedCategories = filters.categories.filter((category) => category !== 'All');
  const result = allRecipes.filter((recipe) => {
    const matchesSearch = !search || `${recipe.name} ${recipe.description}`.toLowerCase().includes(search);
    const matchesCategory = !selectedCategories.length || selectedCategories.includes(recipe.category);
    const matchesPrice = recipe.price >= filters.minPrice && recipe.price <= filters.maxPrice;
    const matchesCalories = !filters.calories.length || filters.calories.some((band) => (
      (band === 'under-300' && recipe.calories < 300) ||
      (band === '300-500' && recipe.calories >= 300 && recipe.calories <= 500) ||
      (band === 'above-500' && recipe.calories > 500)
    ));
    const matchesDiet = !filters.diets.length || filters.diets.some((diet) => recipe.dietType.includes(diet));
    return matchesSearch && matchesCategory && matchesPrice && matchesCalories && matchesDiet;
  });
  return result.sort((a, b) => {
    if (filters.sort === 'newest') return b.createdAt - a.createdAt;
    if (filters.sort === 'price-asc') return a.price - b.price;
    if (filters.sort === 'price-desc') return b.price - a.price;
    if (filters.sort === 'calories-asc') return a.calories - b.calories;
    return b.popular - a.popular;
  });
}

window.OmnifoodRecipesService = { getRecipes, filterAndSortRecipes };
})();
