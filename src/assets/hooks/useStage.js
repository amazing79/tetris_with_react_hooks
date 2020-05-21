import {useState, useEffect} from 'react'
import { createStage } from '../../gameHelpers'

export const useStage = (aPlayer, resetPlayer) => {
    
    const [ stage, setStage] =  useState(createStage());
    const [ rowCleared, setRowCleared] = useState(0);

    useEffect(() => {

        setRowCleared(0);
        //this function clear a full row
        const sweepRows = (newStage) => 
        {
            return newStage.reduce((ack, row) => 
            {
                //if result of findIndex is equal to -1, that's means don't have any 0 at that row.
                if( (row.findIndex(cell => cell[0] === 0 )) === -1){
                    //now we have to remove the full row.
                    setRowCleared( prev => prev + 1);
                    //what we do, is add new empty row  for each full row
                    ack.unshift(new Array(newStage[0].length).fill([ 0, 'clear']));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, [])
        }

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
                return sweepRows(newStage);
            }
            //finaly, return the stage completily updated
            return newStage;
        };

        setStage( prev => updateStage(prev));

    }, [aPlayer, resetPlayer]);

    return [stage, setStage, rowCleared];
}