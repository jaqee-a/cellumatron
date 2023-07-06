import { styled } from "styled-components"
import { RuleCluster } from "./RuleCluster";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { RuleCluster as RuleClusterStructure, getElementById } from "../lib/element";
import { useDispatch, useSelector } from "react-redux";
import { updateElements } from "../redux/elementRedux";
import { CellumatronState } from "../redux/store";
import { Collapsable } from "./Collapsable";

export function Element() {
    const [name, setName] = useState<string>('New Element');
    const [id  , setId] = useState<number>(0);
    const [color, setColor] = useState<string>('#ffffff');
    const [ruleClusters, setRuleClusters] = useState<RuleClusterStructure[]>([]);
    const [hoveredDropTargetIndex, setHoveredDropTargetIndex] = useState<number | undefined>(undefined);
    const [draggingIndex, setDraggingIndex] = useState<number | undefined>(undefined);

    const dispatch = useDispatch();
    const selectedID = useSelector((state: CellumatronState)=> {
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

    const handleDeleteCluster = (index: number) => {
        const newClusters = ruleClusters.filter((_, idx: number) => idx!==index);
        setRuleClusters(newClusters);
    }

    const handleDuplicateCluster = (index: number) => {
        const dup: RuleClusterStructure = {...ruleClusters[index]};
        const newClusters: Array<RuleClusterStructure> = [...ruleClusters, dup];
        setRuleClusters(newClusters);
    }

    const handleDropTargetEnter = (index: number) => {
        setHoveredDropTargetIndex(index);
    };
    const handleDropTargetLeave = () => {
        setHoveredDropTargetIndex(undefined);
    };
    const handleDrop = () => {
        const index: number = hoveredDropTargetIndex!;
        const clusterIndex: number = draggingIndex!;


        const cluster: RuleClusterStructure = ruleClusters[clusterIndex];
        const newClusters: Array<RuleClusterStructure> = 
            ruleClusters.filter((_: RuleClusterStructure, idx: number) => idx!==clusterIndex);

        newClusters.splice(index, 0, cluster);

        setRuleClusters(newClusters);

        setHoveredDropTargetIndex(undefined);
    };
    const handleDragOverTarget = (e: BaseSyntheticEvent) => {
        e.preventDefault();
    }
    const handleDragStart = (index: number) => {
        setDraggingIndex(index);
    }
    const handleDragEnd = () => {
        setDraggingIndex(undefined);
    }

    return (
            <ElementContainer>
                <MetaInput>
                    <label>Name</label>
                    <Input type="text" value={name} onChange={handleNameChange}/>
                    <label>Color</label>
                    <input type="color" value={color} onChange={handleColorChange}/> 
                </MetaInput>
                <Collapsable title="Rules" defaultState={'collapsed'}>
                    <RulesContainer>
                        {
                            ruleClusters.map((_, index) => 
                                <div key={index}>
                                    <DropTarget 
                                            show={draggingIndex !== undefined?1:0}
                                            onDragEnter={(_: BaseSyntheticEvent)=>handleDropTargetEnter(index)}
                                            onDragLeave={handleDropTargetLeave}
                                            onDragOver={handleDragOverTarget}
                                            onDrop={handleDrop} 
                                            draggableover={hoveredDropTargetIndex === index?1:0}/>
                                    <RuleCluster 
                                            onDragStart={(_: BaseSyntheticEvent)=>handleDragStart(index)}
                                            onDragEnd={handleDragEnd}
                                            deleteClusterCallback={handleDeleteCluster}
                                            duplicateClusterCallback={handleDuplicateCluster} 
                                            elementId={id} index={index} 
                                            clusters={ruleClusters} 
                                            setRuleClusters={setRuleClusters} />
                                </div>)
                        }
                    </RulesContainer>
                </Collapsable>
                <button onClick={handleAddNewCluster}>Add new Cluster</button>
                <button onClick={handleSave}>Save</button>
            </ElementContainer>
    );
}

const  DropTarget = styled.div<{show: number, draggableover: number}>`
    width: 100%;
    height: 1rem;
    margin-bottom: 1rem;
    border: 1px dashed ${(props)=>props.draggableover?'red':'black'};
    border-style: dashed;
    display: ${(props)=>props.show?'grid':'none'};
    place-items: center;
`;

const RulesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const MetaInput = styled.div`
    display: flex;
    flex-direction: column;
`;

const ElementContainer = styled.div`
`;

const Input = styled.input`
    border: none;
    height: 30px;
    border-radius: 10px;
    background-color: #e1e1e1;
    padding-left: 0.5rem;
`;
