import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props  // Array destructing
        return (
            <div className='my-4'>
                <div className="card">
                    <div style={{display:'flex',
                   justifyContent:'flex-end',
                   position:'absolute',
                   right:0}}>
                        <span className="badge rounded-pill bg-danger">{source}   {/* Source is use to define the source of the api */}
                        </span>
                    </div>
                    <img src={!imageUrl ? "https://img.etimg.com/thumb/msid-98568535,width-1070,height-580,imgsize-55992,overlay-etmarkets/photo.jpg" : imageUrl} 
                    className="card-img-top" alt="..." />  {/* Set the default image whern image is not loading*/}
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" :
                            author} on {date}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
