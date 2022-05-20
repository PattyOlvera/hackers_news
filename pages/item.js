import Comment from '../components/Comment.js';
import Story from '../components/Story.js';
import view from '../utils/view.js';
import baseURL from '../utils/baseURL.js';

export default async function Item() {

    let story = null;
    let hasComments = false;
    let hasError = false;

    try {
        story = await getStory();
        hasComments = story.comments.length > 0;
    } catch(error){
        hasError = true;
        console.error(error);

    }

    if(hasError){
        view.innerHTML = `<div class="error">Error fetching comments</div>`;
    }
    
    view.innerHTML = `<div>
    ${Story(story)}

    <hr/>
    ${hasComments ? story.comments.map(comment => Comment(comment)).join('') : 'No comments'}
    </div>`
}

async function getStory(){
    const storyId = window.location.hash.split('?id=')[1];
    const response = await fetch(`${baseURL}/item/${storyId}`);
    const story = await response.json();
    return story;
}