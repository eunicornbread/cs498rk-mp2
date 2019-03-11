import React, { Component } from 'react';
import './App.css';
import { Navbar } from 'react-bootstrap';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';

const axios = require('axios');


class Grid extends Component {
  constructor(props) {
  	super(props);
    this.state = {pokemon: []};
  	var grid = this;
  	
	axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
		.then(function(response) {
			const pokemon = [];
			response.data.results.forEach(function(element) {
				var id = element.url.substr(34);
				id = id.substr(id, id.length - 1);
				pokemon.push({
					name: element.name,
					id: id
				})
			});
			grid.setState({pokemon: pokemon});
		});
  	}



  render() {
  	function click(event) {
  		console.log(event.target.getAttribute("pokemon"));
  	}

	const items = [];
	const pokemon = this.state.pokemon;

	pokemon.forEach(function(element) {
		var image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + element.id + ".png";
		var url = "/detail/" + element.id;
		items.push(
			
			<div className="col-sm-4 col-md-3 col-lg-2">
			<NavLink to={url}>
		  	  <div className="card mt-4" onClick={click} pokemon={element.id} data-toggle="modal" data-target=".bd-example-modal-lg">
		  	  	<img src={image} class="card-img-top" alt="..." pokemon={element.id} />
		  	  	<div class="card-body text-center" pokemon={element.id}>
				    <h5 class="card-title pokename" pokemon={element.id}>{element.name}</h5>
				</div>
		  	  </div>
		  	</NavLink>
		  	</div>);

	});

	return (
		<div>
		<div className="row">
			{items}
		</div>
		</div>
    );
  }
}

class List extends Component {
  constructor(props) {
  	super(props);
    this.state = {pokemon: [], search: ""};
  	var grid = this;
  	 this.handleChange = this.handleChange.bind(this);
  	
		axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
		.then(function(response) {
			const pokemon = [];
			response.data.results.forEach(function(element) {
				var id = element.url.substr(34);
				id = id.substr(id, id.length - 1);
				pokemon.push({
					name: element.name,
					id: id
				})
			});
			grid.setState({pokemon: pokemon});
		});
  	}

  	handleChange(event) {
  		console.log(event.target.value);
  		this.setState({search: event.target.value});
  	}

	render() {
		const items = []

		const pokemon = this.state.pokemon;
		var search = this.state.search.toLowerCase();

		var results = 0;

		pokemon.forEach(function(element) {
			const name = element.name.toLowerCase();
			if(element.id > 10000) {
				
			} else if(results < 10 && (search == "" || name.includes(search))) {
				results++;
				var front = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + element.id + ".png";
				var back = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + element.id + ".png";
				items.push(<tr data-toggle="modal" data-target=".bd-example-modal-lg">
						      <td className="align-middle"><img src={front} alt="" /></td>
						      <td className="align-middle"><img src={back} alt="" /></td>
						      <td className="align-middle pokename">{element.name}</td>
						      <th className="align-middle" scope="row">{element.id}</th>
						   </tr>);
			} else {
				var front = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + element.id + ".png";
				var back = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + element.id + ".png";
				items.push(<tr class="hidden">
						      <td className="align-middle"><img alt="" /></td>
						      <td className="align-middle"><img alt="" /></td>
						      <td className="align-middle pokename">{element.name}</td>
						      <th className="align-middle" scope="row">{element.id}</th>
						   </tr>);
			}
		});

		if(results == 0) {
			var text = "No pokemon matching " + this.state.search + "!";
			items.push(<tr>
						      <td colspan="4">{text}</td>
						   </tr>);
		}

		return (
			<div class="res-mwidth">
				<div class="input-group flex-nowrap">
				  <div class="input-group-prepend">
				    <span class="input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
				  </div>
				  <input type="text" class="form-control" id="search" placeholder="Search" aria-label="Username" aria-describedby="addon-wrapping" onChange={this.handleChange}/>
				</div>
				<div class="items">
					<table class="table table-hover" id="table">
					  <thead class="thead-dark">
					    <tr>
					      <th scope="col" class="cimg">Image (Front)</th>
					      <th scope="col" class="cimg">Image (Back)</th>
					      <th scope="col">Name</th>
					      <th scope="col">Pokemon ID</th>
					    </tr>
					  </thead>
					  <tbody>
					    {items}
					  </tbody>
					</table>
				</div>
			</div>
		);
	}
}

class App extends Component {
  render() {
    return (
      <>
    	<Navbar bg="dark" variant="dark">
        	<Navbar.Brand href="#home">Pokedex</Navbar.Brand>      
      	</Navbar>

		<div className="container">
      		
		<nav className="mt-4">
		  <div className="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
		    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Gallery</a>
		    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Search</a>
		  </div>
		</nav>
		<div className="tab-content" id="nav-tabContent">
		  <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"><Grid></Grid></div>
		  <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><List></List></div>
		</div>

      	</div>
      </>
    );
  }
}

export default App;