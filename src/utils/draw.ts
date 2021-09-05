import { Pattern } from './patterns';


// mutates the gridCopy to draw pattern at the cursor coordinates
export const draw = (gridCopy: any[][], coordinates: [i: number, j: number], drawMode: Pattern): void => {
    const [i, j] = coordinates;
    const drawPattern = {
        [Pattern.None]: () => {
            gridCopy[i][j] = gridCopy[i][j] ? 0 : 1;
        },
        // XX
        // XX
        [Pattern.Block]: () => {
            gridCopy[i][j] = 1;
            gridCopy[i][j + 1] = 1;
            gridCopy[i + 1][j] = 1;
            gridCopy[i + 1][j + 1] = 1;
        },
        //  XX
        // X  X
        //  XX
        [Pattern.Beehive]: () => {
            gridCopy[i][j] = 1;
            gridCopy[i + 1][j + 1] = 1;
            gridCopy[i - 1][j + 1] = 1;
            gridCopy[i + 1][j + 2] = 1;
            gridCopy[i - 1][j + 2] = 1;
            gridCopy[i][j + 3] = 1;
        },
        //  XX
        // X  X
        //  X X
        //   X
        [Pattern.Loaf]: () => {
            gridCopy[i][j] = 1;
            gridCopy[i][j + 3] = 1;
            gridCopy[i - 1][j + 1] = 1;
            gridCopy[i - 1][j + 2] = 1;
            gridCopy[i + 1][j + 1] = 1;
            gridCopy[i + 1][j + 3] = 1;
            gridCopy[i + 2][j + 2] = 1;
        },
        // XX
        // X X
        //  X 
        [Pattern.Boat]: () => {
            gridCopy[i][j] = 1;
            gridCopy[i][j + 1] = 1;
            gridCopy[i + 1][j] = 1;
            gridCopy[i + 2][j + 1] = 1;
            gridCopy[i + 1][j + 2] = 1;
        },
        //  X
        // X X
        //  X
        [Pattern.Tub]: () => {
            gridCopy[i][j] = 1;
            gridCopy[i + 1][j + 1] = 1;
            gridCopy[i - 1][j + 1] = 1;
            gridCopy[i][j + 2] = 1;
        },
        // XXX
        [Pattern.Blinker]: () => {
            gridCopy[i][j] = 1;
            gridCopy[i][j + 1] = 1;
            gridCopy[i][j + 2] = 1;
        },
        //  XXX
        // XXX
        [Pattern.Toad]: () => {
            gridCopy[i][j + 1] = 1;
            gridCopy[i][j + 2] = 1;
            gridCopy[i][j + 3] = 1;
            gridCopy[i + 1][j] = 1;
            gridCopy[i + 1][j + 1] = 1;
            gridCopy[i + 1][j + 2] = 1;
        },
        // XX
        // X
        //    X
        //   XX
        [Pattern.Beacon]: () => {
            gridCopy[i][j] = 1;
            gridCopy[i][j + 1] = 1;
            gridCopy[i + 1][j] = 1;
            gridCopy[i + 2][j + 3] = 1;
            gridCopy[i + 3][j + 2] = 1;
            gridCopy[i + 3][j + 3] = 1;
        },
        // X X
        //  XX
        //  X
        [Pattern.Glider]: () => {
            gridCopy[i][j] = 1;
            gridCopy[i][j + 2] = 1;
            gridCopy[i + 1][j + 1] = 1;
            gridCopy[i + 1][j + 2] = 1;
            gridCopy[i + 2][j + 1] = 1;
        },
        // X  X
        //     X
        // X   X
        //  XXXX
        [Pattern.LWSS]: () => {
            gridCopy[i][j] = 1;
            gridCopy[i][j + 3] = 1;
            gridCopy[i + 1][j + 4] = 1;
            gridCopy[i + 2][j] = 1;
            gridCopy[i + 2][j + 4] = 1;
            gridCopy[i + 3][j + 1] = 1;
            gridCopy[i + 3][j + 2] = 1;
            gridCopy[i + 3][j + 3] = 1;
            gridCopy[i + 3][j + 4] = 1;
        },

    }
    drawPattern[drawMode]();
}
