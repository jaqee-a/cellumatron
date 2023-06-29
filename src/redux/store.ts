import { configureStore } from "@reduxjs/toolkit";
import elementRedux from "./elementRedux";


export const store = configureStore({
    reducer: {
        elements: elementRedux
    }
});
