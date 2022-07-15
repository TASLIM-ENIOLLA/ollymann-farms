import {createContext, useEffect} from 'react'

export const GlobalContext = createContext()

export default ({children, globalStates}) => {
    
    return (
        <GlobalContext.Provider value = {{globalStates}}>
            {children}
        </GlobalContext.Provider>
    )
}