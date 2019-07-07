import React, { Component, Fragment } from 'react';
import './DisplayMessages.css';
import Message from '../Message/Message'
import importMessages from '../../Apollo/Querys/importMessages'


class DisplayMessages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: 'loading',
            poolingData: null
        };
    }
    

    async componentDidMount(){
        if(this.props.userId){
        this.setState({ messages: await importMessages(this.props.userId, this.props.service)  });  
        const poolingData = setInterval(async () => {
             this.setState({ messages:await importMessages(this.props.userId, this.props.service)  });
        }, 1000);
        this.setState({ poolingData });
        }
               
       
    }

    componentWillUnmount() {
        clearInterval(this.state.poolingData)
    }
 
  render (){
    return (
        <Fragment>       
            { 
                Array.isArray(this.state.messages) ?
                    this.state.messages.map((message, index) =>
                        <Message
                            key={index}
                            content ={message.content}
                            authorId={message.authorId} >
                        </Message>) : this.state.messages 
            }         
        </Fragment>
    )
  }
}



export default DisplayMessages  ;
