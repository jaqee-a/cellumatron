import { Position } from "./utils";





export class MouseInput {
    private static MOUSE_BUTTONS : [boolean, boolean, boolean] = [false, false, false]; 
    private static MOUSE_POSITION: Position = {x: 0, y: 0};

    static get position(): Position {
        return MouseInput.MOUSE_POSITION;
    }

    public static setPosition(x: number, y: number): void {
        MouseInput.MOUSE_POSITION.x = x;
        MouseInput.MOUSE_POSITION.y = y;
    }

    public static getButton(button: 0 | 1 | 2): boolean {
        return MouseInput.MOUSE_BUTTONS[button];
    }

    public static setButton(button: 0 | 1 | 2, value: boolean): void {
        MouseInput.MOUSE_BUTTONS[button] = value;
    }

    public static clearInput(): void {
        this.MOUSE_BUTTONS.fill(false);
    }
}
