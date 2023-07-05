import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { RuleAction, getElementById, Element } from "../lib/element";
import { useSelector } from "react-redux";
import { CellumatronState } from "../redux/store";
import { FaRotateLeft, FaRotateRight } from "react-icons/fa6";
import { AngleType, getRotationFunction } from "../lib/utils";

type EncodedPosition = `${number}-${number}`;

interface NeighbourDict {
    [key: EncodedPosition]: RuleAction;
};

interface RuleActionBuilderProps {
    elementId?: number;
    actionRules: Array<RuleAction>;
    onChange: Function;
};


export function RuleActionBuilder({elementId, actionRules, onChange}: RuleActionBuilderProps) {
    const size: number = 1;
    const elementsCount = useSelector((state: CellumatronState)=>state.elements.elements).length;

    const [neighbours, setNeighbours] = useState<NeighbourDict>({});

    useEffect(()=>{
        const newNeighbours: NeighbourDict = {};
        for(let y=0;y<size*2+1;++y)
        for(let x=0;x<size*2+1;++x){
            newNeighbours[`${x-size}-${y-size}`] = {
                offsetX: x - size,
                offsetY: y - size,
                element: x===size&&y===size&&elementId ? elementId : elementsCount
            }
        }

        for(const actionRule of actionRules) {
            newNeighbours[`${actionRule.offsetX}-${actionRule.offsetY}`].element = actionRule.element;
        }
        
        setNeighbours(newNeighbours);
    }, [actionRules]);
    
    const get2dIndices = (index: number): [number, number] => {
        const width: number = size*2+1;
        return [index%width - size, (index/width << 0) - size];
    }

    const getBlockColorByIndex = (index: number) => {
        const [x, y]:   [number, number]   = get2dIndices(index);
        const elementID: number            = neighbours[`${x}-${y}`]?.element || 0;

        const element: Element = getElementById(elementID);
        if(element === undefined) return 'black';
        return element.color.hex;
    }


    const updateRuleActionArray = (newNeighbours: NeighbourDict) => {
        setNeighbours(newNeighbours);
        // Fire event
        const ruleActions: Array<RuleAction> = 
                Object.values(neighbours).filter((actionRule: RuleAction) => {
                    const isRule: boolean = elementId !== undefined;
                    const reject: boolean = actionRule.element === elementsCount || (isRule && 
                                                                                     actionRule.offsetX === 0 && 
                                                                                     actionRule.offsetY === 0);
                    return !reject;
                });
        onChange(ruleActions);
    }

    const handleClick = (index: number) => {
        // if(index === size*2+1+size) return;

        const [x, y] = get2dIndices(index);
        
        const newNeighbours: NeighbourDict = {...neighbours};
        newNeighbours[`${x}-${y}`].element = ( newNeighbours[`${x}-${y}`].element + 1 ) % (elementsCount + 1);

        updateRuleActionArray(newNeighbours);
        
    }

    const handleGridRotation = (deg: number) => {
        const newNeighbours: NeighbourDict = {};

        const rotate = getRotationFunction(deg, AngleType.DEGREE);
        const allNeighboursArray: Array<RuleAction> = Object.values(neighbours);
        allNeighboursArray.forEach((neighbour: RuleAction) => {
            const {x, y} = rotate(neighbour.offsetX, neighbour.offsetY);

            neighbour.offsetX = x;
            neighbour.offsetY = y;
            newNeighbours[`${x}-${y}`] = neighbour;
        });

        updateRuleActionArray(newNeighbours);
    }

    return (<BlockContainer>
                <OptionButtonContainer>
                    <OptionButton onClick={()=>handleGridRotation(-90)}>
                        <FaRotateLeft size={24} />
                    </OptionButton>
                    <OptionButton onClick={()=>handleGridRotation(90)}>
                        <FaRotateRight size={24} />
                    </OptionButton>
                </OptionButtonContainer>
                <GridContainer>
                    {
                        [].constructor(Math.pow(size*2+1, 2)).fill(0).map((_: number, index: number) => { 
                            return <Block key={index} blockcolor={getBlockColorByIndex(index)} onClick={()=>handleClick(index)}/>
                        })
                    }
                </GridContainer>
            </BlockContainer>);
}

const BlockContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const OptionButtonContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
`;

const OptionButton = styled.div`
    background-color: #e1e1e1;
    border-radius: 50%;
    width: 40px;
    aspect-ratio: 1;
    display: grid;
    place-items: center;

    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }
`;

const Block = styled.div<{blockcolor: string}>`
    background-color: ${(props)=>props.blockcolor};
    width: 30px;
    height: 30px;
    border: solid 1px black;

    &:hover {
        opacity: 0.5;
    }
`;

const GridContainer = styled.div`
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
`;




