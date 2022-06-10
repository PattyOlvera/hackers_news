import Story from '../components/Story.js';
import baseURL from '../utils/baseURL.js';
import view from '../utils/view.js';
import store from '../store.js'
import checkFavorite from '../utils/checkFavorite.js';

export default async function Stories(path) {
    const { favorites } = store.getState();
    console.log(favorites);
    
    const stories = await getStories(path);
    const hasStories = stories.length > 0;
    view.innerHTML = `<div>
        ${hasStories ? stories.map((story, i) => Story({...story, index: i + 1, isFavorite: checkFavorite(favorites, story)})).join('') : 'No stories'}
    </div>`;

    document.querySelectorAll('.favorite').forEach(favoriteButton => {
        favoriteButton.addEventListener('click', async function() {
            const story = JSON.parse(this.dataset.story);
            const isFavorited = checkFavorite(favorites, story);
            // if (isFavorited){
            //     store.dispatch({type: "REMOVE_FAVORITE", payload: { favorite: story }})
            // } else {
            //     store.dispatch({type: "ADD_FAVORITE", payload: { favorite: story }})
            // }

            // We can replace the above code with a ternary

            store.dispatch({ type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: { favorite: story }})


            await Stories(path);
        });
    });
}

async function getStories(path){
    const isHomeRoute = path === '/';
    const isNewRoute = path === '/new';
    const isAskRoute = path === '/ask';
    const isShowRoute = path === '/show';

    if(isHomeRoute){
        path = '/news';
    } else if (isNewRoute) {
        path = '/newest';
    } else if (isAskRoute) {
        path = '/ask';
    } else if (isShowRoute) {
        path = '/show';
    }

    const response = await fetch(`${baseURL}${path}`);
    const stories = await response.json();
    return stories;
}

// API link
// https://node-hnapi.herokuapp.com/

// API Documentation
// https://github.com/cheeaun/node-hnapi/wiki/API-Documentation

// These are the routes of the API

// OUR APP      =>     API
// /                    /news
// /new                 /newest
// /ask                 /ask 
// /show                /show