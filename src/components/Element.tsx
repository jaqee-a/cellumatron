import { styled } from "styled-components"
import { RuleCluster } from "./RuleCluster";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { RuleCluster as RuleClusterStructure, getElementById } from "../lib/element";
import { useDispatch, useSelector } from "react-redux";
import { updateElements } from "../redux/elementRedux";

export function Element() {
    const [name, setName] = useState<string>('New Element');
    const [id  , setId] = useState<number>(0);
    const [color, setColor] = useState<string>('#ffffff');
    const [ruleClusters, setRuleClusters] = useState<RuleClusterStructure[]>([]);

    const dispatch = useDispatch();
    const selectedID = useSelector(state=> {
        // @ts-ignore
        return state.elements.selectedElement;
    });

    useEffect(()=>{
         const element = getElementById(selectedID);
        setId(element.id);
        setName(element.name);
        setColor(element.color.hex);
        setRuleClusters(element.ruleClusters);
    }, [selectedID]);
    
    

    const handleNameChange = (value: BaseSyntheticEvent) => {
        setName(value.target.value);
    }
    const handleColorChange = (value: BaseSyntheticEvent) => {
        setColor(value.target.value);
    }

    const handleAddNewCluster = () => {
        const newClusters = structuredClone(ruleClusters);
        newClusters.push({actions: [], rules: []});
        setRuleClusters(newClusters);
    }

    const handleSave = () => {
        dispatch(updateElements({ id, name, color, ruleClusters }));
    }

    return (
            <ElementContainer>
                <MetaInput>
                    <label>Name</label>
                    <input type="text" value={name} onChange={handleNameChange}/>
                    <label>Color</label>
                    <input type="color" value={color} onChange={handleColorChange}/> 
                </MetaInput>
                <RulesContainer>
                    {
                        ruleClusters.map((_, index) => 
                                <RuleCluster index={index} clusters={ruleClusters} setRuleClusters={setRuleClusters} /> )
                    }
                </RulesContainer>
                <button onClick={handleAddNewCluster}>Add new Cluster</button>
                <button onClick={handleSave}>Save</button>
            </ElementContainer>
    );
}


const RulesContainer = styled.div`

`;

const MetaInput = styled.div`
    display: flex;
    flex-direction: column;
`;

const ElementContainer = styled.div`
`;