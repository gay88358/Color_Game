import Component from './component.js';
import './reset.css';


export default class Reset extends Component {
    static getRootClass() {
        return '.reset';
    }

    constructor(root) {
        super(root);
        this.root.addEventListener('click', this.handleResetClick.bind(this));
    }

    setLevel(level) {
        this.level = level;
        if (this.level == "nightmare") {
            console.log('fade out...');
            this.fadeOut();
        } else {
            this.fadeIn();
        }
    }


    handleResetClick() {
        if (this.level == "nightmare") 
            this.fadeOut();
        this.fire('click');
    }

    showPlayAgain() {
        this.fadeIn();
        this.root.textContent = "Play Again";
    }

    reset() {
        this.root.textContent = "New Color";
    }

    fadeOut() {
        this.root.style.opacity = 0;
    }

    fadeIn() {
        this.root.style.opacity = 1;
    }

}