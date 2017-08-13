import Component from './component.js';
import './navbar.css';

export default class Navbar extends Component {
    static getRootClass() {
        return '.navbar';
    }

    
    constructor(root) {
        super(root);
        this.brand = root.querySelector('.brand');
        this.hard = root.querySelector('.hard');
        this.nightmare = root.querySelector('.nightmare');
        this.easy = root.querySelector('.easy');
        this.hard.addEventListener('click', this.handleHardClick.bind(this));
        this.nightmare.addEventListener('click', this.handleNightmareClick.bind(this));
        this.easy.addEventListener('click', this.handleEasyClick.bind(this));
    }



    handleHardClick() {
        this.easy.classList.remove("active");
        this.nightmare.classList.remove("active");
        this.hard.classList.add("active");        
        this.fire('hardClick');
    }

    handleNightmareClick() {
        this.easy.classList.remove("active");
        this.nightmare.classList.add("active");
        this.hard.classList.remove("active");        
        this.fire('nightmareClick');
    }
    handleEasyClick() {
        this.easy.classList.add("active");
        this.nightmare.classList.remove("active");
        this.hard.classList.remove("active");        
        this.fire('easyClick');
        
    }


   
}