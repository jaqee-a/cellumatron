import { Air, Sand } from "./element";
import { Grid } from "./grid";
import { KeyboardInput } from "./keyboardinput";
import { MouseInput } from "./mouseinput";


interface GameOptions {
    width: number;
    height: number;
}



export class Game {

    private dataGrid: Grid;

    constructor(private options: GameOptions) {
        this.dataGrid =  new Grid(this.options);
    }

    getGrid(): Grid {
        return this.dataGrid;
    }


    update(dt: number): void {
        if(KeyboardInput.isDown('s')) {
            
            const i = Math.random() * this.options.width  << 0;
            const j = Math.random() * this.options.height << 0;
            
            this.dataGrid.setElementAt(i, j, Sand);
        }

        if(MouseInput.getButton(0)) {
            const {x, y} = MouseInput.position;
            this.dataGrid.setElementAt(x, y, Sand);
        }

        // ADD NEW ELEMENTS
        
        // UPDATE ELEMENTS
        for(let i=0;i<this.options.width    ;++i)
        for(let j=this.options.height-1;j>=0;--j) {
            const ele = this.dataGrid.getElementAt(i, j);
            const down = this.dataGrid.getElementAt(i, j+1);

            if(ele != Air && down === Air) {
                this.dataGrid.setElementAt(i, j, down);
                this.dataGrid.setElementAt(i, j+1, ele);
            }
        }
    }
}
