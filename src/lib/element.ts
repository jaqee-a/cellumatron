import { Color } from "./color";

interface Rule {
    offsetX: number;
    offsetY: number;
    expect: number; // ID
};

interface RuleAction {
    updateOffsetX: number;
    updateOffsetY: number;
    updateWith: number; // ID
}
interface RuleCluster {
    rules: Array<Rule>;
    actions: Array<RuleAction>;
} 

export interface Element {
    id?: number;
    name: string;
    color: Color;
    ruleClusters: Array<RuleCluster>;
};


export enum ElementType {
    AIR,
    CUSTOM,
    ANY
}


const Sand: Element = {
    name: "Sand",
    color: Color.fromRGB(218, 224, 38),
    ruleClusters: [
        {
            rules: [
                {
                    offsetX: 0,
                    offsetY: 1,
                    expect: ElementType.AIR,
                }
            ],
            actions: [
                {
                    updateOffsetX: 0,
                    updateOffsetY: 1,
                    updateWith: 1
                },
                {
                    updateOffsetX: 0,
                    updateOffsetY: 0,
                    updateWith: 0
                }
            ]
        },
        {
            rules: [
                {
                    offsetX: 1,
                    offsetY: 1,
                    expect: 0,
                }
            ],
            actions: [
                {
                    updateOffsetX: 1,
                    updateOffsetY: 1,
                    updateWith: 1
                },
                {
                    updateOffsetX: 0,
                    updateOffsetY: 0,
                    updateWith: 0
                }
            ]
        },
        {
            rules: [
                {
                    offsetX: -1,
                    offsetY: 1,
                    expect: 0
                }
            ],
            actions: [
                {
                    updateOffsetX: -1,
                    updateOffsetY: 1,
                    updateWith: 1
                },
                {
                    updateOffsetX: 0,
                    updateOffsetY: 0,
                    updateWith: 0
                }
            ]
        }
    ]
};

const Air: Element = {
    name: "Air",
    color: Color.fromRGB(255, 255, 255),
    ruleClusters: []
};



const CUSTOM_ELEMENTS: Array<Element> = new Array<Element>();

export function registerNewElement(element: Element): void {
    element.id = CUSTOM_ELEMENTS.length;
    CUSTOM_ELEMENTS.push(element);
}

export function getElementById(id: number): Element {
    return CUSTOM_ELEMENTS[id];
}


// Register default elements
registerNewElement(Air);
registerNewElement(Sand);
