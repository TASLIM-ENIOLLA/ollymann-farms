import {createContext, useState} from 'react'

const SideBarContext = createContext({
    state: null,
    updater: () => true
})

export default ({children, mobile = false}) => {
    const [sideBarState, setSideBarState] = useState(false)

    return (
        <SideBarContext.Provider value = {{state: sideBarState, updater: setSideBarState}}>
            <>
                {children}
            </>
            <>
                <section className = {`h-100 bg-white min-width-300px ${mobile ? 'animated slideInLeft' : 'col-d-none'} overflow-y-auto col-md-d-block shadow`}>
                    <div className = 'p-3'>
                        <div className = 'py-4 flex-h a-i-c j-c-space-between'>
                            <img className = 'd-block' src="/assets/images/demos/demo-21/logo-name.png" width = '130' />{(
                                (mobile)
                                ? (
                                    <span className = 'bi bi-x fa-2x p-3' onClick = {() => {
                                        setSideBarState(false)
                                    }}></span>
                                )
                                : <></>
                            )}
                        </div>
                        <div className = 'px-0 py-5'>
                            <a href="/admin" className = 'flex-h w-100 px-3 a-i-c py-4 mb-4 letter-spacing-1 text-capitalize text-muted'>
                                <span className = 'pr-3 bi bi-house-heart-fill fo-s-18'></span>
                                <span>Home</span>
                            </a>
                            <a href="/admin/all-products" className = 'flex-h w-100 px-3 a-i-c py-4 mb-4 letter-spacing-1 text-capitalize text-muted'>
                                <span className = 'pr-3 bi bi-grid-1x2-fill fo-s-18'></span>
                                <span>all products</span>
                            </a>
                            <a href="/admin/add-product" className = 'flex-h w-100 px-3 a-i-c py-4 mb-4 letter-spacing-1 text-capitalize text-muted'>
                                <span className = 'pr-3 bi bi-plus-square-fill fo-s-18'></span>
                                <span>add product</span>
                            </a>
                            <a href="/admin/category" className = 'flex-h w-100 px-3 a-i-c py-4 mb-4 letter-spacing-1 text-capitalize text-muted'>
                                <span className = 'pr-3 bi bi-hdd-stack-fill fo-s-18'></span>
                                <span>category</span>
                            </a>
                            <a href="/admin/logout" className = 'flex-h w-100 px-3 a-i-c py-4 mb-4 letter-spacing-1 text-capitalize text-muted'>
                                <span className = 'pr-3 bi bi-door-open-fill fo-s-18'></span>
                                <span>logout</span>
                            </a>
                        </div>
                    </div>
                    <style jsx>{`
                        .min-width-300px{
                            min-width: 300px;
                        }
                    `}</style>
                </section>
            </>
        </SideBarContext.Provider>
    )
}
