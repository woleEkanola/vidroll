import { clipboard, ipcRenderer, remote } from 'electron';
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

class GH extends React.Component {


  constructor(){
    super()

    this.state={
      youtube: "Copy a video link and press C'trl + 1 ",
      videoId: ''
    }
  
    }
  componentDidMount(){
 
 var that = this
   
  ipcRenderer.on('ping', function(arg){
 var text = clipboard.readText()
that.setState({youtube: text })
console.log(that.state.youtube)
});
}

playVideo(){


   let url = this.state.youtube;
   let videoID = this.state.videoId;
var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
if(videoid != null) {
   this.setState({videoId: videoid[1] });




  const modalPath = path.join('file://', __dirname, './video.html')
  var video = new BrowserWindow({ width: 400, height: 320, frame: false, show: false, alwaysOnTop: true, y: 10, x: 10, })
  video.on('close', function () { win = null })
  video.loadURL(modalPath)
  video.once('ready-to-show', () => {
  video.show()
  ipcRenderer.send('videoID', videoID)
})

  
} else { 
  remote.dialog.showErrorBox('Vidroll Error', 'The youtube url is not valid')
  
}
}



  render() {
    return (
      <div>
     Video

       
      </div>
    );
  }
}

export default GH;