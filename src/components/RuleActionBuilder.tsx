import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { RuleAction, getElementById, Element } from "../lib/element";
import { useSelector } from "react-redux";
import { CellumatronState } from "../redux/store";

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
    const [neighbours, setNeighbours] = useState<NeighbourDict>({});

    const elementsCount = useSelector((state: CellumatronState)=>state.elements.elements).length;

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
    }, []);

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

    const handleClick = (index: number) => {
        // if(index === size*2+1+size) return;

        const [x, y] = get2dIndices(index);
        
        const newNeighbours: NeighbourDict = {...neighbours};
        newNeighbours[`${x}-${y}`].element = ( newNeighbours[`${x}-${y}`].element + 1 ) % (elementsCount + 1);
        setNeighbours(newNeighbours);

        // Fire event
        onChange(Object.values(neighbours).filter((actionRule: RuleAction) => actionRule.element !== elementsCount));
    }
    return (<div>
                <GridContainer>
                    {
                        [].constructor(Math.pow(size*2+1, 2)).fill(0).map((_: number, index: number) => { 
                            return <Block blockColor={getBlockColorByIndex(index)} onClick={()=>handleClick(index)}/>
                        })
                    }
                </GridContainer>
            </div>);
}


const Block = styled.div<{blockColor: string}>`
    background-color: ${(props)=>props.blockColor};
    width: 30px;
    height: 30px;
    border: solid 1px black;

    &:hover {
        opacity: 0.5;
    }
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
`;




