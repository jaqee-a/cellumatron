import { createSlice } from "@reduxjs/toolkit";
import { createNewElement, getAllElementsForRedux, updateElement } from "../lib/element";
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
            // @ts-ignore
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

            // @ts-ignore
            state.elements = getAllElementsForRedux();
            
        },
        setSelectedElement: (state, action) => {
            Brush.instance.setOption('selectedElement', action.payload);
            state.selectedElement = action.payload;
        }
    }
});



export const { updateElements, setSelectedElement, addNewElement } = elementRedux.actions;
export default elementRedux.reducer;
