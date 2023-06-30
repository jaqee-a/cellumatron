import { GridRenderer } from "./gridrenderer";
import { Context2DRenderer } from "./context2drenderer";
import { CustomEventHandler } from "./eventhandler";
import { Game } from "./game";
import { KeyboardInput } from "./keyboardinput";
import { MouseInput } from "./mouseinput";


// Game Manager
export class Cellumatron {

    startTime: number = 0;
    deltaTime: number = 0; // IN MS

    renderer: Context2DRenderer;
    canvasEventHandler: CustomEventHandler;

    
    gridRenderer: GridRenderer;
    game: Game;


    // Game options
    cellSize: number = 5;
    avgFPS: number = -1;


    constructor() {
        this.renderer = Context2DRenderer.instance;
        this.canvasEventHandler = new CustomEventHandler();

        const dimentions = this.renderer.getDimentions();

        dimentions.width  /= this.cellSize;
        dimentions.height /= this.cellSize;

        this.game = new Game(dimentions);

        this.gridRenderer = new GridRenderer(this.game.getGrid(), this.cellSize);

        this.createEventHandlers(this.renderer.getContext().canvas);

        requestAnimationFrame((dt)=>this.loop(dt));
    }


    createEventHandlers(canvas: HTMLCanvasElement) {
        let {top, left} = canvas.getClientRects().item(0)!;

        top  = Math.floor(top);
        left = Math.floor(left);
        
        this.canvasEventHandler.on("mousemove", (x: number, y: number)                =>{this.onMouseMoveHandler(x, y)        });
        this.canvasEventHandler.on("mousedown", (x: number, y: number, button: number)=>{this.onMouseDownHandler(x, y, button)});
        this.canvasEventHandler.on("mouseup"  , (x: number, y: number, button: number)=>{this.onMouseUpHandler(x, y, button)  });
        this.canvasEventHandler.on("keydown"  , (key: string)                         =>{this.onKeyDownHandler(key)           });

        document.addEventListener("keydown", (e) => {
            this.canvasEventHandler.emit("keydown", e.key);
        });

        canvas.addEventListener("mouseup", (e: MouseEvent) => {
            const {clientX, clientY} = e;
            this.canvasEventHandler.emit("mouseup", clientX - left , clientY - top, e.button);
        });

        canvas.addEventListener("mousedown", (e: MouseEvent) => {
            const {clientX, clientY} = e;
            this.canvasEventHandler.emit("mousedown", clientX - left , clientY - top, e.button);
        });

        canvas.addEventListener("mousemove", (e: MouseEvent) => {
            const {clientX, clientY} = e;
            this.canvasEventHandler.emit("mousemove", clientX - left , clientY - top);
        })
    }

    onMouseUpHandler(_: number, __: number, button: number): void {
        MouseInput.setButton(button as (0 | 1 | 2), false);
    }

    onMouseMoveHandler(x: number, y: number): void {
        MouseInput.setPosition(Math.floor(x / this.cellSize), Math.floor(y / this.cellSize));
    }

    onMouseDownHandler(_: number, __: number, button: number): void {
        MouseInput.setButton(button as (0 | 1 | 2), true);
    }

    onKeyDownHandler(key: string): void {
        KeyboardInput.setCode(key);
    }

    // private v=0;

    // Game Loop
    public loop(timestamp: number): void {
        this.deltaTime = timestamp - this.startTime;
        this.startTime = timestamp;

        const fps = 1000/this.deltaTime;

        if(this.avgFPS===-1)this.avgFPS=fps;
        else this.avgFPS = (this.avgFPS+fps)/2;

        // if((++this.v)%10!==0){
        //             requestAnimationFrame((dt)=>this.loop(dt));

        //     return;

        // }
        // this.v=0;
        // console.log(this.avgFPS);
        
        // Tick
            // Read input
            // Update
        this.game.update(this.deltaTime);
            // Render
        this.gridRenderer.renderGrid(this.renderer);
            // Clear input
        KeyboardInput.clearInput();
        // MouseInput.clearInput();
        
        requestAnimationFrame((dt)=>this.loop(dt));
    }
}
