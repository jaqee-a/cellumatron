import { BaseSyntheticEvent } from "react";
import { styled } from "styled-components";
import { RuleCluster } from "../lib/element";

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
        clusters[clusterIndex].rules[ruleIndex].expect = +e.target.value;
        setRuleClusters([...clusters]);
    }
    return (
        <RuleContainer>
            <InputContainer>
                <label>Offset X</label>
                <input type="number" onChange={handleOnOffsetXUpdate} value={
                    clusters[clusterIndex].rules[ruleIndex].offsetX } />
            </InputContainer>

            <InputContainer>
                <label>Offset Y</label>
                <input type="number" onChange={handleOnOffsetYUpdate} value={
                    clusters[clusterIndex].rules[ruleIndex].offsetY } />
            </InputContainer>

            <InputContainer>
                <label>Expect</label>
                <input type="number" onChange={handleOnExpectUpdate} value={
                    clusters[clusterIndex].rules[ruleIndex].expect }/>
            </InputContainer>
        </RuleContainer>
    );
}


const InputContainer = styled.div``;

const RuleContainer = styled.div``;
