import { styled } from "styled-components";
import { Canvas } from "./components/Canvas";
import { ElementManager } from "./components/ElementManager";
import { ElementPicker } from "./components/ElementPicker";

function App() {
    return (
        <div>
            <AppContainer>
                <Canvas width={1000} height={1000}/>
                <ElementManager />
            </AppContainer>
            <ElementPicker />
        </div>
    );
}



const AppContainer = styled.div`
    display: flex;
`;

export default App
