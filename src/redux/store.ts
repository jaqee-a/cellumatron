import { configureStore } from "@reduxjs/toolkit";
import elementRedux, { ElementReduxInitialState } from "./elementRedux";

export interface CellumatronState {
    elements: ElementReduxInitialState;
};

export const store = configureStore<CellumatronState>({
    reducer: {
        elements: elementRedux
    }
});
