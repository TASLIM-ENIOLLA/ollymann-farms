import {createContext, useEffect, useState} from 'react'

export const AlertContext = createContext()

export default ({children}) => {
    const [message, setMessage] = useState()
    const [messageCount, setMessageCount] = useState(0)

    useEffect(() => setMessageCount(+messageCount + 1), [])

    return (
        <AlertContext.Provider value = {setMessage}>
            {children}
            <div className = {`${message ? '' : 'd-none'} po-fixed top-0 left-0 p-5 w-100`} style = {{zIndex: 1000000000}}>
                <div style = {{maxWidth: '500px'}} className = 'mx-auto rounded-2x bg-white p-5 shadow animated slideInDown'>
                    <p>{message || ''}</p>
                    <div className = 'mt-5 row'>
                        <div className = 'col-6 ml-auto'>
                            <button onClick = {() => setMessage()} className = 'btn d-block w-100 btn-primary text-capitalize fo-s-15 p-3'>close</button>
                        </div>
                    </div>
                </div>
            </div>
        </AlertContext.Provider>
    )
}