export const LargeBlogCard = () => {
    return (
        <div className="border shadow rounded-2x mb-5 overflow-0">
            <div className = 'blog-img bg-secondary'>

            </div>
            <div className = 'p-4'>
                <div className="row a-i-c j-c-space-between">
                    <div className="col-auto">
                        <div className="rounded-2x theme-bg text-white one-line p-3">SEO Optimization</div>
                    </div>
                    <div className="col-auto">
                        <div className = 'text-muted'>6 June, 2022</div>
                    </div>
                </div>
                <div className = 'mt-4'>
                    <h2 className = 'bold double-line'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, tenetur.</h2>
                </div>
                <div className = 'my-4'>
                    <p className = 'double-line'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt delectus architecto tempore repudiandae mollitia pariatur quis quia a quibusdam fugiat?
                    </p>
                </div>
                <div className="row a-i-c j-c-space-between pt-4">
                    <div className="col-auto mb-3">
                        <div className="flex-h a-i-c">
                            <div className = 'border mr-3 shadow rounded-circle' style = {{width: '65px', height: '65px'}}></div>
                            <span>By: Taslim Eniolla</span>
                        </div>
                    </div>
                    <div className="col-auto mb-3">
                        <div className="rounded-2x text-primary border border-primary px-4 py-3">Read More</div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .blog-img{
                    height: 250px;
                }
            `}</style>
        </div>
    )
}

export const SmallBlogCard = () => {
    return (
        <div className = 'rounded-2x mb-5 overflow-0 border shadow'>
            <div className = 'row m-0'>
                <div className="col-md-4 col-sm-12 px-0">
                    <div>
                        <div className = 'bg-secondary rounded-2x shadow' style = {{maxWwidth: '200px', height: '200px'}}></div>
                    </div>
                </div>
                <div className="col-md p-0 col-sm-12">
                    <div className="p-4">
                        <div className="row a-i-c j-c-space-between">
                            <div className="col-auto">
                                <div className="rounded-2x theme-bg text-white one-line p-3">SEO Optimization</div>
                            </div>
                            <div className="col-auto">
                                <div className = 'text-muted'>6 June, 2022</div>
                            </div>
                        </div>
                        <div className = 'mt-4'>
                            <h2 className = 'bold double-line'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, tenetur.</h2>
                        </div>
                        <div className = 'my-3'>
                            <p className = 'double-line'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt delectus architecto tempore repudiandae mollitia pariatur quis quia a quibusdam fugiat?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}