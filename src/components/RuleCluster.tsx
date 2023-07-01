import { styled } from "styled-components";
import { RuleAction, RuleCluster as RuleClusterStructure } from "../lib/element";
import { RuleActionBuilder } from "./RuleActionBuilder";

interface RuleClusterProps {
    index: number;
    elementId: number;
    clusters: Array<RuleClusterStructure>;
    setRuleClusters: Function;
};

export function RuleCluster({elementId, index, clusters, setRuleClusters}: RuleClusterProps) {

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
        <ClusterContainer>
            <RulesContainer>
                <RuleActionBuilder elementId={elementId} actionRules={clusters[index].rules} onChange={handleRulesUpdate}/>
            </RulesContainer><br/>
            <ActionsContainer>
                <RuleActionBuilder actionRules={clusters[index].actions} onChange={handleActionsUpdate}/>
            </ActionsContainer><br/>
        </ClusterContainer>
    );
}

const ClusterContainer = styled.div``;

const RulesContainer   = styled.div``;
const ActionsContainer = styled.div``;
