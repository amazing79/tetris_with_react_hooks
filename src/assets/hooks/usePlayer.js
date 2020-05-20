import { useState, useCallback } from 'react'
import { TETROMINOS, randomTetromino } from '../../tetrominos'
import { STAGE_WIDTH} from '../../gameHelpers'

const initialState = { coord:{ x:0, y:0}, tetromino: TETROMINOS[0].shape, collided:false };

export const usePlayer = () => {
    
    const [ player, setPlayer] =  useState(initialState);

    const updatePlayerPos = ({newX, newY, collided}) =>{
        //console.log(`movemos el guachin ${player.coord.x} con ${newX} `);
        setPlayer( prevState => (
            {
            ...prevState,
            coord:{ x: (prevState.coord.x += newX), y: (prevState.coord.y += newY)},
            collided: collided
            }
            ));
        
    }

    const resetPlayer = useCallback( () => {
        setPlayer( { coord: {x: (STAGE_WIDTH / 2) - 2, y:0}, tetromino:randomTetromino().shape, collided:false});
        }, []);

    return [player, updatePlayerPos, resetPlayer];
}