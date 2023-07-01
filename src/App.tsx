import { styled } from "styled-components";
import { Canvas } from "./components/Canvas";
import { ElementManager } from "./components/ElementManager";
import { ElementPicker } from "./components/ElementPicker";
import { getAllElements, Element } from "./lib/element";
import { useDispatch } from "react-redux";
import { overrideAllElements } from "./redux/elementRedux";

function App() {

    const dispatch = useDispatch();

    const handleLocalStorageSave = () => {
        const value = localStorage.getItem('elements');
        if(value !== null){
            if(confirm('Some values are already saved do you want to override them ? ')){
                const allElements: Array<Element> = getAllElements();
                localStorage.setItem('elements', JSON.stringify(allElements));
            }
        }
    }

    const handleLocalStorageLoad = () => {
        const value = localStorage.getItem('elements');
        if(value !== null){
            const allElements: Array<Element> = JSON.parse(value);
            dispatch(overrideAllElements(allElements));
        }
    }

    return (
        <div>
            <AppContainer>
                <div>
                    <Canvas width={1000} height={1000}/>
                    <ElementPicker />
                </div>
                <ElementManager />
            </AppContainer>
            <button onClick={handleLocalStorageSave}>Save to local storage</button>
            <button onClick={handleLocalStorageLoad}>Load from local storage</button>
        </div>
    );
}



const AppContainer = styled.div`
    display: flex;
`;

export default App
