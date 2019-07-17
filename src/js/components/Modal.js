import React from 'react'

class Modal extends React.Component {
    
    constructor(props){
        super(props)
    }

    render(){
        let modal_id = 'myModal' + this.props.i;
        return (
            <div class="modal fade" id={modal_id}>
            <div class="modal-dialog">
              <div class="modal-content">
          
                
                <div class="modal-header">
                  <h4 class="modal-title">Modal Heading</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
          
                
                <div class="modal-body">
                    <div className="modal_card">
                        <div className="row">
                            <img src={this.props.value.imageUrl} width="300px;" />
                        </div>
                        <div className="row">
                            {this.props.value.title}
                        </div>
                        <div className="row">
                            {this.props.value.description}
                        </div>
                        <div className="row">
                            {this.props.value.publishedDate}
                        </div>
                        <div className="row">
                            {this.props.value.cost}
                        </div>
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

export default Modal