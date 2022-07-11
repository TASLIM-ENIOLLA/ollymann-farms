import AdminDash from '../../components/Page/AdminDash';
import {useEffect, useState, useRef} from 'react'
import {server} from '../../config'
import currency from '../../components/currency'

const CheckBox = ({onClick = () => true, onChange, className, ...props}) => {
    const [checked, setChecked] = useState(false)
    const input = useRef()

    return (
        <>
            <span onClick = {() => input.current.click()} className={`bi bi-check-square${checked ? '-fill text-primary' : ''} fo-s-16px ${className}`} {...props}></span>
            <input ref = {input} onClick = {onClick} type="checkbox" hidden = {true} onChange = {(e) => 
                {setChecked(e.target.checked)
                onChange(e)
            }} />
        </>
    )
}

export default () => {
    const [productsListRoot, setProductsListRoot] = useState([])
    const [productsList, setProductsList] = useState([])
    const [tableStates, setTableStates] = useState({
        name: '',
        category: '',

    })

    useEffect(async() => {
        const req = await fetch(`${server.backend.url}/php/processes/admin/products.php`)
        const {data} = await req.json()

        setProductsListRoot(data)
        setProductsList(data)
        // console.log(data)
    }, [])

    return (
        <AdminDash title = 'all products'>
            <div className = 'row'>
                <div className="col-lg-4 mb-4">
                    <span className = 'd-block text-muted letter-spacing-1 pb-2'>Search</span>
                    <div className="bg-white shadow-sm rounded-1x overflow-0 border">
                        <input type="text" className = 'px-3 py-4 outline-0 d-block w-100 border-0' placeholder = 'Search here...' />
                    </div>
                </div>
                <div className="col-lg-3 mb-4">
                    <span className = 'd-block text-muted letter-spacing-1 pb-2'>Title</span>
                    <div className="bg-white shadow-sm rounded-1x overflow-0 border">
                        <select className = 'px-3 py-4 text-capitalize outline-0 d-block w-100 border-0'>
                            <option value="name">name</option>
                            <option value="category">category</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-3 mb-4">
                    <span className = 'd-block text-muted letter-spacing-1 pb-2'>Category</span>
                    <div className="bg-white shadow-sm rounded-1x overflow-0 border">
                        <select className = 'px-3 py-4 text-capitalize outline-0 d-block w-100 border-0'>
                            <option value="">---</option>
                            <option value="clothes">clothes</option>
                            <option value="shoes">shoes</option>
                            <option value="accessories">accessories</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-2 mb-4">
                    <span className = 'd-block text-muted letter-spacing-1 pb-2'>Gender</span>
                    <div className="bg-white shadow-sm rounded-1x overflow-0 border">
                        <select className = 'px-3 py-4 text-capitalize outline-0 d-block w-100 border-0'>
                            <option value="">---</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className = 'pt-3'>
                <p>Showing {productsList.length} of {productsList.length} products</p>
            </div>
            <div>
                <div className="table-responsive border rounded-1x">
                    <table className="table text-center m-0 table-hover table-bordered table-striped rounded-1x overflow-0">
                        <thead className = 'bg-light border-bottom'>
                            <tr className = 'text-capitalize'>
                                <th className = 'py-4'>S/N</th>
                                <th className = 'py-4'>name</th>
                                <th className = 'py-4'>category</th>
                                <th className = 'py-4'>quantity</th>
                                <th className = 'py-4'>price</th>
                                <th className = 'py-4'>gender</th>
                                <th className = 'py-4'>date</th>
                            </tr>
                        </thead>
                        <tbody>{
                            productsList.map(({id, name, category, gender, price, quantity, timestamp}, index) => (
                                <tr key = {index} className = 'text-capitalize'>
                                    <td className = 'py-4'>
                                        <CheckBox className = 'text-muted' />
                                    </td>
                                    <td className = 'py-4'>
                                        <a className = 'underline theme-color' href={`/admin/product/${id}`}>{name}</a>
                                    </td>
                                    <td className = 'py-4'>{category}</td>
                                    <td className = 'py-4'>{new Intl.NumberFormat().format(quantity)} units</td>
                                    <td className = 'py-4'>{currency}{new Intl.NumberFormat().format(price)}</td>
                                    <td className = 'py-4'>{gender}</td>
                                    <td className = 'py-4'>{timestamp}</td>
                                </tr>
                            ))
                        }</tbody>
                    </table>
                </div>
            </div>
            <style jsx>{`
                th, td{
                    border: 0 !important;
                }
            `}</style>
        </AdminDash>
    )
}