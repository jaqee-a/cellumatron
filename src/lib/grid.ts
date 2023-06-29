import { Air, Element } from "./element";




interface GridOptions {
    width: number;
    height: number;
}

export class Grid {

    private grid: Element[][];

    constructor(private options: GridOptions) {
        this.grid = new Array<Element[]>(this.options.width);
        for(let i=0;i<this.options.width;++i) {
            this.grid[i] = new Array(this.options.height);
            this.grid[i].fill(Air);
        }
    }

    public getElementAt(x: number, y: number): Element | null {
        if(x < 0 || x >= this.options.width ||
           y < 0 || y >= this.options.height) {
            // console.error(`${x}-${y} is out of grid bound`);
            return null;
        }
        return this.grid[x][y];
    }

    public setElementAt(x: number, y: number, value: Element): void {
        if(x < 0 || x >= this.options.width ||
           y < 0 || y >= this.options.height) {
            // console.error(`${x}-${y} is out of grid bound`);
            return;
        }
        this.grid[x][y] = value;
    }


    public getDimentions(): [number, number] {
        return [this.grid.length, this.grid[0].length];
    }
    
}
