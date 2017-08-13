export default class Component {

    static getRootClass() {
        return '.component';
    }

    constructor(root) {
        this.root = root;
        this.handlers = {};
        this.level = "easy";
    }

    on(event, handler) {
        this.handlers[event] = handler;
    }    

    fire(event, ...args) {
        this.handlers[event](this, ...args);
    }

    setLevel(level) {
        this.level = level;
    }

    infoTimeout() {

    }

    blink() {
        this.root.style.opacity = 0.85;
        setTimeout(function(thisObj) {
            thisObj.root.style.opacity = 1;
        }, 100, this);
    }
    

}