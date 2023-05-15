// make a search bar 
// fetch the api 
//display api dta in component 


import './App.css';
import React,{useEffect, useState} from 'react';
import SearchBar from './components/SearchBar';
const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
   
  // search for the recipe
    const searchRecipes = async () =>{
      setIsLoading(true);
      const url = searchApi + query
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setRecipes(data.meal);
      setIsLoading(false);
    }

    useEffect(()=>{
      searchRecipes();
    },[]);

    const handleSubmit = (event) => {
      event.preventDefault();
      searchRecipes();
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1> MealDb App</h1>
        <SearchBar
          isLoading={isLoading}
          query={query}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
        />

      </header>
    </div>
  );
}

export default App;
