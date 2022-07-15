import SideBar, {SideBarContext} from './AdminSideBar'
export default ({children, title}) => {
    return (
        <>
            <section className = 'vh100 vw100 flex-h'>
                <SideBar />
                <div className="flex-1 flex-v">
                    <div className = 'flex-h px-5 py-4 d-none a-i-c'>
                        <div>
                            <span className = 'bi bi-filter-left fo-s-22'></span>
                        </div>
                    </div>
                    <div className = 'overflow-y-auto p-5 flex-1'>
                        <div className = 'pt-4 pb-5'>
                            <h2 className = 'theme-color text-capitalize'>{title ? title : 'Welcome Taslim'}</h2>
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}