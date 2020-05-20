import React from 'react'
import Cell from './Cell'
import { StyledStage } from './styles/StyledStage'


const Stage = ({stage}) => {
    return (
        <StyledStage width={stage[0].length} height={stage.length}>
            {
                stage.map( row =>  row.map((cell, idx) => <Cell key={idx} type={cell[0]} />))
            }
        </StyledStage>
    )
}

export default Stage

