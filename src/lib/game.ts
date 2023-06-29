import { Element, getElementById } from "./element";
import { Grid } from "./grid";
import { KeyboardInput } from "./keyboardinput";
import { Tool } from "./tools";
import { Brush } from "./tools/brush";


interface GameOptions {
    width: number;
    height: number;
}



export class Game {

    public static instance: Game;

    private dataGrid: Grid;
    
    selectedTool: Tool = Brush.instance;

    constructor(private options: GameOptions) {
        this.dataGrid =  new Grid(this.options);
        Game.instance = this;
    }

    getGrid(): Grid {
        return this.dataGrid;
    }


    update(_: number): void {

        if(KeyboardInput.isDown('s')) {
            // this.selectedTool.setOption('selectedElement', ElementType.SAND);
        }

        if(KeyboardInput.isDown('w')) {
            // this.selectedTool.setOption('selectedElement', ElementType.WATER);
        }

        // ADD NEW ELEMENTS
        this.selectedTool.use();

        
        // UPDATE ELEMENTS
        for(let i=0;i<this.options.width    ;++i)
        // for(let j=0;j<this.options.height;++j) {
        for(let j=this.options.height-1;j>=0;--j) {
            const currentElementType: number | null = this.dataGrid.getElementAt(i, j);
            if(currentElementType === null || currentElementType === 0) continue;
            const element: Element = getElementById(currentElementType);
            
            this.checkElementRulesAndUpdate(i, j, element);
        }

        // this.dataGrid.updateGrid();        
    }


    checkElementRulesAndUpdate(x: number, y: number, element: Element): void {
        for(const ruleCluster of element.ruleClusters) {
            const clusterCheck: boolean = ruleCluster.rules.every((value) => {
                const newX = value.offsetX + x;
                const newY = value.offsetY + y;

                return this.dataGrid.getElementAt(newX, newY) === value.expect;
            });

            if(clusterCheck) {
                
                for(const action of ruleCluster.actions) {
                    const newX = action.updateOffsetX + x;
                    const newY = action.updateOffsetY + y;

                    this.dataGrid.setElementAt(newX, newY, action.updateWith);
                }

                return;
            }

        }
    }
}
