import React, { Component } from 'react';
import './Message.css';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    }           
}
  
  render (){
    const {service, content } = this.props

    return (
        <div className={ service === this.props.messageFromServise   ? 'messageContainer myMwssage':  'messageContainer' }>
            <div className="messageContent">{content}</div>
        </div>
        )
    }
}

export default Message;