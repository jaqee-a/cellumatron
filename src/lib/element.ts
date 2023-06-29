import { Color } from "./color";

interface Rule {
    offsetX: number;
    offsetY: number;
    expect: ElementType;
};

interface RuleAction {
    updateOffsetX: number;
    updateOffsetY: number;
    updateWith: ElementType;
}
interface RuleCluster {
    rules: Array<Rule>;
    actions: Array<RuleAction>;
} 

export interface Element {
    color: Color;
    ruleClusters: Array<RuleCluster>;
};


export enum ElementType {
    SAND,
    AIR
}


const Sand: Element = {
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
                    updateWith: ElementType.SAND
                },
                {
                    updateOffsetX: 0,
                    updateOffsetY: 0,
                    updateWith: ElementType.AIR
                }
            ]
        },
        {
            rules: [
                {
                    offsetX: 1,
                    offsetY: 1,
                    expect: ElementType.AIR,
                }
            ],
            actions: [
                {
                    updateOffsetX: 1,
                    updateOffsetY: 1,
                    updateWith: ElementType.SAND
                },
                {
                    updateOffsetX: 0,
                    updateOffsetY: 0,
                    updateWith: ElementType.AIR
                }
            ]
        },
        {
            rules: [
                {
                    offsetX: -1,
                    offsetY: 1,
                    expect: ElementType.AIR,
                }
            ],
            actions: [
                {
                    updateOffsetX: -1,
                    updateOffsetY: 1,
                    updateWith: ElementType.SAND
                },
                {
                    updateOffsetX: 0,
                    updateOffsetY: 0,
                    updateWith: ElementType.AIR
                }
            ]
        }
    ]
};

const Air: Element = {
    color: Color.fromRGB(255, 255, 255),
    ruleClusters: []
};



export function getElementFromType(type: ElementType): Element {
    switch(type) {
        case ElementType.SAND:return Sand;
        case ElementType.AIR:return Air
    }
}
