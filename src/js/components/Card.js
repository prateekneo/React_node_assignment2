import React from "react"
import { connect } from "react-redux"
import { getData } from "../actions/index"
import { checkSearch } from "../actions/index"
import { sortByCost } from "../actions/index"
import { sortByPublishedDate } from "../actions/index"
import { showRecentSearches } from "../actions/index"
import Modal from "./Modal"
import FilterModal from "./FilterModal"
import FilterCostModal from "./CostModal"

const mapStateToProps = state => {
    return {reports : state.data,
    sortOrderCost : state.sortOrderCost,
    sortOrderPublishedDate : state.sortOrderPublishedDate,
    search : state.search
    };
}

function mapDispatchToProps(dispatch) {
    return {
      getData: () => dispatch(getData()),
      checkSearch: value => dispatch(checkSearch(value)),
      sortByCost: () => dispatch(sortByCost()),
      sortByPublishedDate: () => dispatch(sortByPublishedDate()),
      showRecentSearches: () => dispatch(showRecentSearches())
    };
  }

class MediaCard extends React.Component {

    componentDidMount(){
        this.props.getData();
        this.props.showRecentSearches()
    }

    handleSearch = () => {
       
        let val = document.getElementById('search').value;
        //alert(val);
        this.props.checkSearch(val);

    }

    handleSortByCost = () => {
        this.props.sortByCost();
    }

    handleSortByPublishedDate = () => {
        this.props.sortByPublishedDate();
    }

    applySearch = (val) => {
        document.getElementById('search').value = val;
        this.props.checkSearch(val);        
    }

    render() {

    
        return (
            <div>
                <div className="topnav">
                    <a className="active">Home</a>
                    <a onClick={this.handleSortByPublishedDate}>Sort By Published Date</a>
                    <a onClick={this.handleSortByCost}>Sort By Cost</a>
                    
                    <a href="#myModal" data-toggle="modal">Filter By Dates</a>
                    <FilterModal />
                    <a href="#myModalCost" data-toggle="modal">Filter By Cost</a>
                    <FilterCostModal />
                    
                </div>
                
                <div id="search_box" className="row container search_box">
                    <div className="row">
                        <span id="search_bar" className="container">
                            <button id="search_button" type="button" onClick={this.handleSearch}>
                                <i class="fa fa-search"></i>
                            </button>
                            <input type="text" placeholder="Search.." id='search' />
                        </span>
                    </div>
                    <div className="row">
                        <div className='recent_search'>
                            Recent :
                            {this.props.search.map((value) => {
                                return (<span className="search_element" refs={value.search}onClick={() => this.applySearch(value.search)}>{value.search}</span>)
                            })}
                        </div>
                    </div>
                </div>
                <div id="filter_box" className="filter_box collapse">
                        <div className='filter'>
                            <h2>Filter</h2>
                        </div>
                        <div className="row">
                        
                            {this.props.search.map((value) => {
                                return (<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4">{value.search}</div>)
                            })}
                        </div>
                </div>


                
            <div className="container data">
                <div className="row"> 
                {this.props.reports.map( (value, index) => {
                    let modal_id = '#myModal' + index;
                        return (
                                    <div>
                                        {(value.visible)?(<div className="card">
                                            <div className="card-body">
                                                
                                                <img src={value.imageUrl} class="img-fluid" width="300px" />
                                                
                                                <div className="info">
                                                    <h4 className="card-title">{value.title}</h4>
                                                    <p className="card-text">{value.description}</p>
                        
                                                    <div><span>Published Date : </span><span>{value.publishedDate}</span></div>
                                                    <span>Cost : </span><span>{value.cost}</span>
                                                    </div>
                                                <div className="row view_btn">
                                                 <button className="btn btn-primary" data-toggle="modal" data-target={modal_id}>View</button>
                                                 <Modal value = {value} i = {index}/>
                                                </div>
                                                
                                            </div>
                                        </div>): null}
                                    </div>
                                   
                    
                        )
                    })}
                </div>
            </div>
        </div>
        );
        
      }
    }

const Card = connect(mapStateToProps, mapDispatchToProps)(MediaCard)

export default Card