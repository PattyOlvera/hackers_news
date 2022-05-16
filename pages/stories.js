import view from '../utils/view.js';

export default async function Stories(path) {
    const stories = await getStories(path);
    console.log(stories);
    const hasStories = stories.length > 0;
    view.innerHTML = `<div>
        ${hasStories ? stories.map(story => JSON.stringify(story)) : 'No stories'}
    </div>`;
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

async function getStories(path){
    const isHomeRoute = path === '/';
    const isNewRoute = path === '/new';
    const isAskRoute = path === ' /ask';
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

    const response = await fetch(`https://node-hnapi.herokuapp.com${path}`);
    const stories = await response.json();
    return stories;
}