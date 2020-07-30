import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({apiKey: '6050ce4a18ad4ea18ec6b4250d07bc71'});

const particlesOption = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value: 800
      }
    } 
  }
}

const initialState = {
  
      input: '',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      
    }
}

class App extends Component{
  constructor(props){
    super(props)
    this.state = initialState;
}

loadUser = (data) => {
  this.setState({
    user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.jained
    }
  })
}



onInputChange = (event) => {
  this.setState({input: event.target.value })
}

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  console.log(width, height)
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  this.setState({box: box})
  console.log(this.state.box)
}

onButtonSumbit = () => {
  this.setState({imageUrl: this.state.input });
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response =>{
      if(response){
        fetch('https://sheltered-stream-47657.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
}

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState( initialState )
  }
  else if (route === 'home') {
    this.setState({ isSignedIn: true })
  }
  this.setState({route: route})
} 



render(){
  
  return(
    <div className="App">
      <Particles 
        className='particles'
        params={particlesOption}
      />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
      {this.state.route === 'home' ? 
        <div>
          <Logo />
           <Rank  name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSumbit={this.onButtonSumbit} />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        :(
           this.state.route === 'signin' ? 
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}  />
          :
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
          )
      }
    </div>
    )
}
}

export default App;
