import { useState, useCallback } from 'react'
import { TETROMINOS, randomTetromino } from '../../tetrominos'
import { STAGE_WIDTH, checkCollision} from '../../gameHelpers'

const initialState = { coord:{ x:0, y:0}, tetromino: TETROMINOS[0].shape, collided:false };

export const usePlayer = () => {
    
    const [ player, setPlayer] =  useState(initialState);

    const rotate = (tetro, dir) => {

        const rotatedTetro = tetro.map( (_, index) => tetro.map( col => col[index]));

        if (dir > 0) {
            return rotatedTetro.map( row => row.reverse());
        }

        return rotatedTetro.reverse();
    }

    const rotatePlayer = (stage, dir) => {
        //make a deep copy, 
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        //rotate the tetromino, 
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        //check for colission while Im rotating tetromino
        const x_coord = clonedPlayer.coord.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage,{ newX: 0, newY:0}))
        {
            clonedPlayer.coord.x = clonedPlayer.coord.x + offset;
            offset = -( offset + ( offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length){
                rotate(clonedPlayer.tetromino, -dir)
                clonedPlayer.coord.x = x_coord;
                return;
            }
        }

        setPlayer(clonedPlayer);
    }

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

    return [player, updatePlayerPos, resetPlayer, rotatePlayer];
}