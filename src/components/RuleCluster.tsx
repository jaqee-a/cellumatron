import { styled } from "styled-components";
import { RuleCluster as RuleClusterStructure } from "../lib/element";
import { Rule } from "./Rule";
import { Action } from "./Action";

interface RuleClusterProps {
    index: number;
    clusters: Array<RuleClusterStructure>;
    setRuleClusters: Function;
};

export function RuleCluster({index, clusters, setRuleClusters}: RuleClusterProps) {

    const handleAddNewRule = () => {
        const newClusters = structuredClone(clusters);
        newClusters[index].rules.push({ offsetX: 0, offsetY: 0, expect: 0 });
        setRuleClusters(newClusters);
    }

    const handleAddNewAction = () => {
        const newClusters = structuredClone(clusters);
        newClusters[index].actions.push({ updateOffsetX: 0, updateOffsetY: 0, updateWith: 0 });
        setRuleClusters(newClusters);
    }

    return (
        <ClusterContainer>
            <RulesContainer>
                { clusters[index].rules.map((_, ruleIndex) => <Rule clusters={clusters} clusterIndex={index} ruleIndex={ruleIndex} setRuleClusters={setRuleClusters}/>) }
            </RulesContainer>
            <button onClick={handleAddNewRule}>Add new Rule</button>
            <ActionsContainer>
                { clusters[index].actions.map((_, actionIndex) => <Action clusters={clusters} clusterIndex={index} actionIndex={actionIndex} setRuleClusters={setRuleClusters}/>) }
            </ActionsContainer>
            <button onClick={handleAddNewAction}>Add new Action</button>
        </ClusterContainer>
    );
}

const ClusterContainer = styled.div``;

const RulesContainer   = styled.div``;
const ActionsContainer = styled.div``;
