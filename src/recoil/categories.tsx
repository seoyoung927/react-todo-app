import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'todoLocal',
    storage: localStorage,
});

export interface ICategory{
    id: number,
    text:string,
}
export const CategoriesState = atom<ICategory[]>({
    key:"categories",
    default:[{id:1, text:"할일"},{id:2, text:"진행중"},{id: 3, text:"완료"}],
    effects_UNSTABLE: [persistAtom],
});