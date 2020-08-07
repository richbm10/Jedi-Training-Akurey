const game = new Game();
game.initialize();

function Game() {
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const minPeepTime = 200;
    const maxPeepTime = 1000;
    let lastHole;
    let timeUp = false;
    let score = 0;

    this.initialize = () => {
        moles.forEach(mole => mole.addEventListener('click', this.bonk));
    }

    this.randomTime = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    }

    this.randomHole = holes => {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) return this.randomHole(holes);
        lastHole = hole;
        return hole;
    }

    this.peep = () => {
        const time = this.randomTime(minPeepTime, maxPeepTime);
        const hole = this.randomHole(holes);
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) this.peep();
        }, time);
    }

    this.startGame = () => {
        scoreBoard.textContent = 0;
        timeUp = false;
        score = 0;
        this.peep();
        setTimeout(() => timeUp = true, 10000)
    }

    this.bonk = e => {
        if (!e.isTrusted) return;
        score++;
        e.target.classList.remove('up');
        scoreBoard.textContent = score;
    }
}


