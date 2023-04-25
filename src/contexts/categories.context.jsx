import { createContext, useState, useEffect } from "react";
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
import { getCategoriesAndDocument } from '../utils/firebase/firebase.utils'


export const CategoriesContext = createContext({
    categoriesMap:{},
})

export const CategoriesProvider = ({children}) => {

    useEffect(()=>{
        const getCategoriesMap = async() => {
            const categoryMap = await getCategoriesAndDocument();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[]);

    const [categoriesMap, setCategoriesMap ] = useState({});
    const value = { categoriesMap };

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}