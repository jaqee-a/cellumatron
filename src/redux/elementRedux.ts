import { createSlice } from "@reduxjs/toolkit";
import { getAllElements } from "../lib/element";




const elementRedux = createSlice({
    name: "elements",
    initialState: {
        elements: getAllElements()
    },
    reducers: {
        updateElements: (state, _) => {
            state.elements = getAllElements();
        }
    }
});



export default elementRedux.reducer;
