import { Color } from "./color";



export interface Element {
    color: Color;
}

export const Sand: Element = {
    color: Color.fromRGB(15, 200, 150)
}

export const Air: Element = {
    color: Color.fromRGB(255, 255, 255)
}
