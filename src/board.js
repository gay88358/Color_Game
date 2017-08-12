import Component from './component.js';
import './board.css';


export default class Board extends Component {
    static getRootClass() {
        return '.board';
    }


    constructor(root, color) {
        super(root);
        this.level = "easy";
        this.colorDisplay = this.root.querySelector('.color-picked');
        this.message = this.root.querySelector('.message');
        this.reset(color);
    }

    setSecond(second) {
        this.second = second;
        this.message.textContent = "What's the color? " + String(5 - this.second);        
    }

    infoTimeout() {
        this.message.textContent = "Time Out !";
    }


    reset(color) {
        this.colorDisplay.textContent = color.toUpperCase();
        if (this.level == "nightmare") {
            this.message.textContent = "What's the color? 5";            
        } else {
            this.message.textContent = "What's the color? ";            
        }
    }

    showErrorMessage() {
        if (this.level == "nightmare") {
            this.message.textContent = "Try it! " + String(5 - this.second);            
        } else {
            this.message.textContent = "Try it!";            
        }
    }

    showCorrectMessage() {
        this.message.textContent = "Correctly! ";            
    }

}