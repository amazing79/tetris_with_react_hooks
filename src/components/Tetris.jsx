import React, {useState} from 'react'

//make a import of all the components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
//import helpers 
import { createStage, checkCollision } from '../gameHelpers';
//import styles components
import {StyleTetrisWrapper, StyledTetris} from './styles/StyleTetris'
//custom hooks 
import { usePlayer} from '../assets/hooks/usePlayer'
import { useStage } from '../assets/hooks/useStage'

const Tetris = () => {
    
    const [ gameOver, setGameOver] = useState(false);
    const [ dropTime, setDropTime] = useState(null);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage ] = useStage(player, resetPlayer);

    console.log('re render');

    const startGame = () => {
        //reset and start a new game
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    }

    const movePlayer = dir => {
        if(!checkCollision(player, stage, {newX:dir, newY:0})){
            updatePlayerPos({newX:dir, newY:0});
        }
    }
    
    const drop = () => {
        if(!checkCollision(player, stage, {newX:0, newY:1} )){
            updatePlayerPos({newX:0, newY:1, collided:false});
        }
        else{
            if(player.coord.y < 1){
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({newX:0, newY:0, collided:true});
        }
    }

    const dropPlayer = () => {
        drop();
    }
    //invoco solo la propiedad del objeto e, sino sin los brackets seria 'e.keyCode'
    const move = ({keyCode}) => {

       if(gameOver) {return;}
       switch (keyCode){
           case 37: 
                //pulso izquierda 
                movePlayer(-1);
            return;
            case 39: 
                movePlayer(1); //se mueve a la derecha
                return;
            case 40:
                dropPlayer(); //pulso abajo, desciende
                return;
            default:
                return;
        }
    }
    
    return (
        <StyleTetrisWrapper role="button" tabIndex="0" onKeyDown={ e => move(e)}>
            <StyledTetris> 
                <Stage stage = {stage} />
                <aside>
                    {
                        gameOver ? (<Display  gameOver={gameOver} text='You Lose, Bitch!' />)
                        :(
                        <div>
                            <Display text='Score' />
                            <Display text='Rows' />
                            <Display text='Level' />
                        </div>
                        )
                    }
                    <StartButton callBack={startGame}/>
                </aside>
            </StyledTetris>
        </StyleTetrisWrapper>
    )
}

export default Tetris
