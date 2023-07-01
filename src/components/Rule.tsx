import { BaseSyntheticEvent } from "react";
import { styled } from "styled-components";
import { RuleCluster } from "../lib/element";
import { Input } from "./Input";

interface RuleProps {
    clusters: Array<RuleCluster>;
    clusterIndex: number;
    ruleIndex: number;
    setRuleClusters: Function;
}


export function Rule({clusters, clusterIndex, ruleIndex, setRuleClusters}: RuleProps) {

    const handleOnOffsetXUpdate = (e: BaseSyntheticEvent) => {
        clusters[clusterIndex].rules[ruleIndex].offsetX = +e.target.value;
        setRuleClusters([...clusters]);
    }

    const handleOnOffsetYUpdate = (e: BaseSyntheticEvent) => {
        clusters[clusterIndex].rules[ruleIndex].offsetY = +e.target.value;
        setRuleClusters([...clusters]);
    }

    const handleOnExpectUpdate = (e: BaseSyntheticEvent) => {
        clusters[clusterIndex].rules[ruleIndex].element = +e.target.value;
        setRuleClusters([...clusters]);
    }
    return (
        <RuleContainer>
            <InputContainer>
                <label>Offset X</label>
                <Input type="number" onChange={handleOnOffsetXUpdate} value={
                    clusters[clusterIndex].rules[ruleIndex].offsetX } />
            </InputContainer>

            <InputContainer>
                <label>Offset Y</label>
                <Input type="number" onChange={handleOnOffsetYUpdate} value={
                    clusters[clusterIndex].rules[ruleIndex].offsetY } />
            </InputContainer>

            <InputContainer>
                <label>Expect</label>
                <Input type="number" onChange={handleOnExpectUpdate} value={
                    clusters[clusterIndex].rules[ruleIndex].element }/>
            </InputContainer>
        </RuleContainer>
    );
}


const InputContainer = styled.div``;

const RuleContainer = styled.div``;
