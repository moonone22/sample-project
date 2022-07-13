import { atom } from "recoil";


export const isDarkAtom = atom({
    key:"isDark",
    default: false,
})
//atom 함수는 두가지의 속성을 요구한다. key와 default 