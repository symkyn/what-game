import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import  Game  from '../Game/Game';
import Button from '../Button/Button';
import './List.css';
import FilterForm from '../FilterForm/FilterForm';
import MemberCard from '../Groups/MemberCard';

class GroupList extends Component {
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
            members: [],
            searchTerm: '',
            filter: '',
        }

        this.componentWillMount = this.componentWillMount.bind(this);
        this.addPlay = this.addPlay.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    componentWillMount() {
        axios.get(`/games/groupGames/${this.props.match.params.groupid}?search=`)
          .then(results => {
            this.setState({
              games: results.data,
            })
          })
          .catch(err => console.warn(err))
        axios.get(`/groups/groupMembers/${this.props.match.params.groupid}`)
            .then(results => {
                this.setState({
                members: results.data,
                })
                console.log(results.data)
            })
            .catch(err => console.warn(err))
    }

    submitSearch(e) {
        e.preventDefault();

        axios.get(`/games/groupGames/${this.props.match.params.groupid}?search=${this.state.searchTerm}`)
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

        axios.get(`/games/groupGames/${this.props.match.params.groupid}?num=${num}&time=${time}&users=${users}`)
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

    addPlay(e, plays, id) {
        e.preventDefault();
        e.stopPropagation();

        const newPlays = {plays: plays + 1};
        axios.patch(`/games/addPlay/${id}`, newPlays)
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
        const memberList = this.state.members.map((m, i) => {
            return(
                <MemberCard key={`member-${i}`}m={m} />
            )
        })
        const gamesList = this.state.games.map((game, i) => 
        {
            return(
                <Link className="no-link" to={`../game/${game.id}/${this.props.match.params.groupid}`} key={`game-${i}`} >
                    <Game 
                            addPlay = {(e) => this.addPlay(e, game.plays, game.id)}
                            game={game}
                            groupid={this.props.match.params.groupid}
                        />
                </Link>        
                        )
        })
        return(
            <div className="game-list">
                <div>
                    {memberList}
                </div>
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

export default GroupList;