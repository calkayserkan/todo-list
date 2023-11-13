import {store} from "../store";
import { openModal , closeModal , isOpenFalse , isOpenTrue} from "../features/modal/modal";



export const modal = (name,data=false)=>{
    store.dispatch(isOpenTrue())
    store.dispatch(openModal({
        name,
        data
    }))
}

export const modalClose = ()=>{
    store.dispatch(closeModal())
    store.dispatch(isOpenFalse())
}