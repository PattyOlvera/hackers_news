import Navigo from 'navigo';
import Stories from './pages/stories.js'

const router = new Navigo(null, true, '#');
console.log(router);

export default class RouterHandler {
    constructor() {
        this.createRoutes()
    }
    
    createRoutes(){
        const routes = [
            {path: '/', page: Stories}
        ];

        routes.forEach(route => {
            router.on(route.path, () => {
                console.log(route.page());
            });
        router.resolve();
        })
    }
}