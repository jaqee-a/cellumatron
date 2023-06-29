import { ColorType } from "./color";
import { Dimention } from "./utils";

interface RendererOptions {
    width: number;
    height: number;
};


export class Context2DRenderer {

    public static instance: Context2DRenderer;

    constructor(
        private context: CanvasRenderingContext2D, 
        private options: RendererOptions = {width: 1000, height: 1000}) {
        if(Context2DRenderer.instance === null){
            alert('A renderer instance already exists');
            return;
        }

        Context2DRenderer.instance = this;
    }

    public static fromContext(context: CanvasRenderingContext2D, options?: RendererOptions): Context2DRenderer {
        return new Context2DRenderer(context, options);
    }

    public getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    public getDimentions(): Dimention {
        return {...this.options};
    } 

    public clear(color: ColorType): void {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.options.width, this.options.height);
    }

    public drawRect(x: number, y: number, w: number, h: number): void {
        this.context.fillRect(x, y, w, h);
    }

    public setFillColor(color: ColorType): void {
        this.context.fillStyle = color;
    }

    public getImageData(): ImageData {
        return this.context.getImageData(0, 0, this.options.width, this.options.height);
    }

    public getImageArray(): Uint8ClampedArray {
        return this.getImageData().data;
    }
}
