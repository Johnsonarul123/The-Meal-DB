// make a search bar 
// fetch the api 
//display api dta in component 


import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async () => {
    setIsLoading(true);
    const url = searchApi + query;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setRecipes(data.meals); // Assuming the property name is "meals" instead of "meal"
      } else {
        console.error('Error:', res.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  return (
    <div className="App">
      <h1>MealDb App</h1>
      <SearchBar
        isLoading={isLoading}
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />
      <div className="recipes">
        {recipes ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>No Results.</p>
        )}
      </div>
    </div>
  );
}

export default App;