
import { BaseSyntheticEvent } from "react";
import { styled } from "styled-components";
import { RuleCluster } from "../lib/element";

interface ActionProps {
    clusters: Array<RuleCluster>;
    clusterIndex: number;
    actionIndex: number;
    setRuleClusters: Function;
}


export function Action({clusters, clusterIndex, actionIndex, setRuleClusters}: ActionProps) {

    const handleOnOffsetXUpdate = (e: BaseSyntheticEvent) => {
        clusters[clusterIndex].actions[actionIndex].updateOffsetX = +e.target.value;
        setRuleClusters([...clusters]);
    }

    const handleOnOffsetYUpdate = (e: BaseSyntheticEvent) => {
        clusters[clusterIndex].actions[actionIndex].updateOffsetY = +e.target.value;
        setRuleClusters([...clusters]);
    }

    const handleOnUpdateWithUpdate = (e: BaseSyntheticEvent) => {
        clusters[clusterIndex].actions[actionIndex].updateWith = +e.target.value;
        setRuleClusters([...clusters]);
    }
    return (
        <ActionContainer>
            <InputContainer>
                <label>Offset X</label>
                <input type="number" onChange={handleOnOffsetXUpdate} value={
                    clusters[clusterIndex].actions[actionIndex].updateOffsetX } />
            </InputContainer>

            <InputContainer>
                <label>Offset Y</label>
                <input type="number" onChange={handleOnOffsetYUpdate} value={
                    clusters[clusterIndex].actions[actionIndex].updateOffsetY } />
            </InputContainer>

            <InputContainer>
                <label>Update with</label>
                <input type="number" onChange={handleOnUpdateWithUpdate} value={
                    clusters[clusterIndex].actions[actionIndex].updateWith }/>
            </InputContainer>
        </ActionContainer>
    );
}


const InputContainer = styled.div``;

const ActionContainer = styled.div``;
