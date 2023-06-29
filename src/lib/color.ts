export type HexCode   = string;
export type ColorType = HexCode; 



// TODO: Add alpha value
export class Color {

    r: number = 0;
    g: number = 0;
    b: number = 0;
    hex: HexCode = '#000000';

    constructor() {}

    public static fromRGB(r: number,
                          g: number,
                          b: number): Color {
        const color: Color = new Color();
        color.hex = 
            `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        color.r = r;
        color.g = g;
        color.b = b;
        return color;
    }

    // TODFO: Add conversion from hex to rgb
    public static fromHex(hex: string): Color {
        const color: Color = new Color();
        color.hex = hex;
        return color;
    }
}
