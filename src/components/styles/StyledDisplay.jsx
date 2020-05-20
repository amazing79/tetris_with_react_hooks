import styled from 'styled-components'

export const StyledDisplay = styled.div`
    border: solid 2px #CCC;
    border-radius:20px;
    display:flex;
    align-items:center;
    margin: 0 0 20px 0;
    padding:20px;
    border: solid 4px #333;
    min-height:30px;
    width:100%;
    color: ${ props => props.gameOver ? 'red' : '#999'};
    background-color:#000;

`;