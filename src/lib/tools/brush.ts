import { ElementType } from "../element";
import { Game } from "../game";
import { Grid } from "../grid";
import { MouseInput } from "../mouseinput";
import { Tool } from "../tools";



interface BrushOptions {
    size: number;
    selectedElement: ElementType;
};



export class Brush extends Tool {

    public static instance: Tool = new Brush();

    private options: BrushOptions = {size: 5, selectedElement: ElementType.CUSTOM};

    public setOptions(options: BrushOptions) {
        this.options = options;
    }

    public use(): void {
        if(!MouseInput.getButton(0)) return;
        const grid: Grid = Game.instance.getGrid();

        const {x, y} = MouseInput.position;


        const middle = this.options.size / 2 << 0;


        for(let i=-middle;i<middle+1;++i)
        for(let j=-middle;j<middle+1;++j)
        {
            grid.setElementAt(x+i, y+j, this.options.selectedElement);
        }
        // Dynamic
    }

    public setOption(key: string, value: any): void {
        // TODO: CHANGE
        // @ts-ignore
        this.options[key] = value;
    }
    
}
