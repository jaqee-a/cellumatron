import { styled } from "styled-components";
import { BiDuplicate, BiTrash } from 'react-icons/bi';
import { RuleAction, RuleCluster as RuleClusterStructure } from "../lib/element";
import { RuleActionBuilder } from "./RuleActionBuilder";
import { DragEventHandler } from "react";

interface RuleClusterProps {
    index: number;
    elementId: number;
    clusters: Array<RuleClusterStructure>;
    setRuleClusters: Function;
    deleteClusterCallback: Function;
    duplicateClusterCallback: Function;
    onDragStart: DragEventHandler;
    onDragEnd: DragEventHandler;
};

export function RuleCluster({onDragEnd, onDragStart, deleteClusterCallback, duplicateClusterCallback, elementId, index, clusters, setRuleClusters}: RuleClusterProps) {

    const handleRulesUpdate = (rules: Array<RuleAction>) => {
        const newClusters = structuredClone(clusters);
        newClusters[index].rules = rules;
        setRuleClusters(newClusters)
    }

    const handleActionsUpdate = (actions: Array<RuleAction>) => {
        const newClusters = structuredClone(clusters);
        newClusters[index].actions = actions;
        setRuleClusters(newClusters)
    }

    return (
        <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <ClusterOptionsContainer>
                <OptionButton onClick={()=>{deleteClusterCallback(index)}}>
                    <BiTrash size={24}/>
                </OptionButton>
                <OptionButton onClick={()=>{duplicateClusterCallback(index)}}>
                    <BiDuplicate size={24} />
                </OptionButton>
            </ClusterOptionsContainer>
            <ClusterContainer>
                <RulesContainer>
                    <RuleActionBuilder elementId={elementId} actionRules={clusters[index].rules} onChange={handleRulesUpdate}/>
                </RulesContainer>
                <ActionsContainer>
                    <RuleActionBuilder actionRules={clusters[index].actions} onChange={handleActionsUpdate}/>
                </ActionsContainer>
            </ClusterContainer>
        </div>
    );
}

const OptionButton = styled.button`
    border-radius: 10px;
    padding-inline: 2rem;
    padding-block: 0.2rem;
    background-color: #e1e1e1;
    border-style: none;
    margin-block: 12px;
    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }
`;

const ClusterOptionsContainer = styled.div`
    background-color: #a1a1a1;
    width: fit-content;
    border-radius: 1rem 1rem 0 0;
    padding-inline: 1rem;
    display: flex;
    gap: 0.5rem;
`;

const ClusterContainer = styled.div`
    display: flex;
    gap: 1rem;
    background-color: #a1a1a1;
    padding: 1rem;
    border-radius: 0 1rem 1rem 1rem;
`;

const RulesContainer   = styled.div``;
const ActionsContainer = styled.div``;
