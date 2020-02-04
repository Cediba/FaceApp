import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
  

const app = new Clarifai.App({
  apiKey: 'f4dd2d7d5d704b8aa109fe8de9398534'
 });

const particlesOption = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(
      function(response) {
        console.log(response.output[0].data.regions[0].region_info_bounding_box);
      },
      function(err){
      }
    );
  }
  render() {
  return (
    <div className="App">
      <Particles className='particles'
                params={particlesOption} />
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm 
      onInputChange={this.onInputChange}
      onButtonSubmit={this.onButtonSubmit}
      />
     <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  )};
}

export default App;
