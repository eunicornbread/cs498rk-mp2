import React, {Component} from 'react';
import './detail.scss';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const axios = require('axios');

class Detail extends Component {
	constructor(props) {
		super(props);
		var id = this.props.match.params.id;
		var url = "https://pokeapi.co/api/v2/pokemon/" + id;
		this.state = {};
		var pokemon = this;
		var image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";

		axios.get(url).then(function(response) {			
			const abilities = [];
			response.data.abilities.forEach(function(element) {
				abilities.push(element.ability.name);
			});

			const types = [];
			response.data.types.forEach(function(element) {
				types.push(element.type.name);
			});

			const moves = [];
			response.data.moves.forEach(function(element) {
				moves.push(element.move.name);
			});
			
			pokemon.setState({
				height: response.data.height,
				weight: response.data.weight,
				abilities: abilities,
				types: types,
				base_experience: response.data.base_experience,
				moves: moves,
				species: response.data.species.name,
				image: image
			});
		});
	}

	componentWillReceiveProps(props) {
		var id = parseInt(props.match.params.id);
		var url = "https://pokeapi.co/api/v2/pokemon/" + id;
		var pokemon = this;
		var image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";

		axios.get(url).then(function(response) {
			console.log(response);
			console.log(response.data);
			
			const abilities = [];
			response.data.abilities.forEach(function(element) {
				abilities.push(element.ability.name);
			});

			const types = [];
			response.data.types.forEach(function(element) {
				types.push(element.type.name);
			});

			const moves = [];
			response.data.moves.forEach(function(element) {
				moves.push(element.move.name);
			});
			
			pokemon.setState({
				height: response.data.height,
				weight: response.data.weight,
				abilities: abilities,
				types: types,
				base_experience: response.data.base_experience,
				moves: moves,
				species: response.data.species.name,
				image: image
			});
		});
	}

	render() {
		const abilities = [];
		if (this.state.abilities === undefined) {
			this.state.abilities = [];
		}

		var count = 0;
		this.state.abilities.forEach(function(element) {
			if (count === 0) {
				abilities.push(
					<><span className="badge badge-pill badge-info">{element}</span>&nbsp;</>
					);
			} else if (count === 1) {
				abilities.push(
					<><span className="badge badge-pill badge-success">{element}</span>&nbsp;</>
					);
			} else if (count === 2) {
				abilities.push(
					<><span className="badge badge-pill badge-light">{element}</span>&nbsp;</>
					);
			} else {
				abilities.push(
					<><span className="badge badge-pill badge-dark">{element}</span>&nbsp;</>
					);
			}

			count = (count + 1) % 4;
		});

		const types = [];
		if (this.state.types === undefined) {
			this.state.types = [];
		}

		this.state.types.forEach(function(element) {
			if (element === "grass" || element === "bug") {
				types.push(
					<><span class="badge badge-pill badge-success">{element}</span>&nbsp;</>	
				);
			} else if (element === "poison" || element === "ground") {
				types.push(
					<><span class="badge badge-pill badge-warning">{element}</span>&nbsp;</>	
				);
			} else if (element === "fire" || element === "fighting") {
				types.push(
					<><span class="badge badge-pill badge-danger">{element}</span>&nbsp;</>	
				);
			} else if (element === "normal" || element === "ice") {
				types.push(
					<><span class="badge badge-pill badge-info">{element}</span>&nbsp;</>	
				);
			} else if (element === "flying" || element === "water") {
				types.push(
					<><span class="badge badge-pill badge-primary">{element}</span>&nbsp;</>	
				);
			} else if (element === "dark") {
				types.push(
					<><span class="badge badge-pill badge-dark">{element}</span>&nbsp;</>	
				);
			} else {
				types.push(
					<><span class="badge badge-pill badge-secondary">{element}</span>&nbsp;</>	
				);
			}
		});

		const moves = [];
		if (this.state.moves === undefined) {
			this.state.moves = [];
		}

		var index = 0;
		this.state.moves.slice(0, 10).forEach(function(element) {
			if (index === 0) {
				moves.push(
					<><span class="badge badge-primary">{element}</span>&nbsp;</>	
				);
			} else if (index === 1) {
				moves.push(
					<><span class="badge badge-secondary">{element}</span>&nbsp;</>	
				);
			} else if (index === 2) {
				moves.push(
					<><span class="badge badge-success">{element}</span>&nbsp;</>	
				);
			} else if (index === 3) {
				moves.push(
					<><span class="badge badge-danger">{element}</span>&nbsp;</>	
				);
			} else if (index === 4) {
				moves.push(
					<><span class="badge badge-warning">{element}</span>&nbsp;</>	
				);
			} else if (index === 5) {
				moves.push(
					<><span class="badge badge-info">{element}</span>&nbsp;</>	
				);
			} else {
				moves.push(
					<><span class="badge badge-light">{element}</span>&nbsp;</>	
				);
			}

			index = (index + 1) % 7;
		});

		var left = parseInt(this.props.match.params.id) - 1;
		var right = parseInt(this.props.match.params.id) + 1;

		var lefturl = "/detail/" + left;
		var righturl = "/detail/" + right;

		var leftarrow;
		if (parseInt(this.props.match.params.id) === 1) {
			leftarrow = (<NavLink exact to={{ pathname: lefturl, state: 'flushDeal' }}>
							<i class="fas fa-angle-double-left hidden" id="leftarrow"></i>
						</NavLink>);
		} else {
			leftarrow = (<NavLink exact to={{ pathname: lefturl, state: 'flushDeal' }}>
							<i class="fas fa-angle-double-left" id="leftarrow"></i>
						</NavLink>);
		}

		var rightarrow;
		if (parseInt(this.props.match.params.id) === 807) {
			rightarrow = (<NavLink exact to={{ pathname: righturl, state: 'flushDeal' }}>
						  	<i class="fas fa-angle-double-right hidden" id="rightarrow"></i>
						  </NavLink>);
		} else {
			rightarrow = (<NavLink exact to={{ pathname: righturl, state: 'flushDeal' }}>
						  	<i class="fas fa-angle-double-right" id="rightarrow"></i>
						  </NavLink>);
		}

		return (
				<div>
					<Navbar bg="dark" variant="dark">
			        	<NavLink exact to="/">
			        		<Navbar.Brand>Pokedex</Navbar.Brand>      
			        	</NavLink>
			      	</Navbar>

					<div className="container">
						<div className="card mt-5 mb-5 pt-2 pb-3 detailview mx-auto">
						  {leftarrow}
						  {rightarrow}
						  
						  <div className="row no-gutters">
						    <div className="col-md-4 justify-content-center align-self-center">
						      <img src={this.state.image} className="card-img" alt="..." />
						    </div>
						    <div className="col-md-8">
						      <div className="card-body">
						        <h5 className="card-title">Species: {this.state.species}</h5>
						        <p className="card-text">Height: {this.state.height}</p>
						        <p className="card-text">Weight: {this.state.weight}</p>
						        <p className="card-text">Base experience: {this.state.base_experience}</p>
								<p className="card-text">Abilities: {abilities}</p>
								<p className="card-text">Types: {types}</p>
								<p className="card-text">Moves: {moves}</p>
						      </div>
						    </div>
						  </div>
						</div>
					</div>

				</div>
			);
	}
}


export default Detail;