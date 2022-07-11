import {createContext, useState} from 'react'
import {useRouter} from 'next/router'
import URL from '../../data/URL'

export const SideBarContext = createContext({
    state: undefined,
    updater: () => true
})

export default ({children}) => {
    const {route} = useRouter()
    const [sideBarState, setSideBarState] = useState(false)

    return (
        <SideBarContext.Provider value = {{state: sideBarState, updater: setSideBarState}}>
            {children}
            <div className = {`po-fixed animated fadeIn bg-dark-lucent vh100 pr-5 z-index-10000 vw100 top-0 left-0 ${sideBarState ? '' : 'd-none'}`}>
                <div className = 'h-100 w-100 bg-material-dark max-width-350px animated slideInLeft'>
                    <div className="px-3 py-5">
                        <div className = 'py-3'>
                            <div onClick = {() => setSideBarState(false)} style = {{width: '50px', height: '50px'}} className = 'flex-h a-i-c j-c-c border ml-auto rounded'>
                                <span className = 'bi bi-x fa-3x text-white'></span>
                            </div>
                        </div>
                        <div className="py-5">{
                            URL.map(
                                ({href, name}, index) => (
                                    <div key = {index} className="p-4 mb-3">
                                        <a href={href} className = {`text-white text-uppercase ${route === href ? 'active-link' : ''}`}>{name}</a>
                                    </div>
                                )
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .z-index-10000{
                    z-index: 10000;                    
                }
                .bg-dark-lucent{
                    background: rgba(0,0,0,.6)
                }
                .max-width-350px{
                    max-width: 350px;
                }
                .bg-material-dark{
                    background: #333;
                }
                .active-link{
                    color: #c96 !important;
                }
            `}</style>
        </SideBarContext.Provider>
    )
}