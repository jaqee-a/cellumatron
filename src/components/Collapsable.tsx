import { ReactNode, useState } from "react";
import { styled } from "styled-components";


interface CollapsableProps {
    title: string;
    defaultState: 'collapsed' | 'expanded';
    children: ReactNode;
}


export function Collapsable({title, defaultState, children}: CollapsableProps) {
    const [state, setState] = useState<boolean>(defaultState === 'collapsed');

    const handleClick = () => {
        setState(!state);
    }

    return (<div>
                <TitleContainer>
                    <TitleLabel><CheckBox type='checkbox' onClick={handleClick} />{title}</TitleLabel>
                </TitleContainer>
                <ContentContainer collapsed={state}>
                    {children}
                </ContentContainer>
            </div>);
    
}


const TitleLabel       = styled.label`
    background-color: darkblue;
    color: white;
    height: 2rem;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    padding-left: 1rem;
`;
const CheckBox         = styled.input`
    display: none;
`;

const TitleContainer   = styled.div``;
const ContentContainer = styled.div<{collapsed: boolean}>`
    display: ${(props)=>props.collapsed ? 'none' : 'block'};
`;

