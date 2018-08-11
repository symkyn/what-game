import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    inputs = {
        title: {
            label: 'Title',
            property: 'title',
            type: 'text'
        },
        minplayercount: {
            label: 'Minimum Player Count',
            property: 'minplayercount',
            type: 'number'
        },
        maxplayercount: {
            label: 'Max Player Count',
            property: 'maxplayercount',
            type: 'number'
        },
        minplaytime: {
            label: 'Minimum Play Time',
            property: 'minplaytime',
            type: 'number'
        },
        maxplaytime: {
            label: 'Max Play Time',
            property: 'maxplaytime',
            type: 'number'
        },
        thumbnail: {
            label: 'Thumbnail',
            property: 'thumbnail',
            type: 'text'
        },
        genre: {
            label: 'Genre',
            property: 'genre',
            type: 'text'
        },
        description: {
            label: 'Description',
            property: 'description',
            type: 'text'
        },
        owner: {
            label: 'Owner User Name',
            property: 'owner',
            type: 'text'
        },
        bggid: {
            label: 'BGG Game ID',
            property: 'bggid',
            type: 'number'
        }
    }

    constructor(){
        super()

        this.state={
            title: '',
            minplayercount: 0,
            maxplayercount: 0,
            minplaytime: 0,
            maxplaytime: 0,
            thumbnail: '',
            genre: '',
            description: '',
            owner: '',
            bggid: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return(
            <div>Form
                <form name="new-game-form" className="new-game-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-row">
                        <label>{this.inputs.title.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.title.property)}
                                value={this.state.title}
                                type={this.inputs.title.type}
                            />
                    </div>
                    <div className="form-row">
                        <label>{this.inputs.minplayercount.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.minplayercount.property)}
                                value={this.state.minplayercount}
                                type={this.inputs.minplayercount.type}
                            />
                        <label>{this.inputs.maxplayercount.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.maxplayercount.property)}
                                value={this.state.maxplayercount}
                                type={this.inputs.maxplayercount.type}
                            />
                    </div>
                    <div className="form-row">
                        <label>{this.inputs.minplaytime.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.minplaytime.property)}
                                value={this.state.minplaytime}
                                type={this.inputs.minplaytime.type}
                            />
                        <label>{this.inputs.maxplaytime.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.maxplaytime.property)}
                                value={this.state.maxplaytime}
                                type={this.inputs.maxplaytime.type}
                            />
                    </div>
                    <div className="form-row">
                        <label>{this.inputs.thumbnail.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.thumbnail.property)}
                                value={this.state.thumbnail}
                                type={this.inputs.thumbnail.type}
                            />
                        <label>{this.inputs.genre.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.genre.property)}
                                value={this.state.genre}
                                type={this.inputs.genre.type}
                            />
                    </div>
                    <div className="form-row">
                        <label>{this.inputs.description.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.description.property)}
                                value={this.state.description}
                                type={this.inputs.description.type}
                            />
                    </div>
                    <div className="form-row">
                        <label>{this.inputs.owner.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.owner.property)}
                                value={this.state.owner}
                                type={this.inputs.owner.type}
                            />
                        <label>{this.inputs.bggid.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.bggid.property)}
                                value={this.state.bggid}
                                type={this.inputs.bggid.type}
                            />
                    </div>
                    <button type='submit'>
                        submit
                    </button>
                </form>
            </div>
        )
    }

    handleChange(e, name) {
        e.preventDefault();
        const value = e.target.value;

        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const newGame = this.state;

        console.log(newGame);
        axios.post('/games/newGame', newGame)
            .then(result => console.log(result))
            .catch(err => console.warn(err))
    }
}

export default Form;