import styles from './gamedisplay.module.css';
import React from 'react';


const EMPTY = ' ';
const PLAYER_X = 'X';
const PLAYER_O = 'O';

export default class GameDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board: Array(9).fill(EMPTY),
            computerSymbol: PLAYER_O,
            currentPlayer: PLAYER_X,
            opponent: PLAYER_O,
            winner: null,
            lastMoveByUser: false,
            gameEnded: false,
            delayBeforeDisplay: false,
            
            
        };
    }
   
    handleClick = (index) => {
        
        const { board, currentPlayer, winner, gameEnded } = this.state;

        if (board[index] === EMPTY && !winner &!gameEnded) {
            const newBoard = [...board];
            newBoard[index] = currentPlayer;
            this.checkWinner();

            this.setState({
                board: newBoard,
                currentPlayer: currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X,
                opponent: currentPlayer === PLAYER_X ? PLAYER_X : PLAYER_O,
                lastMoveByUser: true
            }, () => {
                this.checkWinner();
                if (!this.state.gameEnded) {
                    this.handleComputerMove();
                }
            });
            
        }
    };
   

     
    
     handleComputerMove = () => {
        const { board, currentPlayer,computerSymbol, opponent, winner, gameEnded, } = this.state;
        if (currentPlayer === computerSymbol && !winner && !gameEnded) {
            // Wait for 0.8 seconds before making the move
            setTimeout(() => {
                let move;
                
    
                if (this.state.board.filter(cell => cell !== EMPTY).length === 1) {
                    // After the first move, prioritize winning or blocking
                    move = this.getBestMove(board, currentPlayer);
                } else {
                    move = this.getBestMove(board, currentPlayer, opponent);
                }
    
                if (move !== null && !this.state.gameEnded) {
                    const newBoard = [...board];
                    newBoard[move] = currentPlayer;
                    this.setState({ 
                        board: newBoard, 
                        currentPlayer: currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X,
                        opponent: currentPlayer === PLAYER_X ? PLAYER_X : PLAYER_O,
                        lastMoveByUser: false
                    }, () => {
                        this.checkWinner();
                    });
                }
            }, 800);
        }
        
    };
    

    

    checkWinner = () => {
        const { board } = this.state;

        //implementing logic based on rules
        const winPatterns = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for (const pattern of winPatterns){
            const [a,b,c] = pattern;
            if (board[a] !== EMPTY && board[a] === board[b] && board[a] === board[c]) {
                this.setState({
                    winner: board[a],
                    gameEnded: true,
                    delayBeforeDisplay: true,    
                });
                return;
            }
        }
    }

    

//     

