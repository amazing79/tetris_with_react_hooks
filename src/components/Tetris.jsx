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
import { useInterval} from '../assets/hooks/useInterval'
import { usePlayer} from '../assets/hooks/usePlayer'
import { useStage } from '../assets/hooks/useStage'
import { useGameStatus } from '../assets/hooks/useGameStatus'

const Tetris = () => {
    
    const [ dropTime, setDropTime] = useState(null);
    const [ gameOver, setGameOver] = useState(false);
    
    const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
    const [stage, setStage, rowsCleared ] = useStage(player, resetPlayer);
    const [rows, setRows, level, setLevel, score, setScore] = useGameStatus(rowsCleared);

    let speed = 800; 

    const startGame = () => {
        //reset and start a new game
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
        setDropTime(speed);
        setLevel(0);
        setRows(0);
        setScore(0);
    }

    const movePlayer = dir => {
        if(!checkCollision(player, stage, {newX:dir, newY:0})){
            updatePlayerPos({newX:dir, newY:0});
        }
    }
    
    const drop = () => {

        if (rows > (level + 1) * 5){
            setLevel(prev => prev + 1);
            setDropTime(speed / (level + 1) + 200)
        }

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
        setDropTime(null);
        drop();
    }

    const rotate = () => {
        rotatePlayer(stage, 1);
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
            case 38:
                rotate(); //pulso para arriba
                return;
            default:
                return;
        }
    }

    const keyUp = ({keyCode}) => {
        if (gameOver) {return;}

        if ( keyCode === 40) {
            setDropTime(speed / (level + 1) + 200);
        }
    }

    //Let's do it with interval 
    useInterval( () =>{
        drop()
        }
       ,dropTime
    );

    return (
        <StyleTetrisWrapper role="button" tabIndex="0" onKeyDown={ e => move(e)} onKeyUp={e => keyUp(e)}>
            <StyledTetris> 
                <Stage stage = {stage} />
                <aside>
                    {
                        gameOver ? (<Display gameOver={gameOver} text='You Lose, Bicth!' />)
                        :(
                        <div>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Rows ${rows}`} />
                            <Display text={`Level ${level}`} />
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
