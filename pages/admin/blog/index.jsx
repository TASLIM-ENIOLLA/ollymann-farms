import AdminPageTemplate from '../../../components/Admin/Page/AdminPageTemplate'
import {API_ROUTE} from '../../../config'
import {useState, useEffect} from 'react'
import {Search} from '../../../components/svg/SVGIcons'
import {SmallBlogCard} from '../../../components/Blog'

export default () => {
    const [postsListMain, setPostsListMain] = useState([])
    const [postsList, setPostsList] = useState([])
    const [tableStates, setTableStates] = useState({
        category: '',
        which: 'title',
        name: '',
    })

    useEffect(async () => {
        const req = await fetch(API_ROUTE.admin_get_blog_posts)
        const {data} = await req.json()

        setPostsList(data)
        setPostsListMain(data)
    }, [])

    return (
        <AdminPageTemplate>
            <div className="mt-4 mb-5">
                <a href = './blog/create-new-post' className = 'py-4 px-5 theme-bg text-white bold letter-spacing-1 text-capitalize border-0 rounded-1x shadow mb-5'>create new post</a>
            </div>
            <div>
                <div className = "row mb-3">
                    <div className = "col-xs-12 col-lg-9 mb-3">
                        <p className="mb-2">Search {tableStates.which}</p>
                        <div style = {{minHeight: '50px'}} className = "px-3 mb-2 flex-1 rounded-1x bg-white flex-h a-i-c shadow-sm">
                            <Search />
                            <input value = {tableStates.name} onChange = {(e) => setTableStates({...tableStates, name: e.target.value})} placeholder = "Search here..." className = "border-0 p-3 flex-1 bg-clear ml-2 outline-0 h-100" />
                            <select value = {tableStates.which} onChange = {(e) => setTableStates({...tableStates, which: e.target.value})} className="p-3 text-capitalize border-0 outline-0">
                                <option value="title">title</option>
                                <option value="content">content</option>
                            </select>
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
            <div className="my-5 row">{(
                (postsList.length > 0)
                ? postsList.map((props, key) => (
                    <div key = {key} className="col-md-12 col-lg-8 col-xl-6 col-sm-12">
                        <SmallBlogCard {...props} />    
                    </div>
                ))
                : (
                    <div className="col-12">
                        <div className="py-5 bold letter-spacing-1 text-c text-muted border rounded-1x">
                            <div><span className="bi bi-exclamation-square-fill fa-2x"></span></div>
                            <div>No post created. Click <a className = 'theme-color underline' href="./blog/create-new-post">here</a> to create new post.</div>
                        </div>
                    </div>
                )
            )}</div>
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