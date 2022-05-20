import RouterHandler from "./router.js";

window.onhashchange = () => {
    console.log("changed");
}


class App {
    constructor() {
        new RouterHandler();
    }
}

new App();