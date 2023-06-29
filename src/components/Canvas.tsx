import { useEffect, useRef } from "react";
import { Context2DRenderer } from "../lib/context2drenderer";
import { Cellumatron } from "../lib/cellumatron";


interface CanvasProps {
    width: number;
    height: number;
};


export function Canvas({width, height}: CanvasProps) {
    const canvas = useRef(null);

    useEffect(()=>{
        const canvasElement: HTMLCanvasElement = canvas.current!;
        const ctx = canvasElement.getContext('2d');
        if(ctx) 
            Context2DRenderer.fromContext(ctx, {
                width, height
            });
        
        new Cellumatron();
    });
    
    return (
        <canvas ref={canvas} width={width} height={height} />
    )
}
