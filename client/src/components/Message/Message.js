import React from 'react';
import './Message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myMessageClass: this.props.myMessageClass ? 'messageContainer myMwssage' : 'messageContainer',
      messageInfoClass: this.props.myMessageClass ?'messageInfo mymessageInfo' : 'messageInfo'
    };
    
  }
  render (){
    return (
        <div className={this.state.myMessageClass}>
            <div className={this.state.messageInfoClass}>
                <div className="messageAuthor">
                  {this.props.author}
                </div>
                {this.props.date}
            </div>
            <div className="messageContent">{this.props.content}
            </div>
        </div>
        )
    }
}

export default Message;