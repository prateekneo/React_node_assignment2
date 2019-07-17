import React from 'react'
import { connect } from 'react-redux'
import { handleCostFilter } from "../actions/index"

function mapDispatchToProps(dispatch) {
    return{
        handleCostFilter : (min, max) => dispatch(handleCostFilter(min, max))
    }
}

class FilterCostModalShow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            min : 0,
            max : 0
        }
    }

    handleMax = (e) =>{
        this.setState({
            max : e.target.value
        })
    }

    handleMin = (e) =>{
        this.setState({
            min : e.target.value
        })
    }

    handleSubmit = () => {
        //alert('prateek');
        this.props.handleCostFilter(this.state.min, this.state.max)
    }

    render(){
        return (
            <div class="modal" id="myModalCost">
                <div class="modal-dialog">
                    <div class="modal-content">

                    
                    <div class="modal-header">
                        <h4 class="modal-title">Filter By Cost</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    
                    <div class="modal-body">
                        <div className="form container">
                            <form>
                                <div className="row from_div">
                                    <label>Min Cost : </label>
                                    <span id="from_date"><input type="number" class="form-control" value={this.state.min} onChange={this.handleMin}/></span>
                                </div>
                                <div className="row to_div">
                                    <label>Max Cost : </label>
                                    <span id="to_date"><input type="number" class="form-control" value={this.state.max} onChange={this.handleMax}/></span>
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

const FilterCostModal = connect(null, mapDispatchToProps)(FilterCostModalShow)

export default FilterCostModal