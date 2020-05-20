import {useState, useEffect} from 'react'
import { createStage } from '../../gameHelpers'


export const useStage = (aPlayer, resetPlayer) => {
    
    const [ stage, setStage] =  useState(createStage());

    useEffect(() => {
        const updateStage = (prevStage) => {
            //update stage
            const newStage = prevStage.map( row => row.map( cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

            //draw the tetromino
            aPlayer.tetromino.forEach((row, y) => {
                row.forEach( (value, x) => {
                    if (value !== 0){
                        //update the matrix with the player values
                        newStage[y + aPlayer.coord.y][x + aPlayer.coord.x] = [value, `${aPlayer.collided ? 'merged' : 'clear'}`]
                    }
                })
            });

            if(aPlayer.collided){
                resetPlayer();
            }
            //finaly, return the stage completily updated
            return newStage;
        }

        setStage( prev => updateStage(prev));


    }, [aPlayer, resetPlayer])

    return [stage, setStage];
}