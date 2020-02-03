import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: ''
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
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onSubmit = () => {
    console.log('click');
    app.models
    .predict(
    Clarifai.COLOR_MODEL,"https://samples.clarifai.com/metro-north.jpg"
    )
    .then(function(response) {
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
     {/* <FaceRecognition/> */}
    </div>
  )};
}

export default App;
