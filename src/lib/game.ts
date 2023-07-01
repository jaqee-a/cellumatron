import { Element, RuleAction, getElementById } from "./element";
import { Grid } from "./grid";
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
        // UPDATE ELEMENTS
        // for(let i=this.options.width-1;i>=0;--i)
        // for(let j=0;j<this.options.height;++j) {
        for(let i=0;i<this.options.width    ;++i)
        for(let j=this.options.height-1;j>=0;--j) {
            const currentElementType: number | null = this.dataGrid.getElementAt(i, j);
            if(currentElementType === null || currentElementType === 0) continue;
            const element: Element = getElementById(currentElementType);
            
            this.checkElementRulesAndUpdate(i, j, element);
        }

        // ADD NEW ELEMENTS
        this.selectedTool.use();

        this.dataGrid.updateGrid();        
    }


    checkElementRulesAndUpdate(x: number, y: number, element: Element): void {
        for(const ruleCluster of element.ruleClusters) {
            const clusterCheck: boolean = ruleCluster.rules.every((value) => {
                return this.dataGrid.getElementAtByOffset(x, y, value.offsetX, value.offsetY) === value.element;
            });

            if(clusterCheck) {

                // TODO: Maybe a better way of doing this to avoid double loop ? (run actions until one breaks, and then revert all ?)
                const canRunActions: boolean = ruleCluster.actions.every((action: RuleAction) => {
                    return this.dataGrid.getElementAtByOffset(x, y, action.offsetX, action.offsetY) !== null;
                });

                if(!canRunActions) continue;
                
                for(const action of ruleCluster.actions) {
                    const newX = action.offsetX + x;
                    const newY = action.offsetY + y;

                    this.dataGrid.setElementAt(newX, newY, action.element);
                }

                return;
            }
        }

        // this.dataGrid.setElementAt(x, y, element.id);
    }
}

// W W A A A A
// W W A A A A


