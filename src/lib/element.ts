import { ElementRedux } from "../redux/elementRedux";
import { Color } from "./color";

export interface RuleAction {
    offsetX: number;
    offsetY: number;
    element: number; // ID
};

export interface RuleCluster {
    rules: Array<RuleAction>;
    actions: Array<RuleAction>;
} 

export interface Element {
    id: number;
    name: string;
    color: Color;
    ruleClusters: Array<RuleCluster>;
};

const Sand: Element = {
    id: 1,
    name: "Sand",
    color: Color.fromRGB(218, 224, 38),
    ruleClusters: [
        {
            rules: [
                {
                    offsetX: 0,
                    offsetY: 1,
                    element: 0,
                }
            ],
            actions: [
                {
                    offsetX: 0,
                    offsetY: 1,
                    element: 1
                },
                {
                    offsetX: 0,
                    offsetY: 0,
                    element: 0
                }
            ]
        },
        {
            rules: [
                {
                    offsetX: 1,
                    offsetY: 1,
                    element: 0,
                }
            ],
            actions: [
                {
                    offsetX: 1,
                    offsetY: 1,
                    element: 1
                },
                {
                    offsetX: 0,
                    offsetY: 0,
                    element: 0
                }
            ]
        },
        {
            rules: [
                {
                    offsetX: -1,
                    offsetY: 1,
                    element: 0
                }
            ],
            actions: [
                {
                    offsetX: -1,
                    offsetY: 1,
                    element: 1
                },
                {
                    offsetX: 0,
                    offsetY: 0,
                    element: 0
                }
            ]
        }
    ]
};

const Air: Element = {
    id: 0,
    name: "Air",
    color: Color.fromRGB(255, 255, 255),
    ruleClusters: []
};



const CUSTOM_ELEMENTS: Array<Element> = new Array<Element>();

export function createNewElement() {
    const element: Element = {
        id: CUSTOM_ELEMENTS.length,
        name: "New Element",
        color: Color.fromRGB(0, 0, 0),
        ruleClusters: []
    };

    registerNewElement(element);
}

export function updateElement(element: Element): void {
    CUSTOM_ELEMENTS[element.id] = element;
}

export function registerNewElement(element: Element): void {
    CUSTOM_ELEMENTS.push(element);
}

export function getAllElements(): Array<Element> {
    return CUSTOM_ELEMENTS;
}

export function loadAllElements(elements: Array<Element>): void {
    CUSTOM_ELEMENTS.length = elements.length;
    for(let i=0;i<elements.length;++i) {
        CUSTOM_ELEMENTS[i] = elements[i];
    }
}

export function getAllElementsForRedux(): Array<ElementRedux> {
    return CUSTOM_ELEMENTS.map((value: Element)=>{

        const res: {id: number, name: string, color: string} = {
            id: value.id!,
            name: value.name,
            color: value.color.hex
        };

        return res;
    });
}

export function getElementById(id: number): Element {
    return CUSTOM_ELEMENTS[id];
}


// Register default elements
registerNewElement(Air);
registerNewElement(Sand);
