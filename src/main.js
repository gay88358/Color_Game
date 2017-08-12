import Component from './component.js';
import Navbar from './navbar.js';
import Board from './board.js';
import Deck from './deck.js';
import Reset from './reset.js';
import './main.css';

export default class Main extends Component {
    static getRootClass() {
        return '.main';
    }


    constructor(root) {
        super(root);
        this.navbar = new Navbar(this.root.querySelector('.navbar'));
        this.navbar.on('hardClick', this.handleHardClick.bind(this));
        this.navbar.on('nightmareClick', this.handleNightmareClick.bind(this));
        this.navbar.on('easyClick', this.handleEasyClick.bind(this));
        this.level = "easy";
        // easy hard nightmare

        this.deck = new Deck(this.root.querySelector('.deck'));
        this.deck.on('rightClick', this.handleRightClick.bind(this));
        this.deck.on('wrongClick', this.handleWrongClick.bind(this));

        this.board = new Board(this.root.querySelector('.board'), this.deck.getPickedColor());
        this.timer;
        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleResetClick.bind(this));
        this.component = [this, this.navbar, this.deck, this.board, this.reset];
    }

    handleLevelChangeCick(level) {
        this.component.forEach(f => {
            f.setLevel(level);
        });
    }

    levelChange(level) {
        // change all level of component
        this.handleLevelChangeCick(level);
        // create number of crads depends on the level of the game
        this.deck.render();
        // restart the game
        this.handleResetClick();             
    }
    
    handleEasyClick() {
        this.levelChange("easy");
        clearInterval(this.timer);
    }

    handleHardClick() {
        this.levelChange("hard");
        clearInterval(this.timer);
    }


    handleNightmareClick() {
        this.levelChange("nightmare");
    }

    setLevel(level) {
        this.level = level;
    }

    setCountDownTimer() {
        var s = 0;     
        this.timer = setInterval(function(thisObj) {
            s++
            thisObj.board.setSecond(s);
            if (s == 5) {
                thisObj.component.forEach(f => {
                    f.infoTimeout();
                }) 
            }
        }, 1000, this);

    }

    resetTimer() {
        if (this.level == "nightmare") {
            this.setCountDownTimer();
        }
    }


    handleResetClick(firer) {
        this.root.style.backgroundColor = "#232323";        
        this.deck.reset();
        this.board.reset(this.deck.getPickedColor());
        this.reset.reset();
        this.resetTimer();
    }

    handleRightClick(firer, color) {
        this.board.showCorrectMessage();
        // gameover
        this.root.style.backgroundColor = color;
        this.reset.showPlayAgain();
        console.log('end....');
        clearInterval(this.timer);
    }
        
    handleWrongClick(firer) {
        this.board.showErrorMessage();
    }
        
}


window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
}
