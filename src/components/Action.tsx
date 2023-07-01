
import { BaseSyntheticEvent } from "react";
import { styled } from "styled-components";
import { RuleCluster } from "../lib/element";
import { Input } from "./Input";
// import { RuleActionBuilder } from "./RuleActionBuilder";

interface ActionProps {
    clusters: Array<RuleCluster>;
    clusterIndex: number;
    actionIndex: number;
    setRuleClusters: Function;
}


export function Action({clusters, clusterIndex, actionIndex, setRuleClusters}: ActionProps) {

    const handleOnOffsetXUpdate = (e: BaseSyntheticEvent) => {
        clusters[clusterIndex].actions[actionIndex].offsetX = +e.target.value;
        setRuleClusters([...clusters]);
    }

    const handleOnOffsetYUpdate = (e: BaseSyntheticEvent) => {
        clusters[clusterIndex].actions[actionIndex].offsetY = +e.target.value;
        setRuleClusters([...clusters]);
    }

    const handleOnUpdateWithUpdate = (e: BaseSyntheticEvent) => {
        clusters[clusterIndex].actions[actionIndex].element = +e.target.value;
        setRuleClusters([...clusters]);
    }
    return (
        <ActionContainer>
            <InputContainer>
                <label>Offset X</label>
                <Input type="number" onChange={handleOnOffsetXUpdate} value={
                    clusters[clusterIndex].actions[actionIndex].offsetX } />
            </InputContainer>

            <InputContainer>
                <label>Offset Y</label>
                <Input type="number" onChange={handleOnOffsetYUpdate} value={
                    clusters[clusterIndex].actions[actionIndex].offsetY } />
            </InputContainer>

            <InputContainer>
                <label>Update with</label>
                <Input type="number" onChange={handleOnUpdateWithUpdate} value={
                    clusters[clusterIndex].actions[actionIndex].element }/>
            </InputContainer>
        </ActionContainer>
    );
}


const InputContainer = styled.div``;

const ActionContainer = styled.div``;
