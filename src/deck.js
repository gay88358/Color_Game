import Component from './component.js';
import Card from './card.js';

import './deck.css';

export default class Deck extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root) {
        super(root);
        this.cards = [];
        this.render();
        this.pickedColor = this.pickColor();
        this.gameOver = false;
    }

    render() {
        this.cards = [];
        this.setHtmlByLevel();
        const els = this.root.querySelectorAll(Card.getRootClass());
        for (let el of els) {
            const card = new Card(el);
            card.on('click', this.handleCardClick.bind(this));
            this.cards.push(card);
        }        
    }

    createHtmlByNum(num) {
        for (var i = 0; i < num; i++) {
            this.root.innerHTML += "<div class='card'></div>";
        }
    }

    setHtmlByLevel() {
        while (this.root.hasChildNodes()) {
            this.root.removeChild(this.root.lastChild);
        }
        
        if (this.level == "easy") {
            this.createHtmlByNum(3);
            this.root.style.height = "230px";
        } else {
            this.createHtmlByNum(6);
            this.root.style.height = "400px";
        }
    }

    reset() {
        this.gameOver = false;
        for (let card of this.cards) 
            card.reset();
        this.pickedColor = this.pickColor();
    }

    getPickedColor() {
        return this.pickedColor;
    }




    colorGameOver() {
        this.gameOver = true;
        for (let card of this.cards) 
            card.fadeIn("#FFF");
    }

    infoTimeout() {
        this.colorGameOver();
        this.fire('rightClick', this.pickedColor);                    
    }

    handleCardClick(firer, color) {
        if (this.gameOver == true) return;

        if (color == this.pickedColor) {
            this.colorGameOver();
            this.fire('rightClick', this.pickedColor);            
        } else {
            firer.fadeOut();
            this.fire('wrongClick');
        }   
    }        

    pickColor() {
        console.log(this.cards.length);
        const random = Math.floor(Math.random() * this.cards.length);
        return this.cards[random].getColor();
    }

}