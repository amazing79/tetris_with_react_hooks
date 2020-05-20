export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20; 

export function createStage() {
    /* 
    Array.from nos crea el array desde un template 
    Primer array para indicar la cantidad de columnas, el segundo las filas.
    A su vez, el segundo sera el que tendra los valores para cada fila columna.
    */
    return  Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']) );
}

export const checkCollision = (player, stage, { newX: moveX, newY: moveY }) => {
    
    for (let y = 0; y < player.tetromino.length; y++) {
      for (let x = 0; x < player.tetromino[y].length; x++) {
        // 1. Check that we're on an actual Tetromino cell
        if (player.tetromino[y][x] !== 0) {
            //ayudines para hacer mas claro el codigo
            // 2. Check that our move is inside the game areas height (y)
            // We shouldn't go through the bottom of the play area
            let passBottom = stage[y + player.coord.y + moveY];
            // 3. Check that our move is inside the game areas width (x)
            let passLeftRight = stage[y + player.coord.y + moveY][x + player.coord.x + moveX]
            let blank =  stage[y + player.coord.y + moveY][x + player.coord.x + moveX][1] !== 'clear'; // 4. Check that the cell wer'e moving to isn't set to clear
          if ( !passBottom  || !passLeftRight || blank) {
            return true;
          }
        }
      }
    }
  };
  