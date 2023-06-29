import { styled } from "styled-components"
import { RuleCluster } from "./RuleCluster";
import { BaseSyntheticEvent, useState } from "react";
import { RuleCluster as RuleClusterStructure, registerNewElement } from "../lib/element";
import { Color } from "../lib/color";

export function Element() {
    const [name, setName] = useState<string>('New Element');
    const [color, setColor] = useState<string>('#ffffff');
    const [ruleClusters, setRuleClusters] = useState<RuleClusterStructure[]>([]);

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
        registerNewElement({ name, color: Color.fromHex(color), ruleClusters });
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
