import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import YouTube from 'react-youtube'
import { Container, Row, Col } from 'reactstrap';




export default class Video extends Component {
constructor(){
    super()

    this.state={
            videoId: ''
    }
  
    }
  componentDidMount(){
 
 var that = this
   
  ipcRenderer.on('videoID', function(arg){

that.setState({videoId: arg })
console.log(that.state.videoId)
});
}

  render() {
    const opts = {
      height: '303',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        rel: 0
      }
    };

    return (
        <Container >
          <Row>
          <Col>
          <div className="tips">x</div>

      <YouTube
      videoId= '92J-3ajM0dI'  
        opts={opts}
        onReady={this._onReady}
      />
        </Col>
      </Row>
      </Container>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}