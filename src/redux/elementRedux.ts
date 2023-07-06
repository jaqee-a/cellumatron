import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { createNewElement, loadAllElements, getAllElementsForRedux, updateElement, RuleCluster } from "../lib/element";
import { Color } from "../lib/color";
import { Brush } from "../lib/tools/brush";

export interface ElementRedux {
    id: number;
    name: string;
    color: string;
}

export interface ElementReduxInitialState {
    elements: Array<ElementRedux>;
    selectedElement: number;
};

interface UpdateElementPayloadAction {
    id: number;
    name: string;
    color: string;
    ruleClusters: Array<RuleCluster>;
};

const elementRedux = createSlice<ElementReduxInitialState, SliceCaseReducers<ElementReduxInitialState>>({
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
        updateElements: (state, action: PayloadAction<UpdateElementPayloadAction>) => {
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
