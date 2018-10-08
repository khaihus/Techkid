import React, { Component } from 'react';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from "./axios";
import HomeScreen from './containers/HomeScreen';
import DetailScreen from './containers/DetailScreen';
import { BrowserRouter, Route } from 'react-router-dom';
class App extends Component {
  state = {
    username:""
  };

  _onLogin = () => {   
    axios
      .post("/api/auth",{
        username: "admin",
        password: "123456"
      })
      .then(response => 
        this.setState({
          username: response.data.username,
          id: response.data.id
        })
      )
      .catch(err => console.error(err));   
  };
  
  render() {
    console.log(this.state.username);  
      return (
        
        <BrowserRouter>
          <div className="App">
            <Route exact path="/" render={(props)=>{
              return <HomeScreen {...props} username={this.state.username} onLogin={this._onLogin} />
            }} />
            <Route path="/images/:imageId" render={(props)=>{
              return <DetailScreen {...props} username={this.state.username} onLogin={this._onLogin} />
            }} />
          </div>
        </BrowserRouter>
        
      );
  }
}

export default App;
