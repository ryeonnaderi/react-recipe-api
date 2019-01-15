import React, { Component } from 'react';
import './App.css';

import Form from "./Components/Form"
import Recipes from "./Components/recipes";

const API_KEY = "abc82e34389c590090025bbc484e13a9";
  
class App extends Component {
  state ={
    recipes:[]
  }
  getRecipe = async (e) =>{
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`);

    const data = await api_call.json();
    this.setState({recipes:data.recipes})
    
  }

  componentDidUpdate =() =>{
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }
  componentDidMount =() =>{
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({recipes});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe = {this.getRecipe} />
       <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;