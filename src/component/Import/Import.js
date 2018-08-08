import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Import extends Component {
    constructor(){
        super()

        this.state={
            bggid: '',
            games: []
        }
        this.handleChange=this.handleChange.bind(this);
        this.import=this.import.bind(this);
        this.gameImport=this.gameImport.bind(this);
    }

    componentWillMount() {
        if(this.props.bggUserName)
        {this.setState({
            bggid: this.props.bggUserName
        })}
    }

    gameImport(e, id, plays){
        e.preventDefault();

        console.log(id)
        axios.get(`http://localhost:4000/games/importGame/${id}/${this.state.bggid}/${plays}`)
            .then(result => console.log(result))
            .catch(err => console.warn(err))
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const games = this.state.games
            .map((games, i) => (
                <li key={`list-item-${i}`}>
                    <button 
                        className={`import`} 
                        onClick={(e) => this.gameImport(e, games.id, games.plays)}>
                            import
                    </button>
                    {games.name} || {games.id} || Plays: {games.plays}
                </li>
            ))
        return(
            <div className='import-games'>
                Import Games from BoardGameGeek
                <form className='import' onSubmit={(e)=>this.import(e)}>
                    <label htmlFor="bggid">BGG Username: </label>
                        <input 
                                name='bggid' 
                                type='bggid' 
                                onChange={(e) =>this.handleChange(e)}
                                value={this.state.bggid} 
                            />
                    <button type='submit'>Import</button>
                </form>
                {games}
            </div>
        )
    }

    import(e) {
        e.preventDefault();

        const bggid = this.state.bggid
        console.log(bggid)
        axios.get(`http://localhost:4000/games/import/${bggid}`)
            .then(result => {
                this.setState({
                    games: result.data
                })
            })
            .catch(err => console.warn(err))
    }

}

export default connect(state => state)(Import);