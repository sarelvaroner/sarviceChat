import React, { Component, Fragment }from 'react';
import './Dashboard.css'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endChatModalClass: 'close',
            service:false
        }           
    }
    
    inputNameHandler = (e) =>  this.setState({ userName: e.target.value });
    inputIdHandler   = (e) =>  this.setState({ _id: e.target.value });
    handleChangeChk  = ( ) =>  this.setState({ service : !this.state.service });



    endChatHandler = () =>  {
        this.setState({ endChatModalClass : ''  });
  
    }
    render() {




        return (
            <Fragment>
                <div className={`Dashboard  ${this.props.openNewconversation ? 'close' :'' }  `}>
                <div className={this.state.endChatModalClass}>Thank you for using our service chat have a nice day</div>
                    <h1> Welcome to the sevice chat please insert your name.</h1>
                    <div className={'inputContainer'}>
                        <textarea onChange={this.inputNameHandler} className="inputField" placeholder={'your name:'}></textarea>
                        <textarea onChange={this.inputIdHandler}   className="inputField" placeholder={'to open exsist conversation insert user id:'}></textarea>
                    </div>
                    <div className={'btnContainer'}>
                        <button onClick={() => this.props.openChatClicked( this.state.userName, this.state._id, this.state.service )} className="connectBtn">open</button>                                            
                        <button className='endChatBtn' onClick={()=> this.props.endChatclicked() }>end conversation</button>     
                        <div className={'serviceChe  ckboxContainer'}><input type="checkbox"  onChange={this.handleChangeChk} />service </div>
                    </div>
                </div>
            </Fragment>
                
        )
    }
}


