import React, { Component } from 'react';
import './Message.css';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    }           
}
  
  render (){
    const {authorId, content, userId} = this.props

    return (
        <div className={ authorId === userId     ? 'messageContainer myMwssage':  'messageContainer' }>
            <div className="messageContent">{content}</div>
        </div>
        )
    }
}

export default Message;