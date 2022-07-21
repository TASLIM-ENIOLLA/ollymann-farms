import {createContext, useContext, useEffect, useRef, useState} from 'react'

export const FloatingSearchFieldContext = createContext()

export default () => {
    const [searchPane, setSearchPane] = useContext(FloatingSearchFieldContext)
    const [searchContent, setSearchContent] = useState('')
    const searchContentRef = useRef()

    useEffect(() => {
        if(searchPane){
            searchContentRef.current.focus()
        }
    })

    return (
        <div style = {{zIndex: 100000000}} className={`${searchPane ? '' : 'd-none'} animated slideInDown po-fixed top-0 left-0 p-5 w-100`}>
            <div className="col-lg-6 mx-auto">
                <form onSubmit = {(e) => {
                    e.preventDefault()
                    
                    searchContent.length > 0
                        ? window.location = `/shop?name=${searchContent}`
                        : undefined
                }} className = 'rounded-2x shadow border flex-h a-i-c overflow-0 bg-white'>
                    <div className="flex-1">
                        <input ref = {searchContentRef} value = {searchContent} onChange = {(e) => setSearchContent(e.target.value)} type="text" placeholder = 'Search for a product...' className = 'border-0 bg-clear outline-0 d-block w-100 py-4 px-4'/>
                    </div>
                    <div className = 'px-2' onClick = {() => setSearchPane(false)}>
                        <span className="bi mr-2 bi-x fo-s-22 text-muted"></span>
                    </div>
                    <button type = 'submit' className = 'px-4 bg-clear border-0' onClick = {() => searchContent.length > 0 ? window.location = `/shop?name=${searchContent}` : undefined}>
                        <span className="bi mr-2 bi-search fo-s-22 theme-color"></span>
                    </button>
                </form>
            </div>
        </div>
    )
}