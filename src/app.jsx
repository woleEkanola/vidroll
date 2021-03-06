import { clipboard, ipcRenderer, remote } from 'electron';
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

class App extends React.Component {


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
  var video = new BrowserWindow({ width: 400, height: 320, frame: false, show: false, alwaysOnTop: true, y: 100, x: 100, })
  video.on('close', function () { win = null })
  video.setAlwaysOnTop(true)

  video.loadURL(modalPath)
  video.once('ready-to-show', () => {
    video.setAlwaysOnTop(true)
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
         <Container>
       <Row>
        <Col>
      <h1> Vidroll </h1>
   
      <p >play a video while you work </p>
      </Col>
      </Row>
      </Container>

      <Row className= 'bg'>
         <Container>
<Row className='mask' >
      <Col className='fuulWidth' >
      <h3>Play from YouTube</h3>
      <p>Once you copy the video link it will appear below</p>
      <input type="text" placeholder='Video Link' value= {this.state.youtube}/>
      <button onClick= {this.playVideo.bind(this)}>Play Video</button>
      </Col>
      <Col>
      <h3>Play a Local file</h3>
      <p>Drag and Drop the video here</p>
      <Button color='primary' >Play Video</Button>
      </Col>
      </Row>

            </Container>

      </Row>
      </div>
    );
  }
}

export default App;