getBestMove = (currentBoard, currentPlayer) => {
    // const {opponent, currentPlayer, nextPlayer} = this.state;
    const myOpponent = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;

    // Check for available winning moves for both the player and opponent
    const winningMoves = [];
    const opponentWinningMoves = [];

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;

        // For the current player
        if (
            currentBoard[a] === EMPTY ||
            currentBoard[b] === EMPTY ||
            currentBoard[c] === EMPTY
        ) {
            if (
                currentBoard[a] === currentPlayer &&
                currentBoard[b] === currentPlayer &&
                currentBoard[c] === EMPTY
            ) {
                winningMoves.push(c);
            } else if (
                currentBoard[a] === currentPlayer &&
                currentBoard[c] === currentPlayer &&
                currentBoard[b] === EMPTY
            ) {
                winningMoves.push(b);
            } else if (
                currentBoard[b] === currentPlayer &&
                currentBoard[c] === currentPlayer &&
                currentBoard[a] === EMPTY
            ) {
                winningMoves.push(a);
            }
        }

        // For the opponent
        if (
            currentBoard[a] === EMPTY ||
            currentBoard[b] === EMPTY ||
            currentBoard[c] === EMPTY
        ) {
            if (
                currentBoard[a] === myOpponent &&
                currentBoard[b] === myOpponent &&
                currentBoard[c] === EMPTY
            ) {
                opponentWinningMoves.push(c);
            } else if (
                currentBoard[a] === myOpponent &&
                currentBoard[c] === myOpponent &&
                currentBoard[b] === EMPTY
            ) {
                opponentWinningMoves.push(b);
            } else if (
                currentBoard[b] === myOpponent &&
                currentBoard[c] === myOpponent &&
                currentBoard[a] === EMPTY
            ) {
                opponentWinningMoves.push(a);
            }
        }
    }

    // Prioritize winning moves
    if (winningMoves.length > 0) {
        return winningMoves[0];
    }

    // Prioritize blocking opponent's winning moves
    if (opponentWinningMoves.length > 0) {
        return opponentWinningMoves[0];
    }

    

    // Prioritize center cell (index 4)
    if (currentBoard[4] === EMPTY) {
        return 4;
    }

    if (
        currentBoard[1] ===myOpponent
        &&currentBoard[5] === myOpponent 
        &&currentBoard[2] === EMPTY
        ){
        return 2;
    }
    if (
        currentBoard[1] ===myOpponent
        &&currentBoard[3] === myOpponent 
        &&currentBoard[0] === EMPTY
        ){
        return 0;
    }
    if (
        currentBoard[1] ===myOpponent
        &&currentBoard[8] === myOpponent 
        &&currentBoard[5] === EMPTY
        ){
        return 5;
    }
    if (
        currentBoard[1] ===myOpponent
        &&currentBoard[6] === myOpponent 
        &&currentBoard[3] === EMPTY
        ){
        return 3;
    }
    if (
        currentBoard[3] ===myOpponent
        &&currentBoard[7] === myOpponent 
        &&currentBoard[6] === EMPTY
        ){
        return 6;
    }
    if (
        currentBoard[5] ===myOpponent
        &&currentBoard[7] === myOpponent 
        &&currentBoard[8] === EMPTY
        ){
        return 8;
    }
    if (
        currentBoard[5] ===myOpponent
        &&currentBoard[6] === myOpponent 
        &&currentBoard[7] === EMPTY
        ){
        return 7;
    }
    if (
        currentBoard[2] ===myOpponent
        &&currentBoard[3] === myOpponent 
        &&currentBoard[1] === EMPTY
        ){
        return 1;
    }
    if (
        currentBoard[2] ===myOpponent
        &&currentBoard[7] === myOpponent 
        &&currentBoard[5] === EMPTY
        ){
        return 5;
    }
    if (
        currentBoard[0] ===myOpponent
        &&currentBoard[5] === myOpponent 
        &&currentBoard[1] === EMPTY
        ){
        return 1;
    }
    if (
        currentBoard[0] ===myOpponent
        &&currentBoard[7] === myOpponent 
        &&currentBoard[3] === EMPTY
        ){
        return 3;
    }
    if (
        currentBoard[3] ===myOpponent
        &&currentBoard[8] === myOpponent 
        &&currentBoard[7] === EMPTY
        ){
        return 7;
    }

   // Prioritize corners (0, 2, 6, 8) if the center cell is not available
   const cornerIndices = [0, 2, 6, 8].filter((index) => currentBoard[index] === EMPTY);
   if (cornerIndices.length > 1) {
       return cornerIndices[Math.floor(Math.random() * cornerIndices.length)];
   }

  

    // Prioritize edges (1, 3, 5, 7) if the center cell is not available and a corner has been played
    const edgeIndices = [ 1, 3, 5, 7].filter((index) => currentBoard[index] === EMPTY);
    if (edgeIndices.length > 1) {
        return edgeIndices[Math.floor(Math.random() * edgeIndices.length)];
    }

    // Otherwise, make a random move 
    const emptyIndices = currentBoard.reduce(
        (acc, cell, index) => (cell === EMPTY ? [...acc, index] : acc),
        []
    );

    if (emptyIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyIndices.length);
        return emptyIndices[randomIndex];
    }

    return null; // The board is full
};

renderResult = () => {
    const { winner, lastMoveByUser, delayBeforeDisplay } = this.state;

    if (winner !== null || this.state.board.every((cell) => cell !== EMPTY)) {
        const userWon = (winner === 'X' && lastMoveByUser) || (winner === 'O' && lastMoveByUser);

        if (delayBeforeDisplay) {
            setTimeout(() => {
                this.setState({ delayBeforeDisplay: false });
            }, 800);

            return null; // Wait for the delay before displaying the result
        }

        if (userWon) {
            return (
                <div className={styles['result']}>
                    <p>You won!</p>
                    <p>Do you want to play again?</p>
                    <p>Choose your symbol:</p>
                    <div className={styles['play-again']}>
                        <button onClick={() => this.handleSymbolSelection('X')}>X</button>
                        <button onClick={() => this.handleSymbolSelection('O')}>O</button>
                    </div>
                </div>
            );
        } else if (winner !== null) {
            return (
                <div className={styles['result']}>
                    <p>You lost!</p>
                    <p>Do you want to play again?</p>
                    <p>Choose your symbol:</p>
                    <div className={styles['play-again']}>
                        <button onClick={() => this.handleSymbolSelection('X')}>X</button>
                        <button onClick={() => this.handleSymbolSelection('O')}>O</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles['result']}>
                    <p>It's a draw!</p>
                    <p>Do you want to play again?</p>
                    <p>Choose your symbol:</p>
                    <div className={styles['play-again']}>
                        <button onClick={() => this.handleSymbolSelection('X')}>X</button>
                        <button onClick={() => this.handleSymbolSelection('O')}>O</button>
                    </div>
                </div>
            );
        }
    }

    return null;
};


handleSymbolSelection = (symbol) => {
    // Reset the game with the selected symbol
    const computerNextSymbol = symbol === 'X' ? 'O' : 'X';

    this.setState(
        {
            board: Array(9).fill(EMPTY),
            computerSymbol: computerNextSymbol,
            currentPlayer: PLAYER_X,
            winner: null,
            gameEnded: false,
        },
        () => {
            if (computerNextSymbol === 'X') {
                // If the computer symbol is 'X', let the computer make the first move.
                this.handleComputerMove();
            }
        }
    );
};





    render(){

        const { board } = this.state;
        const result = this.renderResult();

        return (
            <div>
                {result}
                
              <div className={styles['game']}>
                {board.map((value, index) => (
                  <div
                    key={index}
                    className={styles['game-column']}
                    onClick={() => this.handleClick(index)}
                  >

                    <span className={`${styles['appear-animation']}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
                }
            }
               