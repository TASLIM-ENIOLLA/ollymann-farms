import {useState, useContext} from 'react'
import {useRouter} from 'next/router'
import {GlobalContext} from '../../context/GlobalContext'
import {API_ROUTE} from '../../../config'

export default ({children, title}) => {
    const {asPath, back, ...rest} = useRouter()
    const [showSideBar, setShowSideBar] = useState()
    const {globalStates: {adminData: {state: {f_name, id, profile_img}}}} = useContext(GlobalContext)

    return (
        <div className = "po-rel container-fluid bg-light text-dark">
            <div className="row vh100 vw100">
                <div id = "sideBar" className = "px-0 col-d-none col-md-d-block h-100 min-width-250px bg-white sideBarShadow">
                    <SideBar />
                </div>
                <div className="h-100 px-0 col-md">
                    <div id = "mainContent" className = "flex-v py-0 px-4 h-100">
                        <div className = 'container-fluid'>
                            <div className = "row a-i-c j-c-space-between py-5 mb-3">
                                <div className = 'mr-auto col-auto col-md-d-none'>
                                    <div style = {{width: '50px',height: '50px'}} onClick = {() => setShowSideBar(true)} className = 'flex-v a-i-c j-c-c bg-white rounded-1x shadow-sm'>
                                        <span className="bi bi-filter-left fa-2x"></span>
                                    </div>
                                </div>
                                <div className = 'ml-auto col-auto'>
                                    <div className="flex-h a-i-c">
                                        <div style = {{
                                            width: '60px',
                                            height: '60px',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundImage: `url(${API_ROUTE.admin_profile_img}/${id}/${profile_img[0]})`
                                        }} className = 'rounded-circle border shadow mr-4'></div>
                                        <div>
                                            <h4 className = 'bold letter-spacing-1'>Welcome {f_name}</h4>
                                            <h5 className = 'half-bold mb-0'>Administrator</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'container-fluid'>
                            <div className="row a-i-c pb-4">{(
                                    (asPath.split('/').length > 3)
                                    ? (
                                        <div className="col-auto">
                                            <div onClick = {() => back()} className = 'rounded-circle border bg-white flex-v a-i-c j-c-c' style = {{width: '40px', height: '40px'}}>
                                                <span className = 'bi bi-arrow-left mt-1 fa-2x bold'></span>
                                            </div>
                                        </div>
                                    )
                                    : <></>
                                )}<div className = 'col-auto'>
                                    <h3 className = 'border-bottom-thic mb-0 bold text-capitalize text-muted letter-spacing-1'>
                                        {title || String(asPath.match(/(\w+)?\-?\w+$/)[0]).replace(/-/g, ' ')}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="py-5 container-fluid flex-1 w-100 overflow-y-auto" style = {{maxWidth: '100%'}}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div style = {{background: `rgba(0, 0, 0, .5)`}} className = {`animated fadeIn po-abs hrefp-0 left-0 h-100 w-100 flex-h ${showSideBar ? '' : 'd-none'}`}>
                <div className = "animated slideInLeft h-100 min-width-250px bg-white sideBarShadow">
                    <SideBar />
                </div>
                <div className = "flex-1" onClick = {(e) => setShowSideBar(false)}></div>
            </div>
            <style jsx>{`
                .min-width-250px{
                    min-width: 250px;
                }
                .border-bottom-thick{
                    position: relative;
                }
                .border-bottom-thick:after{
                    content: '';
                    display: block;
                    width: 55%;
                    height: 9px;
                    max-width: 40px;
                    clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%);
                    background: #98c73a;
                    position: absolute;
                    bottom: -55%;
                    left: 0;
                }
            `}</style>
        </div>
    )
}

const SideBar = () => {
    const {asPath} = useRouter()
    const urlAndTitle = [
        {url: "/admin/home", title: "Home", icon: <span className = 'fa-2x mr-3 bi bi-house-fill'></span>},
        {url: "/admin/add-product", title: "Add Product", icon: <span className = 'fa-2x mr-3 bi bi-calendar-plus-fill'></span>},
        {url: "/admin/all-products", title: "All Products", icon: <span className = 'fa-2x mr-3 bi bi-collection'></span>},
        {url: "/admin/categories-and-measures", title: "Categories & Measures", icon: <span className = 'fa-2x mr-3 bi bi-receipt-cutoff'></span>},
        {url: "/admin/blog", title: "Blog", icon: <span className = 'fa-2x mr-3 bi bi-chat-square-text-fill'></span>},
        {url: "/admin/orders", title: "Orders", icon: <span className = 'fa-2x mr-3 bi bi-receipt-cutoff'></span>},
        {url: "/admin/payments", title: "Payments", icon: <span className = 'fa-2x mr-3 bi bi-credit-card-2-back-fill'></span>},
        {url: "/admin/logout", title: "Logout", icon: <span className = 'fa-2x mr-3 bi bi-door-open-fill'></span>},
    ]
    return (
        <div className = 'flex-v h-100'>
            <div className = "py-5">
                <img className = 'mx-auto' src="/assets/images/demos/demo-21/logo-name.png" width = '130' />
            </div>
            <div className = "py-3 flex-1 overflow-y-auto text-secondary">
                {
                    urlAndTitle.map(
                        ({url, icon, title}, key) => (
                            <a key = {key} href = {`${url}`} className = {`px-3 py-4-5 flex-h a-i-c ${(
                                (new RegExp(url, 'i').test(asPath))
                                ? "active-menu"
                                : ""
                            )}`}>
                                <div className = "mr-3">
                                    {icon}
                                </div>
                                <div className = "half-bold text-capitalize bold letter-spacing-1">{`${title}`}</div>
                            </a>
                        )
                    )
                }
            </div>
            <style jsx>{`
                .py-4-5{
                    padding: 2.1rem 0;
                }
                .active-menu{
                    border-left: 5px solid #60c21b;
                    background: #60c21b24;
                }
            `}</style>
        </div>
    )
}