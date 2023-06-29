import { Grid } from "./grid";
import { Context2DRenderer } from "./context2drenderer";
import { getElementById } from "./element";


export class GridRenderer {

    // TODO: cell size to options
    constructor(private grid: Grid, private cellSize: number) { }

    public renderGrid(renderer: Context2DRenderer): void {
        const [w, h] = this.grid.getDimentions();
        
        const dim = renderer.getDimentions();

        const imageArray: Uint8ClampedArray = new Uint8ClampedArray(dim.width*dim.height*4); 
        
        for(let i=0;i<w;++i) {
            for(let j=0;j<h;++j) {
                const elementType: number | null = this.grid.getElementAt(i, j);
                if (elementType === null) continue;

                const element = getElementById(elementType);

                const screenX = i * this.cellSize;
                const screenY = j * this.cellSize;

                for(let dx=screenX;dx<screenX+this.cellSize;++dx)
                for(let dy=screenY;dy<screenY+this.cellSize;++dy) {
                    const index = (dy*dim.width+dx)*4;
                    
                    imageArray[ index ]=element!.color.r;
                    imageArray[index+1]=element!.color.g;
                    imageArray[index+2]=element!.color.b;
                    imageArray[index+3]=255;
                }

            }
        }

        const ctx = renderer.getContext();
        const imageData = new ImageData(imageArray, dim.width, dim.height);
        ctx.putImageData(imageData,0,0);
        
    }
}
