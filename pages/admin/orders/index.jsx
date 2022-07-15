import AdminPageTemplate from '../../../components/Admin/Page/AdminPageTemplate'
import {Search} from '../../../components/svg/SVGIcons'
import {useState, useEffect} from 'react'
import {API_ROUTE} from '../../../config'

const CapFirstLetter = (string) => string.length > 0 ? String(string).replace(String(string)[0], String(string)[0].toUpperCase()) : ''

export default () => {
    const [ordersListRoot, setOrdersListRoot] = useState([])
    const [ordersList, setOrdersList] = useState([])
    const [tableStates, setTableStates] = useState({
        timestamp_order: 'newest',
        category: 'name',
        query: '',
        status: ''
    })

    useEffect(async () => {
        const req = await fetch(`${API_ROUTE.admin_all_orders}`)
        const {data} = await req.json()
        
        setOrdersListRoot(data)
        setOrdersList(data)
    }, [])

    useEffect(() => {
        const list = (
            ordersListRoot.filter(
                (ordersList) => (
                    (tableStates.query !== '')
                    ? new RegExp(tableStates.query, 'i').test((
                        (tableStates.category !== 'name')
                        ? ordersList[tableStates.category]
                        : `${ordersList.f_name} ${ordersList.l_name}`
                    ))
                    : true
                )
            ).filter(
                ({status}) => (
                    (tableStates.status !== '')
                    ? tableStates.status === status
                    : true
                )
            )
        )
        
        setOrdersList(
            (tableStates.timestamp_order === 'oldest')
            ? list.reverse()
            : list
        )
    }, [tableStates])

    return (
        <AdminPageTemplate>
            <div>
                <div className = "row mb-3">
                    <div className = "col-xs-12 col-lg-6 mb-3">
                        <p className="mb-2">Search customer {tableStates.category}</p>
                        <div style = {{minHeight: '50px'}} className = "px-3 mb-2 flex-1 rounded-1x bg-white flex-h a-i-c shadow-sm">
                            <Search />
                            <input value = {tableStates.query} onChange = {(e) => setTableStates({...tableStates, query: e.target.value})} placeholder = "Search here..." className = "border-0 p-3 flex-1 bg-clear flex-1 ml-2 outline-0 h-100" />
                            <select value = {tableStates.category} onChange = {(e) => setTableStates({...tableStates, category: e.target.value})} className = "d-inline-block border-0 p-3 text-capitalize outline-0">
                                <option value = "name">name</option>
                                <option value = "email">email</option>
                                <option value = "phone">phone</option>
                                <option value = "address">address</option>
                            </select>
                        </div>
                    </div>
                    <div className = "col-xs-12 col-lg-3 mb-3">
                        <p className="mb-2">Status</p>
                        <div style = {{minHeight: '50px'}} className = "p-1 mb-2 flex-1 overflow-0 rounded-1x bg-white flex-h a-i-c shadow-sm">
                            <select value = {tableStates.status} onChange = {(e) => setTableStates({...tableStates, status: e.target.value})} className = "d-inline-block border-0 p-3 w-100 text-capitalize outline-0">
                                <option value = "">all</option>
                                <option value = "processing">processing</option>
                                <option value = "in_transit">in transit</option>
                                <option value = "delivered">delivered</option>
                            </select>
                        </div>
                    </div>
                    <div className = "col-xs-12 col-lg-3 mb-3">
                        <p className="mb-2">Timestamp</p>
                        <div style = {{minHeight: '50px'}} className = "p-1 mb-2 flex-1 overflow-0 rounded-1x bg-white flex-h a-i-c shadow-sm">
                            <select value = {tableStates.timestamp_order} onChange = {(e) => setTableStates({...tableStates, timestamp_order: e.target.value})} className = "d-inline-block border-0 p-3 w-100 text-capitalize outline-0">
                                <option value = "newest">newest</option>
                                <option value = "oldest">oldest</option>
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
                            <th className = 'py-4'>customer name</th>
                            <th className = 'py-4'>email</th>
                            <th className = 'py-4'>phone</th>
                            <th className = 'py-4'>address</th>
                            <th className = 'py-4'>status</th>
                            <th className = 'py-4'>timestamp</th>
                            <th className = 'py-4'>
                                <span className="bi bi-box-arrow-up-right theme-color"></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{(
                        (ordersList.length > 0)
                        ? (
                            ordersList.map(
                                ({id, f_name, l_name, status, email, phone, address, timestamp}, index) => (
                                    <tr key = {index}>
                                        <td className = 'py-4'>{++index}</td>
                                        <td className = 'py-4'>{CapFirstLetter(f_name)} {CapFirstLetter(l_name)}</td>
                                        <td className = 'py-4'>{email}</td>
                                        <td className = 'py-4'>{phone}</td>
                                        <td className = 'py-4'>{CapFirstLetter(address)}</td>
                                        <td className = 'py-4'>{CapFirstLetter(status)}</td>
                                        <td className = 'py-4'>{new Date(timestamp).toDateString()}</td>
                                        <td className = 'py-4'>
                                            <a className = 'theme-color' href={`/admin/orders/${id}`}>See More</a>
                                        </td>
                                    </tr>
                                )
                            )
                        )
                        : (
                            <tr>
                                <td colSpan = '7'>
                                    <div className="p-5 text-center text-capitalize bold letter-spacing-1">
                                        Order list is empty!
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