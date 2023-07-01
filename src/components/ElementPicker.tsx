import { useDispatch, useSelector } from "react-redux"
import { Element } from "../lib/element";
import { setSelectedElement, addNewElement} from "../redux/elementRedux";
import { CellumatronState } from "../redux/store";



export function ElementPicker() {
    const allElements: Array<Element> = useSelector((state: CellumatronState) => state.elements.elements);
    const dispatch = useDispatch();

    const handleClickOnElement = (value: any) => {
        dispatch(setSelectedElement(value.id));
    }

    const handleCreateNewElement = () => {
        dispatch(addNewElement(null));
    }

    return (
        <div>
            {
                allElements.map((value: any)=><button onClick={()=>handleClickOnElement(value)}>{value.id}- {value.name}</button>)
            }
            <button onClick={handleCreateNewElement}>Create</button>
        </div>
    )
}
