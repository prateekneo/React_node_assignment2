import React from 'react'
import { connect } from 'react-redux'
import { handleDateFilter } from "../actions/index"

function mapDispatchToProps(dispatch) {
    return{
        handleDateFilter : (from_date, to_date) => dispatch(handleDateFilter(from_date, to_date))
    }
}

class FilterModalShow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            from_date : 'mm/dd/yyyy',
            to_date : 'mm/dd/yyyy'
        }
    }

    handleFromDate = (e) =>{
        this.setState({
            from_date : e.target.value
        })
    }

    handleToDate = (e) =>{
        this.setState({
            to_date : e.target.value
        })
    }

    handleSubmit = () => {
        alert('prateek');
        this.props.handleDateFilter(this.state.from_date, this.state.to_date)
    }

    render(){
        return (
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                    
                    <div class="modal-header">
                        <h4 class="modal-title">Filter By Dates</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    
                    <div class="modal-body">
                        <div className="form container">
                            <form>
                                <div className="row from_div">
                                    <label>From Date : </label>
                                    <span id="from_date"><input type="date" class="form-control" value={this.state.form_date} onChange={this.handleFromDate}/></span>
                                </div>
                                <div className="row to_div">
                                    <label>To Date : </label>
                                    <span id="to_date"><input type="date" class="form-control" value={this.state.to_date} onChange={this.handleToDate}/></span>
                                </div>
                                <div className="row">
                                    <input type="button" className="btn btn-primary" value="Submit" data-dismiss="modal" onClick={this.handleSubmit} />
                                </div>
                            </form>
                        </div>
                    </div>

                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                    </div>
                </div>
            </div>
        )
    }
}

const FilterModal = connect(null, mapDispatchToProps)(FilterModalShow)

export default FilterModal