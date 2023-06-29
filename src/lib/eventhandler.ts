


interface IEventHandler {
    emit(handle: string): void;
    on(handle: string, callback: Function): void;
}

type MouseMove  = "mousemove";
type MouseDown  = "mousedown"; 
type MouseUp    = "mouseup"; 
type KeyDown    = "keydown";

type MouseButtonEvent = MouseDown | MouseUp;
type MouseEvent       = MouseMove | MouseButtonEvent; 
type KeyboardEvent    = KeyDown;

type EventHandle = MouseEvent | KeyboardEvent;

type MouseCallback       = (x: number, y: number) => void;
type MouseButtonCallback = (x: number, y: number, button: number) => void;
type KeyboardCallback    = (key: string) => void;

type Callback<T> = T extends MouseMove        ? MouseCallback       :
                   T extends MouseButtonEvent ? MouseButtonCallback :
                   T extends KeyboardEvent    ? KeyboardCallback    :
                   never;

export class CustomEventHandler implements IEventHandler {

    eventMap: Map<string, Function> = new Map<string, Function>();

    on<T extends EventHandle>(handle: T, callback: Callback<T>): void {
        this.eventMap.set(handle, callback);
    }

    emit(handle: EventHandle, ...args: any): void {
        if(this.eventMap.has(handle))
        (this.eventMap.get(handle)!)(...args);
    }

}
