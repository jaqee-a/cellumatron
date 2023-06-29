



export abstract class Tool {
    public abstract use(): void;
    public abstract setOption(key: string, value: any): void;
    public abstract getOption(key: string): any;
}
