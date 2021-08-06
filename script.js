const boxes = Array.from(document.getElementsByClassName('box'));
//To set the main text.
const text = document.getElementById('mainText');

//Restart button
const restartBtn = document.getElementById('restartBtn');

//Current Player move display.
const curPlayer = document.getElementById('curPlayer');

//Array to store values of the boxes.
const spaces = [null,null,null,null,null,null,null,null,null];
const PLAYER_1 = 'O';
const PLAYER_2 = 'X';

let currentPlayer ='O';

//Function handling box click.
const boxClicked = (event)=>{
    const id = event.target.id;
    if(!spaces[id]){
        spaces[id] = currentPlayer;
        event.target.innerText = currentPlayer;
        if(hasPlayerWon()){
            text.innerText = `${currentPlayer} has won.`;
        }
        else if(currentPlayer==PLAYER_1){
            currentPlayer=PLAYER_2;
        }
        else{
            currentPlayer=PLAYER_1;
        }
        curPlayer.innerText = `${currentPlayer}'s turn`;
    }
}

//Function to add glow to the row, column or diagnol.
function addGlow(id1, id2, id3){
    const boxIDs = document.querySelectorAll(`#\\3${id1},#\\3${id2},#\\3${id3}`);
    boxIDs.forEach((box,index)=>{
        box.classList.add('box-glow');
    });
}

//Function to block clicks after the game has been won.
function blockInput(){
    boxes.forEach((box,index)=>{
        box.classList.add('blocked-input');
    });
}

//Function to check if the player has won.
const hasPlayerWon = () =>{
    if(spaces[0]==currentPlayer){
        if((spaces[1]==currentPlayer)&&(spaces[2]==currentPlayer)){
            addGlow(0,1,2);
            blockInput();
            return true;
        }
        if((spaces[3]==currentPlayer)&&(spaces[6]==currentPlayer)){
            addGlow(0,3,6);
            blockInput();
            return true;
        }
        if((spaces[4]==currentPlayer)&&(spaces[8]==currentPlayer)){
            addGlow(0,4,8);
            blockInput();
            return true;
        }
    }
    if(spaces[8]==currentPlayer){
        if((spaces[5]==currentPlayer)&&(spaces[2]==currentPlayer)){
            addGlow(8,5,2);
            blockInput();
            return true;
        }
        if((spaces[7]==currentPlayer)&&(spaces[6]==currentPlayer)){
            addGlow(8,7,6);
            blockInput();
            return true;
        }
    }
    if(spaces[4]==currentPlayer){
        if((spaces[1]==currentPlayer)&&(spaces[7]==currentPlayer)){
            addGlow(4,1,7);
            blockInput();
            return true;
        }
        if((spaces[3]==currentPlayer)&&(spaces[5]==currentPlayer)){
            addGlow(4,3,5);
            blockInput();
            return true;
        }
    }
    if(spaces[6]==currentPlayer){
        if((spaces[4]==currentPlayer)&&(spaces[2]==currentPlayer)){
            addGlow(6,4,2);
            blockInput();
            return true;
        }
    }
}

//Adding event listner to all the boxes.
boxes.forEach((box,index)=>{
    box.addEventListener('click',boxClicked);
});

//Function to restart the game.
function restartGame(){
    spaces.forEach((space,index)=>{
        spaces[index]=null;
    });
    boxes.forEach((box,index)=>{
        box.innerHTML='';
        box.classList.remove('box-glow','blocked-input');
    });
    text.innerText = `Tic Tac Toe`;
    curPlayer.innerText='';
    currentPlayer = PLAYER_1;
}

//Adding event listner to the restart button.
restartBtn.addEventListener('click',restartGame);

