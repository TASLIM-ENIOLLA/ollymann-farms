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

// export default ({children, title}) => {
//     return (
//         <SideBar>
//             <SideBarContext.Consumer>{
//                 ({state}) => (
//                     <section className = {`${state ? '' : 'd-none'} animated fadeIn bg-dark-lucent vh100 vw100 po-abs top-0 left-0 flex-h`} style = {{zIndex: 120}}>
//                         <SideBar mobile = {true} />
//                     </section>
//                 )
//             }</SideBarContext.Consumer>
//             <section className = 'vh100 vw100 bg-light flex-h'>
//                 <div className="h-100">
//                     <SideBar />
//                 </div>
//                 <section className = 'h-100 flex-1 overflow-y-auto'>
//                     <section className = 'po-sticky shadow col-md-d-none top-0 left-0 theme-bg' style = {{zIndex: 100}}>
//                         <div className = 'flex-h a-i-c p-4'>
//                             <SideBarContext.Consumer>{
//                                 ({state, updater}) => (
//                                     <div className = 'pr-3' onClick = {() => updater(true)}>
//                                         <span className = 'bi bi-filter-left fa-2x'></span>
//                                     </div>
//                                 )
//                             }</SideBarContext.Consumer>
//                             <div>
//                                 <span>COLONELI SIMPSONI - ADMIN</span>
//                             </div>
//                         </div>
//                     </section>
//                     <div className="p-4 p-md-5">
//                         <div className = 'py-5 py-xs-4 py-sm-4 text-capitalize'>
//                             <h1 className = 'theme-color'>{title ? title : 'Welcome Taslim'}</h1>
//                         </div>
//                         <div className = 'py-5'>
//                             {children}
//                         </div>
//                     </div>
//                 </section>
//             </section>
//             <style jsx>{`
//                 .z-index-110{
//                     z-index: 110;
//                 }
//                 .bg-dark-lucent{
//                     background: rgba(0,0,0,.6);
//                 }
//             `}</style>
//         </SideBar>
//     )
// }