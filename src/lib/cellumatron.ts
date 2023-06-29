import { Grid } from "./grid";
import { GridRenderer } from "./gridrenderer";
import { Context2DRenderer } from "./context2drenderer";
import { Sand } from "./element";







export class Cellumatron {

    startTime: number = 0;
    deltaTime: number = 0; // IN MS

    renderer: Context2DRenderer;

    
    dataGrid: Grid;
    gridRenderer: GridRenderer;


    // Game options
    cellSize: number = 1;
    avgFPS: number = -1;


    constructor() {
        this.renderer = Context2DRenderer.instance;

        const dimentions = this.renderer.getDimentions();

        dimentions.width  /= this.cellSize;
        dimentions.height /= this.cellSize;

        this.dataGrid = new Grid(dimentions);
        this.gridRenderer = new GridRenderer(this.dataGrid, this.cellSize);



        // TEST
        for(let i = 0; i < dimentions.width; ++i)
        for(let j = 0; j < dimentions.height; ++j)
        {
            if(Math.round(Math.random()))
            this.dataGrid.setElementAt(i, j, Sand);
        }
        //-----

        requestAnimationFrame((dt)=>this.render(dt));
    }



    // Game Loop
    public render(timestamp: number): void {
        this.deltaTime = timestamp - this.startTime;
        this.startTime = timestamp;

        const fps = 1000/this.deltaTime;

        if(this.avgFPS===-1)this.avgFPS=fps;
        else this.avgFPS = (this.avgFPS+fps)/2;
        console.log(this.avgFPS.toFixed(0));
        
        //
        this.gridRenderer.renderGrid(this.renderer);
        
        
        requestAnimationFrame((dt)=>this.render(dt));
    }
}
