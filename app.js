let btnsData = []

for (let i = 0; i < 9; i++){
    btnsData.push({
        id: i+1,
        value:'',
        isFilled: '',
        test:'hello'
    })
}

let gameBoard = document.querySelector('.game-board');

let playerTurn = 'o';
let turnTitle = document.querySelector('.turn-title');
turnTitle.textContent = `${playerTurn}'s turn`

btnsData.forEach((item)=>{
    const btn = document.createElement('button')
    btn.setAttribute('id',item.id)
    btn.setAttribute('class','btn-slot')
    gameBoard.appendChild(btn)
    iconAdder(btn,item)
})

function iconAdder(btn,item) {
    btn.addEventListener('click',function(){
        if(!item.isFilled && playerTurn == 'o') {
            playerTurn = 'x'
        } else if (!item.isFilled) {
            playerTurn = 'o'
        }
        if(!item.isFilled && playerTurn == 'o') {
            btn.classList.add("filledX");
            btn.textContent = 'x'
            item.value = 'x'
        } else if(!item.isFilled && playerTurn == 'x') {
            btn.classList.add('filledO')
            btn.textContent = 'o'
            item.value = 'o'
        }
        turnTitle.textContent = `${playerTurn}'s turn`
        item.isFilled = true;
        fullBoard()
        checkWinner()
    })
}

function fullBoard() {
    let filledCount = 0
    btnsData.forEach((btn)=>{
        if (btn.isFilled) {
            filledCount++
        }
    })
    if(filledCount == 9) {
        turnTitle.textContent = "draw!"
        setTimeout(resetGame, 1500);
    }
}

function checkWinner() {
    rowCheck(0,3)
    rowCheck(3,6)
    rowCheck(6,9)

    colCheck(0,'x')
    colCheck(1,'x')
    colCheck(2,'x')
    
    colCheck(0,'o')
    colCheck(1,'o')
    colCheck(2,'o')

    diogCheck('x')
    diogCheck('o')
}

function rowCheck(start,end) {
    let filledX = 0
    let filledO = 0
    for(let i = start; i < end; i++){
        if (btnsData[i].value == 'x') {
            filledX++
        }
        if (btnsData[i].value == 'o') {
            filledO++
        }
    }
    if (filledO == 3) {
        showResults('o is winner!')
        setTimeout(resetGame, 1500);
    }
    if (filledX == 3) {
        showResults('x is winner!')
        setTimeout(resetGame, 1500);
    }
}

function colCheck(start,icon) {
    if(btnsData[start].value == icon && btnsData[start + 3].value == icon && btnsData[start + 6].value == icon) {
        showResults(`${icon} is winner!`)
        setTimeout(resetGame, 1500);
    }
}

function diogCheck(icon) {
    // if(btnsData[start].value == icon && btnsData[start + increaser].value == icon && btnsData[start + (increaser * 2)].value) {
        // }
        if(btnsData[0].value == icon && btnsData[4].value == icon && btnsData[8].value == icon) {
                showResults(`${icon} is winner!`)
                setTimeout(resetGame, 1500);
    }
        if(btnsData[2].value == icon && btnsData[4].value == icon && btnsData[6].value == icon) {
                showResults(`${icon} is winner!`)
                setTimeout(resetGame, 1500);
    }
}

const result = document.querySelector('.result')
function showResults(resultContent) {
    const resultTitle = document.createElement('h1')
    turnTitle.textContent = "the game is finished"
    resultTitle.textContent = resultContent
    result.appendChild(resultTitle)
}

const resetBtn = document.querySelector('.reset-btn')
const resetGame = () => {
    btnsData.forEach((item)=>{
        item.value = ''
        item.isFilled = ''
    })
    
    result.innerHTML = ''

    turnTitle.textContent = `${playerTurn}'s turn`

    const slot = document.querySelectorAll('.btn-slot')
    for (var i = 0, len = slot.length; i < len; i++) {
        slot[i].classList.remove("filledX");
        slot[i].classList.remove("filledO");
        slot[i].textContent = ''
    }
}
resetBtn.addEventListener('click',resetGame)