import { useDispatch, useSelector } from "react-redux"
import { setSelectedElement, addNewElement, ElementRedux} from "../redux/elementRedux";
import { CellumatronState } from "../redux/store";
import { styled } from "styled-components";
import { useState } from "react";



export function ElementPicker() {
    const [selected, setSelected] = useState<number>(0);
    const allElements: Array<ElementRedux> = useSelector((state: CellumatronState) => state.elements.elements);
    const dispatch = useDispatch();

    const handleClickOnElement = (value: ElementRedux, index: number) => {
        setSelected(index);
        dispatch(setSelectedElement(value.id));
    }

    const handleCreateNewElement = () => {
        dispatch(addNewElement(null));
    }

    return (
        <ElementPickerContainer>
            {
                allElements.map((value: ElementRedux, index: number)=>
                    <ElementButton key={value.id} selected={selected === index} element={value} onClick={()=>handleClickOnElement(value, index)} />)
            }
            <button onClick={handleCreateNewElement}>Create</button>
        </ElementPickerContainer>
    )
}

const ElementPickerContainer = styled.div`
    display: flex;
    gap: 1rem;
`;




interface ElementButtonProps {
    onClick: Function;
    element: ElementRedux;
    selected: boolean;
}


function ElementButton({onClick, element, selected}: ElementButtonProps) {
    return (
        <ButtonContainer selected={selected} onClick={()=>onClick()}>
            <ButtonContent>
                <ColorDisplay color={element.color} />
                <LabelDisplay>{element.name}</LabelDisplay>
            </ButtonContent>
        </ButtonContainer>
    );
}

const ButtonContainer = styled.button<{selected: boolean}>`
    background-color: ${(props)=>props.selected?'#e1e1e1':'#a1a1a1'};
    border-radius: 10px;
    border: none;
    padding: 0.3rem;
    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`;
const ButtonContent   = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;
const LabelDisplay    = styled.div`
    font-weight: bold;
`;
const ColorDisplay    = styled.div<{color: string}>`
    background-color: ${(props)=>props.color};
    width:50px;
    height: 50px;
    border-radius: 50%;
`;
