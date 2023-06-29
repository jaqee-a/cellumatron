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

    public getElementAt(x: number, y: number) {
        return this.grid[x][y];
    }

    public setElementAt(x: number, y: number, value: Element) {
        this.grid[x][y] = value;
    }


    public getDimentions(): [number, number] {
        return [this.grid.length, this.grid[0].length];
    }
    
}
