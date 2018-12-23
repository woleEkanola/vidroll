import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import YouTube from 'react-youtube'


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
        <div >
          <div className="tips">x</div>
      <YouTube
      videoId= 'HRBpG553PAE'  
        opts={opts}
        onReady={this._onReady}
      />
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}