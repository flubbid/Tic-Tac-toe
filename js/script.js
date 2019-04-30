// constants

const colors = {
    '1': 'red',
    '-1': 'black',
    'null': 'white'
}

// state variables
let board, turn, winner

// cached element references
let message = document.querySelector('h2') // This is where we print messages
let squares = document.querySelectorAll('td div')

// event listeners
document.querySelector('button').addEventListener('click', init)
document.querySelector('table').addEventListener('click', handleMove)

// functions

init()


function init() {
    board = [null, null, null, null, null, null, null, null, null]
    turn = 1
    winner = null
    render()
}

function handleMove(evt) {
    let index = parseInt(evt.target.id.replace('sq', ''))
    if (board[index] || winner) return
    board[index] = turn
    winner = getWinner()
    turn *= -1
    render()
}

function getWinner() {
    if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0]
    if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3]
    if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6]
    if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0]
    if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1]
    if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2]
    if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0]
    if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2]
    if (board.includes(null)) return null
    return 'T'
}

function render() {
    board.forEach(function (square, idx) {
        squares[idx].style.background = colors[square]
    })
    if (winner === 'T') {
        message.innerHTML = `Tie Game!`
    } else if (winner) {
        message.innerHTML = `Congratulations ${colors[winner]}`
    } else {
        message.innerHTML = `${colors[turn]}'s Turn`
    }
}