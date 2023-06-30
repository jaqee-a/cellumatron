import { createSlice } from "@reduxjs/toolkit";
import { createNewElement, loadAllElements, getAllElementsForRedux, updateElement } from "../lib/element";
import { Color } from "../lib/color";
import { Brush } from "../lib/tools/brush";


const elementRedux = createSlice({
    name: "elements",
    initialState: {
        elements: getAllElementsForRedux(),
        selectedElement: Brush.instance.getOption('selectedElement')
    },
    reducers: {
        addNewElement: (state, _) => {
            createNewElement();
            state.elements = getAllElementsForRedux();
        },
        updateElements: (state, action) => {
            updateElement(
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    color: Color.fromHex(action.payload.color),
                    ruleClusters: action.payload.ruleClusters
                }
            );

            state.elements = getAllElementsForRedux();
            
        },
        overrideAllElements: (state, action) => {
            loadAllElements(action.payload);
            state.elements = getAllElementsForRedux();
        },
        setSelectedElement: (state, action) => {
            Brush.instance.setOption('selectedElement', action.payload);
            state.selectedElement = action.payload;
        }
    }
});



export const { updateElements, setSelectedElement, addNewElement, overrideAllElements } = elementRedux.actions;
export default elementRedux.reducer;
