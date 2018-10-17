import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import  Game  from '../Game/Game';
import Button from '../Button/Button';
import './List.css';
import FilterForm from '../FilterForm/FilterForm';

class List extends Component {
    inputs = {
        search: {
            label: 'Search',
            property: 'searchTerm',
            type: 'text'
        }
    }

    constructor(){
        super()

        this.state = {
            games: [],
            searchTerm: '',
            filter: '',
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.addPlay = this.addPlay.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:4000/games/games?search=')
          .then(results => {
            this.setState({
              games: results.data,
            })
          })
          .catch(err => console.warn(err))
    }

    submitSearch(e) {
        e.preventDefault();

        axios.get(`http://localhost:4000/games/games?search=${this.state.searchTerm}`)
          .then(results => {
            this.setState({
              games: results.data,
              searchTerm: ''
            })
          })
          .catch(err => console.warn(err))
    }

    submitFilter(e, num, time, users) {
        e.preventDefault();

        axios.get(`http://localhost:4000/games/games?num=${num}&time=${time}&users=${users}`)
          .then(results => {
            this.setState({
              games: results.data,
              searchTerm: ''
            })
          })
          .catch(err => console.warn(err))
    }

    handleChange(e, name) {
        e.preventDefault();
        const value = e.target.value;

        this.setState({[name]: value});
    }

    handleDelete(e, id){
        e.preventDefault();
        e.stopPropagation();

        axios.delete(`http://localhost:4000/games/delete/${id}`)
            .then(this.componentWillMount)
            .catch(err => console.warn(err))
    }

    addPlay(e, plays, id) {
        e.preventDefault();
        e.stopPropagation();

        const newPlays = {plays: plays + 1};
        axios.patch(`http://localhost:4000/games/addPlay/${id}`, newPlays)
            .then(this.componentWillMount)
            .catch(err => console.warn(err))
    }

    noPlays(e) {
        e.preventDefault();

        const filteredArray = this.state.games.filter(game => game.plays === 0)
        this.setState({
            games: filteredArray,
        })
    }

    hasVotes(e) {
        e.preventDefault();

        let filteredArray = this.state.games.filter(game => game.averagevote !== "NaN")
        let filteredArray2 = filteredArray.sort((a, b) => {return b.averagevote - a.averagevote})
        this.setState({
            games: filteredArray2,
        })
    }

    render(){
        const gamesList = this.state.games.map((game, i) => 
        {
            return(
                <Link className="no-link" to={`game/${game.id}`} key={`game-${i}`} >
                    <Game 
                            addPlay = {(e) => this.addPlay(e, game.plays, game.id)}
                            handleDelete={(e) => this.handleDelete(e, game.id)}
                            game={game}
                        />
                </Link>        
                        )
        })
        return(
            <div className="game-list">
                <div className="search">
                    <form onSubmit={(e) => this.submitSearch(e)}>
                        <label>{this.inputs.search.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.search.property)}
                                value={this.state.searchTerm}
                                type={this.inputs.search.type}
                        />
                        <Button className='search-button' type="submit">Search</Button>
                    </form>
                </div>
                    <FilterForm submitFilter={(e, num, time, users) => this.submitFilter(e, num, time, users)} />
                <div className="sort-game-list-buttons">
                    <Button className='sort-button' onClick={(e) => {this.noPlays(e)}}>Shelf of Shame</Button>
                    <Button className='sort-button' onClick={(e) => {this.hasVotes(e)}}>Highest Average Vote</Button>
                    <Button className='sort-button' onClick={() => {this.componentWillMount()}}>Clear Filters</Button>
                </div>
                <div className="game-list-item">
                    
                        {gamesList}
                    
                </div>
            </div>
        )
    }
}

export default List;