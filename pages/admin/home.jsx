import AdminPageTemplate from '../../components/Admin/Page/AdminPageTemplate'

const urlAndTitle = [
    {url: "/admin/home", title: "Home", icon: <span className = 'fa-2x mr-3 bi bi-house-fill'></span>},
    {url: "/admin/add-product", title: "Add Product", icon: <span className = 'fa-2x mr-3 bi bi-calendar-plus-fill'></span>},
    {url: "/admin/all-products", title: "All Products", icon: <span className = 'fa-2x mr-3 bi bi-collection'></span>},
    {url: "/admin/orders", title: "Orders", icon: <span className = 'fa-2x mr-3 bi bi-receipt-cutoff'></span>},
    {url: "/admin/payments", title: "Payments", icon: <span className = 'fa-2x mr-3 bi bi-credit-card-2-back-fill'></span>},
    {url: "/admin/logout", title: "Logout", icon: <span className = 'fa-2x mr-3 bi bi-door-open-fill'></span>},
]

export default () => {
    return (
        <AdminPageTemplate>
            <div className="row py-5">{
                urlAndTitle.map(({url, title, icon}, key) => (
                    <div key = {key} className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-5">
                        <a href = {url} className="bg-white text-muted border shadow d-block rounded-1x w-100 px-4 py-5">
                            <div className="row a-i-c">
                                <div className="col-auto">
                                    {icon}
                                </div>
                                <div className = 'text-capitalize bold'>
                                    {title}
                                    <span className="bi bi-box-arrow-up-right ml-3"></span>
                                </div>
                            </div>
                        </a>
                    </div>
                ))
            }</div>
        </AdminPageTemplate>
    )
}

export async function getServerSideProps(context){
    const {req: {cookies}} = context
    const cookie = cookies['OLLYMANN_FARMS_ADMIN'] || undefined

    if(!cookie){
        return {
            redirect: {
                destination: '/admin/login'
            }
        }
    }

    return {
        props: {
            adminData: cookie ? JSON.parse(cookie) : null,
            isLoggedIn: cookie && JSON.parse(cookie).id ? true : false,
        }
    }
}