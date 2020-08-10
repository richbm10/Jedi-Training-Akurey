const game = new Game();
game.initialize();

function Game() {
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const game = document.querySelector('.game');
    const successAudio = document.querySelector('#kick-sound');
    const failAudio = document.querySelector('#hihat-sound');
    const playForm = document.querySelector('#play-form');
    const rankingTableBody = document.querySelector('#ranking-tbody');
    const minPeepTime = 200;
    const RANK_TOP = 5;
    let maxPeepTime = 1000;
    let ranking = [];
    let lastHole;
    let timeUp = false;
    let score = 0;
    let currentUser = '';

    this.initialize = () => {
        moles.forEach(mole => mole.addEventListener('click', this.bonk));
        game.addEventListener('click', () => { failAudio.play(); });
        ranking = JSON.parse(window.localStorage.getItem('ranking'));
        if (ranking === null || ranking === undefined) ranking = [];
        this.setRanking();
    }

    this.updateRanking = () => {
        if (currentUser === '') currentUser = 'Anónimo';
        let newRanking = [];
        if (ranking.length === 0) {
            newRanking.push({ 'user': currentUser, 'score': score });
        } else {
            let i = 0;
            let added = false;
            while (true) {
                if (newRanking.length === RANK_TOP) break;
                if (i === ranking.length) {
                    if (!added) newRanking.push({ 'user': currentUser, 'score': score });
                    break;
                }
                let user = ranking[i];
                if ((!added) && (user.score <= score)) {
                    newRanking.push({ 'user': currentUser, 'score': score });
                    added = true;
                } else {
                    newRanking.push(user);
                    i++;
                }
            }
        }
        ranking = newRanking;
    }

    this.setRanking = () => {
        rankingTableBody.innerHTML = '';
        ranking.forEach(user => {
            const tableRow = document.createElement('tr');
            let tableData = document.createElement('td');
            tableData.textContent = user.user;
            tableRow.appendChild(tableData);
            tableData = tableData.cloneNode(false);
            tableData.textContent = user.score;
            tableRow.appendChild(tableData);
            rankingTableBody.appendChild(tableRow);
        });
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
        currentUser = playForm.username.value;
        scoreBoard.textContent = 0;
        timeUp = false;
        score = 0;
        this.peep();
        setTimeout(() => {
            timeUp = true;
            this.updateRanking();
            this.setRanking();
            window.localStorage.setItem('ranking', JSON.stringify(ranking));
        }, 10000);
    }

    this.bonk = e => {
        if (!e.isTrusted) return;
        score++;
        console.log(maxPeepTime);
        if (score % 5 === 0 && maxPeepTime > 300) maxPeepTime -= (score / 5) * 10; //increases mole speed each 5 levels
        e.target.classList.remove('up');
        scoreBoard.textContent = score;
        successAudio.play();
        e.stopPropagation();
    }
}