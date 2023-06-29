


interface IEventHandler {
    emit(handle: string): void;
    on(handle: string, callback: Function): void;
}

type MouseMove  = "mousemove";
type MouseDown  = "mousedown"; 
type KeyDown    = "keydown";

type MouseEvent    = MouseMove | MouseDown;
type KeyboardEvent = KeyDown;

type EventHandle = MouseEvent | KeyboardEvent;

type MouseCallback    = (x: number, y: number) => void;
type KeyboardCallback = (key: string) => void;

type Callback<T> = T extends MouseEvent    ? MouseCallback    :
                   T extends KeyboardEvent ? KeyboardCallback :
                   never;

export class CustomEventHandler implements IEventHandler {

    eventMap: Map<string, Function> = new Map<string, Function>();

    on<T extends EventHandle>(handle: T, callback: Callback<T>): void {
        this.eventMap.set(handle, callback);
    }

    emit(handle: EventHandle, ...args: any): void {
        this.eventMap.get(handle)?.call(null, ...args);
    }

}
