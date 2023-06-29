import { styled } from "styled-components";
import { Canvas } from "./components/Canvas";
import { ElementManager } from "./components/ElementManager";

function App() {
    return (
        <AppContainer>
            <Canvas width={1000} height={1000}/>
            <ElementManager />
        </AppContainer>
    );
}



const AppContainer = styled.div`
    display: flex;
`;

export default App
