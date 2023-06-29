




export class KeyboardInput {
    
    private static CODE_ARRAY: Array<boolean> = new Array<boolean>(100);

    public static setCode(key: string): void {
        const code = key.charCodeAt(0);
        KeyboardInput.CODE_ARRAY[code] = true;
    }

    public static isDown(key: string): boolean {
        const code = key.charCodeAt(0);
        return KeyboardInput.CODE_ARRAY[code];
    }

    public static clearInput(): void {
        KeyboardInput.CODE_ARRAY.fill(false);
    }
}
