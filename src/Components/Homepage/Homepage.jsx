import React, { useContext } from 'react'
import './Homepage.css';
import { useState, useEffect, useReducer } from 'react';
import Search from '../search/Search'
import Recipecards from '../recipescard/Recipecards';
import FavoriteItems from '../favoritesitem/FavoriteItems';
import { themeContext } from '../../App';

const Homepage = () => {

  const reducer = (state, action) => {
    switch (action.type) {
      case 'filterFavorites':
        console.log(action, 'action');

        return {
          ...state,
          filteredValue: action.value,
        }

      default:
        return state
    }
  }

  const initialState = {
    filteredValue: ''
  }

  // loading state
  const [loadingState, setloadingState] = useState(false)


  // save results received from api

  const [recipes, setrecipes] = useState([])

  // fav data state
  const [favorites, setfavorites] = useState([])

  // clear the search box
  const [apiCalledSucces, setapiCalledSucces] = useState(false)

  // use reducer functionality
  const [filteredState, dispatch] = useReducer(reducer, initialState)

  const { theme } = useContext(themeContext);


  const getDataFromSearch = (dataonSubmit) => {

    // keep the loading state as true before we are calling the api
    setloadingState(true);

    // console.log(dataonSubmit, 'getdata');

    // calling the api
    async function getRecipes() {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=c013a02917cf40ef83885721ed92964c&query=${dataonSubmit}`);
      const responseResult = await response.json();
      // console.log(responseResult, 'response');

      // destructuring result from repsonseResult
      const { results } = responseResult;
      // console.log(results)
      if (results && results.length > 0)
        // set loading to false
        setloadingState(false)
      // set the recipes state

      setrecipes(results)
      setapiCalledSucces(true)
    }

    getRecipes();
  }

  // console.log(loadingState, recipes, 'loading state', 'recipes')

  // add to fav
  const addtoFav = (getCurrentRecipeItem) => {
    // console.log(getCurrentRecipeItem);
    // copy fav items
    let copyFav = [...favorites];
    const index = copyFav.findIndex(item => item.id === getCurrentRecipeItem.id);
    // console.log(index)
    if (index === -1) {
      copyFav.push(getCurrentRecipeItem);
      setfavorites(copyFav);
      alert("Item is added to Favorites");
      // save the fav items in local storage
      localStorage.setItem('Favorites', JSON.stringify(copyFav))
    }
    else {
      alert("Item is already added in Favorites ")
    }
  };

  // console.log(favorites, 'favItems');

  // removing from fav items
  const removeFromFav = (getCurrentID) => {
    let copyFav = [...favorites];
    copyFav = copyFav.filter(item => item.id !== getCurrentID);
    setfavorites(copyFav);
    localStorage.setItem('Favorites', JSON.stringify(copyFav));

  }

  useEffect(() => {
    console.log('run once')
    const extractFavfromLocalStorage = JSON.parse(localStorage.getItem('Favorites'));
    // console.log(extractFavfromLocalStorage)
    setfavorites(extractFavfromLocalStorage);

  }, []);

  // console.log(favorites, 'favorites');
  console.log(filteredState, 'filterstate')
  // filter favitems
  const filterFavItems = favorites.filter(item => item.title.toLowerCase().includes(filteredState.filteredValue))

  return (
    <div className='homepage'>
      <div className="row home_section p-5 ">
        <div className="col-8 title ">
          <h1 className= 'main_heading p-5' style={theme ? { color: '#fa6400' } : {}}>Welcome to Our Page</h1>

          <Search getData={getDataFromSearch} dummydata={'hello'} apiCalledSucces={apiCalledSucces}
            setapiCalledSucces={setapiCalledSucces} />
        </div>
      </div>

      {/* show fav items */}
      <div className="favoriteItems p-4">
        <h1 className='favoritesItems_title  d-flex justify-content-center p-4' style={theme ? { color: '#fa6400' } : {}} >Favorites</h1>

        <div className='search_fav search '>
          <input type="search p-3" placeholder='Search Favorite Item ' onChange={(event) => dispatch({ type: 'filterFavorites', value: event.target.value })} value={filteredState.filteredValue} />
        </div>

        <div className="row favorites gap-3 p-5 d-flex justify-content-center">
          {filterFavItems && filterFavItems.length > 0 ? filterFavItems.map(item => <FavoriteItems
            removeFromFav={() => {
              removeFromFav(item.id)
            }}
            id={item.id}
            title={item.title}
            image={item.image} style={theme ? { backgroundColor: '#fa6400' } : {}} />) : null}
        </div>




      </div>
      {/* loading state */}
      {loadingState && <div className='loading'>Loading!!!
        Please wait
      </div>}
      {/* loading state */}

      {/* map through all the recipes */}
      <div className="row items d-flex justify-content-center gap-2">
        {/* console.log('recipes items'); */}
        {/* <Recipecards/> */}
        {recipes && recipes.length > 0 ? recipes.map((item) => <Recipecards id={item.id} title={item.title} image={item.image} add_fav={() => addtoFav(item)} />) : null}
      </div>
      {/* map through all the recipes */}



    </div>
  )
}

export default Homepage
