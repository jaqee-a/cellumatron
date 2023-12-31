interface GridOptions {
    width: number;
    height: number;
}

export class Grid {

    private grid: number[][];
    private replacementGrid: number[][];

    constructor(private options: GridOptions) {
        this.grid = new Array<number[]>(this.options.width);
        this.replacementGrid = new Array<number[]>(this.options.width);
        for(let i=0;i<this.options.width;++i) {
            this.grid[i] = new Array(this.options.height);
            this.replacementGrid[i] = new Array(this.options.height);
            this.grid[i].fill(0);
            this.replacementGrid[i].fill(0);
        }
    }

    public getElementAt(x: number, y: number): number | null {
        if(x < 0 || x >= this.options.width ||
           y < 0 || y >= this.options.height) {
            // console.error(`${x}-${y} is out of grid bound`);
            return null;
        }
        return this.grid[x][y];
    }

    public getElementAtByOffset(x: number, y: number, ox: number, oy: number): number | null {
        const newX = x+ox;
        const newY = y+oy;
        if(newX < 0 || newX >= this.options.width ||
           newY < 0 || newY >= this.options.height) {
            // console.error(`${x}-${y} is out of grid bound`);
            return null;
        }

        const comparatorGrid: number[][] = this.replacementGrid;
            // (newY > y) || (newY === y && newX < x) ? this.replacementGrid : this.grid;

        return comparatorGrid[newX][newY];
    }

    public setElementAt(x: number, y: number, value: number): void {
        if(x < 0 || x >= this.options.width ||
           y < 0 || y >= this.options.height) {
            // console.error(`${x}-${y} is out of grid bound`);
            return;
        }
        this.replacementGrid[x][y] = value;
    }


    public getDimentions(): [number, number] {
        return [this.grid.length, this.grid[0].length];
    }


    public updateGrid(): void {
        for(let i=0;i<this.options.width;++i)
        for(let j=0;j<this.options.height;++j) {
            this.grid[i][j] = this.replacementGrid[i][j];
        }
    }
    
}
