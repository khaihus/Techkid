import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import MainContent from '../components/MainContent';
import axios from "../axios";
class HomeScreen extends Component {
    state = {
        images: [],
        searchString:""
      };
    
    componentDidMount(){
    axios
        .get("/api/images")
        .then(data => {
            // setTimeout(() => {
            this.setState({ 
                images: data.data,
            })
            // },1000);
        })
        .catch(err => console.error(err));
    }
    
    _onSearchChanged = text => this.setState({ searchString: text });

    render() {
        const displayImages = this.state.images.filter(img => 
            img.title.toLowerCase().includes(this.state.searchString.toLowerCase()) || 
            img.description.toLowerCase().includes(this.state.searchString.toLowerCase())
        )
        return (
            <div>
                <NavBar 
                    onSearchChanged={this._onSearchChanged}
                    username = {this.props.username}
                    onLogin={this.props.onLogin}  
                />
                <MainContent images = {displayImages} />
            </div>
        );
    }
}

export default HomeScreen;