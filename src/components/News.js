import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {          
        country: 'in',             
        pageSize: 8,
        category: 'general'
    }

    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)    //which means pickup the string on on no. and convert to uppercase
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }

    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=40f62fe28b9b4706b9c9a5302f0aa149&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        this.props.setProgress(30)
        let parseddata = await data.json()
        this.props.setProgress(70)
        // console.log(parseddata)
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults
        })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews()
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=40f62fe28b9b4706b9c9a5302f0aa149&page=1&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url)
        // let parseddata = await data.json()
        // // console.log(parseddata)
        // this.setState({ articles: parseddata.articles,totalResults:parseddata.totalResults })
    }

    // handlePrevClick = async () => {
    //     // console.log("previous Button")
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=40f62fe28b9b4706b9c9a5302f0aa149&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // let data = await fetch(url)
    //     // let parseddata = await data.json()
    //     // console.log(parseddata)
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews()
    //     // articles: parseddata.articles

    // }

    // handleNextClick = async () => {
    //     // console.log("Next Button")
    //     // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    //     // }
    //     // else {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=40f62fe28b9b4706b9c9a5302f0aa149&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     //     let data = await fetch(url)
    //     //     let parseddata = await data.json()
    //     //     console.log(parseddata)
    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articles: parseddata.articles
    //     //     })
    //     // }
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews()

    // }

     fetchMoreData = async() => {
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=40f62fe28b9b4706b9c9a5302f0aa149&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        let parseddata = await data.json()
        // console.log(parseddata)
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            totalResults: parseddata.totalResults
        })
      };

    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: '40px 0px', marginTop: '90px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="container">
                    <div className='row'>
                        {this.state.articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
