import AdminPageTemplate from '../../../components/Admin/Page/AdminPageTemplate'
import {API_ROUTE} from '../../../config'
import {useState, useEffect} from 'react'
import currency from '../../../components/currency'
import {Search} from '../../../components/svg/SVGIcons'

export default () => {
    const [productsListRoot, setProductsListRoot] = useState([])
    const [productsList, setProductsList] = useState([])
    const [tableStates, setTableStates] = useState({
        category: '',
        name: '',
    })

    useEffect(async () => {
        const req = await fetch(`${API_ROUTE.admin_all_products}`)
        const {data} = await req.json()
        
        setProductsListRoot(data)
        setProductsList(data)
    }, [])

    useEffect(() => {
        setProductsList(
            productsListRoot.filter(
                ({name}) => (
                    (tableStates.name !== '')
                    ? new RegExp(tableStates.name, 'i').test(name)
                    : true
                )
            ).filter(
                ({category}) => (
                    (tableStates.category !== '')
                    ? tableStates.category === category
                    : true
                )
            )
        )
    }, [tableStates])

    return (
        <AdminPageTemplate>
            <div>
                <div className = "row mb-3">
                    <div className = "col-xs-12 col-lg-9 mb-3">
                        <p className="mb-2">Search name</p>
                        <div style = {{minHeight: '50px'}} className = "px-3 mb-2 flex-1 rounded-1x bg-white flex-h a-i-c shadow-sm">
                            <Search />
                            <input value = {tableStates.name} onChange = {(e) => setTableStates({...tableStates, name: e.target.value})} placeholder = "Search here..." className = "border-0 p-3 flex-1 bg-clear ml-2 outline-0 h-100" />
                        </div>
                    </div>
                    <div className = "col-xs-12 col-lg-3 mb-3">
                        <p className="mb-2">Category</p>
                        <div style = {{minHeight: '50px'}} className = "p-1 overflow-0 mb-2 flex-1 rounded-1x bg-white flex-h a-i-c shadow-sm">
                            <select value = {tableStates.category} onChange = {(e) => setTableStates({...tableStates, category: e.target.value})} className = "d-inline-block border-0 p-3 w-100 text-capitalize outline-0">
                                <option value = "">all</option>
                                <option value = "veges">veges</option>
                                <option value = "fruits">fruits</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive border rounded-1x mt-5">
                <table className="table table-striped table-hover m-0 text-c">
                    <thead className = 'bg-white text-capitalize'>
                        <tr>
                            <th className = 'py-4'>S/N</th>
                            <th className = 'py-4'>name</th>
                            <th className = 'py-4'>category</th>
                            <th className = 'py-4'>quantity</th>
                            <th className = 'py-4'>sold</th>
                            <th className = 'py-4'>price</th>
                            <th className = 'py-4'>date</th>
                            <th className = 'py-4'>
                                <span className="bi bi-box-arrow-up-right theme-color"></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{(
                        (productsList.length > 0)
                        ? (
                            productsList.map(({id, name, category, measure, sold, price, quantity, timestamp}, index) => (
                                <tr key = {index} className = 'text-capitalize'>
                                    <td className = 'py-4'>
                                        {++index}
                                        {/* <CheckBox className = 'text-muted' /> */}
                                    </td>
                                    <td className = 'py-4'>{name}</td>
                                    <td className = 'py-4'>{category}</td>
                                    <td className = 'py-4'>{new Intl.NumberFormat().format(quantity)} unit{quantity > 1 ? 's' : ''}</td>
                                    <td className = 'py-4'>{new Intl.NumberFormat().format(sold)} unit{sold > 1 ? 's' : ''}</td>
                                    <td className = 'py-4'>{currency}{new Intl.NumberFormat().format(price)} / {measure}</td>
                                    <td className = 'py-4'>{timestamp}</td>
                                    <td className = 'py-4'>
                                        <a className = 'theme-color' href={`/admin/all-products/${id}`}>See More</a>
                                    </td>
                                </tr>
                            ))
                        )
                        : (
                            <tr>
                                <td colSpan = '8'>
                                    <div className="p-5 text-center text-capitalize bold letter-spacing-1">
                                        Product list is empty!
                                    </div>
                                </td>
                            </tr>
                        )
                    )}</tbody>
                </table>
            </div>
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