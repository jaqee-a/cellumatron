import { useState } from "react";
import { styled } from "styled-components";

export function RuleActionBuilder() {

    const [] = useState();

    const size: number = 1;
    const handleClick = (index: number) => {
        const width = size*2+1;
        const [x, y] = [index%width, index/width << 0];
        
        
    }
    return (<div>
                <GridContainer>
                    {
                        [].constructor(Math.pow(size*2+1, 2)).fill(0).map((_: number, index: number) => 
                            <Block onClick={()=>handleClick(index)}/>
                        )
                    }
                </GridContainer>
            </div>);
}


const Block = styled.div`
    background-color: red;
    width: 30px;
    height: 30px;

    &:hover {
        opacity: 0.5;
    }
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
`;




