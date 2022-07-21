import {API_ROUTE} from '../../config'

const CapFirstLetter = (string) => string.length > 0 ? String(string).replace(String(string)[0], String(string)[0].toUpperCase()) : ''

export const LargeBlogCard = ({href = '', tags, id, content, images, timestamp, authur, title}) => {
    return (
        <div className="border shadow rounded-2x mb-5 overflow-0">
            <div className = 'blog-img bg-secondary'>

            </div>
            <div className = 'p-4'>
                <div className="row a-i-c j-c-space-between">
                    <div className="col-auto">
                        <div className="rounded-2x theme-bg text-white one-line p-3">{CapFirstLetter(tags[0])}</div>
                    </div>
                    <div className="col-auto py-3">
                        <div className = 'text-muted'>{new Date(timestamp).toDateString()}</div>
                    </div>
                </div>
                <div className = 'mt-4'>
                    <h2 className = 'bold double-line'>{CapFirstLetter(title)}</h2>
                </div>
                <div className = 'my-4'>
                    <p className = 'double-line'>
                        {CapFirstLetter(content)}
                    </p>
                </div>
                <div className="row a-i-c j-c-space-between pt-4">
                    <div className="col-auto mb-3">
                        <div className="flex-h a-i-c">
                            <div className = 'border mr-3 shadow rounded-circle authur-img'></div>
                            <span>By: {CapFirstLetter(authur)}</span>
                        </div>
                    </div>
                    <div className="col-auto mb-3 py-3">
                        <a href = {href} className="rounded-2x text-primary border border-primary px-4 py-3">Read More</a>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .authur-img{
                    width: 65px;
                    height: 65px;
                    background-size: cover;
                    background-position: center;
                    background-image: url(/assets/images/demos/demo-21/logo.png)
                }
                .blog-img{
                    height: 250px;
                    background-size: cover;
                    background-position: center;
                    background-image: url(${API_ROUTE.blog_images}/${id}/${images[0]})
                }
            `}</style>
        </div>
    )
}

export const SmallBlogCard = ({title, id, content, tags, images, timestamp}) => {
    return (
        <div onClick = {() => window.location = `/blog/${id}`} className = 'rounded-2x mb-5 overflow-0 border shadow cursor-pointer'>
            <div className = 'row m-0'>
                <div className="col-md-4 col-sm-12 px-0 border-md-right-border-bottom">
                    <div>
                        <div className = 'blog-image bg-secondary' style = {{maxWwidth: '200px', height: '200px'}}></div>
                    </div>
                </div>
                <div className="col-md p-0 col-sm-12">
                    <div className="p-4">
                        <div className="row a-i-c j-c-space-between">
                            <div className="col-auto">
                                <div className="rounded-2x theme-bg text-white one-line p-3 text-capitalize">{typeof tags === 'object' ? tags[0] : ''}</div>
                            </div>
                            <div className="col-auto">
                                <div className = 'text-muted'>{new Date(timestamp).toDateString()}</div>
                            </div>
                        </div>
                        <div className = 'mt-4'>
                            <h2 className = 'bold double-line text-capitalize'>{title}</h2>
                        </div>
                        <div className = 'my-3'>
                            <p className = 'double-line text-capitalize'>
                                {content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .border-md-right-border-bottom{
                    border-bottom: 1px solid #dee2e6 !important;
                }
                @media screen and (min-width: 768px){
                    .border-md-right-border-bottom{
                        border-right: 1px solid #dee2e6 !important;
                    }
                }
                .blog-image{
                    background-size: cover;
                    background-position: center;
                    background-image: url(${API_ROUTE.blog_images}/${id}/${images[0]});
                }
            `}</style>
        </div>
    )
}