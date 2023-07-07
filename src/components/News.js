import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import PropTypes from 'prop-types'


export class News extends Component {
    
   constructor(){
          super();
          this.state = {
            articles: [], 
            loading: false,
            page:1
                       }
                }   

     async updateNews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5f8154f0f836441bb6bc182b920be7b3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState  ({
                        articles : parsedData.articles,
                        totalResults: parsedData.totalResults,
                        loading:false
                      })

     }
      async  componentDidMount(){
        // console.log("cdm"); // cdm means componentDidMount.
          this.updateNews()
        }
            
        handlePrevClick = async ()=> {
            //  console.log("Previous")
                  this.setState({page: this.state.page - 1});
                  this.updateNews();
                                       }
        handleNextClick = async ()=> {
           // console.log("Next");
                  this.setState({page: this.state.page + 1});
                  this.updateNews();
                                      }
          
  render() {
       return (
              <div className="container my-5" >
              <h1 className='text-center' >NewsUpdate - Top Headlines</h1>
                      {this.state.loading && <Spinner/>}
              
              <div className="row my-5">
                {!this.state.loading && this.state.articles.map((element)=>{

                     return   <div className="col-md-4" key={element.url}>
                     <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,70):""} imageUrl={element.urlToImage} 
                      newsUrl={element.url}author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
        })}
         </div>    
         
               <div className="container d-flex justify-content-between my-3" >
                
               <button  disabled={this.state.page<=1} type="button" className="btn btn-dark btn-lg" onClick={this.handlePrevClick}> &larr; Previous</button>    
               <button  disabled ={this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)} type="button" className="btn btn-dark btn-lg" onClick={this.handleNextClick}>Next &rarr;</button>
                 
                </div>     
      
      </div>
)
    }
  } 

export default News
     //(using this. in onClick Because we are using class based component )
    
     
