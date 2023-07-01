import { useEffect, useRef } from "react";
import { Context2DRenderer } from "../lib/context2drenderer";
import { Cellumatron } from "../lib/cellumatron";
import { styled } from "styled-components";


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
        <CanvasElement ref={canvas} width={width} height={height} />
    )
}


const CanvasElement = styled.canvas`
    width: ${(props)=>props.width}px;
    height: ${(props)=>props.height}px;
`;
