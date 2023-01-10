import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'todoLocal',
    storage: localStorage,
});

export interface IToDo {
    id: number;
    text: string;
    category: string;
}

export const TodosState = atom<IToDo[]>({
    key:"todos",
    default:[],
    effects_UNSTABLE: [persistAtom],
});