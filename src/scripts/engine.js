const state = {
    view:{
        square: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        time: document.querySelector('#time'),
        score: document.querySelector('#score'),
        lp: document.querySelector('#lifeP'),
        tryAgain: document.querySelector("#tryA")
    },
    values:{
        gameVel: 1000,
        hitPosition: 0,
        scorei: 0,
        timeatu: 60,
        lifePoints: 5,
        timeini:60,
        lifeini:5,
        scoreini:0,
    },
    action:{
        countDownTimeId: setInterval(contDown,1000),
        timeId: setInterval(randomSquare,1000),
    }
}

function init() {
    addListenerHitBox()
}

function playSound(nameSound) {
    let audi = new Audio(`./src/audio/${nameSound}.m4a`)
    audi.volume=0.05
    audi.play()
}

function randomSquare() {
    state.view.square.forEach((square)=>{
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add('enemy')
    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox(){
    state.view.square.forEach((square) =>{
        square.addEventListener("mousedown",()=>{
            if (square.id === state.values.hitPosition) {
                state.values.scorei++
                state.view.score.textContent = state.values.scorei
                state.values.hitPosition = null
                playSound('hit')
            }else{
                state.values.lifePoints--
                state.view.lp.textContent = `x${state.values.lifePoints}`
                if (state.values.lifePoints<=0) {
                    gameOver("Você perdeu todas as vidas")
                }
            }
        })
    })
}

function gameOver(reason) {
    clearInterval(state.action.countDownTimeId)
    clearInterval(state.action.timeId)
    alert(`Game Over! ${reason}! o seu score foi: ${state.values.scorei}`)
    reset()
}

function reset() {
    let resetButton = state.view.tryAgain
    resetButton.style.display="flex"
    resetButton.addEventListener("mousedown",()=>{
        state.view.tryAgain.style.display="none"
        state.action.countDownTimeId = setInterval(contDown,1000)
        state.action.timeId = setInterval(randomSquare,1000)
        state.values.lifePoints = state.values.lifeini
        state.values.scorei = state.values.scoreini
        state.values.timeatu = state.values.timeini
        state.view.lp.textContent =`x${state.values.lifeini}`
        state.view.score.textContent = state.values.scoreini
        state.view.time.textContent = state.values.timeini
        init()
    })
}

function contDown() {
    state.values.timeatu--
    state.view.time.textContent = state.values.timeatu
    if (state.values.timeatu<=0) {
        gameOver("Seu tempo acabou")
    }
}

init();