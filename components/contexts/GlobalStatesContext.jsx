import {createContext} from 'react'

export const GlobalStatesContext = createContext()

export default ({children, value}) => {
    return (
        <GlobalStatesContext.Provider value =  {value}>
            {children}
        </GlobalStatesContext.Provider>
    )
}