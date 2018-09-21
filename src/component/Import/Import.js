import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import Masonry from 'react-masonry-component';

import Button from '../Button/Button';
import ImportList from '../ImportList/ImportList';

class Import extends Component {
    constructor(){
        super()

        this.state={
            bggid: '',
            games: [],
            modalIsOpen: false,
            importedGame: ''
        }
        this.handleChange=this.handleChange.bind(this);
        this.import=this.import.bind(this);
        this.gameImport=this.gameImport.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(result) {
        this.setState({
            modalIsOpen: true,
            importedGame: result.data.title
        });
      }
    
    closeModal() {
        this.setState({
            modalIsOpen: false,
            importedGame: ''
        });
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
            .then(result => this.openModal(result))
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
                <ImportList 
                        className='import-game-list'
                        key={`list-item-${i}`} 
                        game={games} 
                        gameImport = {(e) => this.gameImport(e, games.id, games.plays)}
                    />

                
                // <li key={`list-item-${i}`}>
                //     <Button 
                //         className={`import`} 
                //         onClick={(e) => this.gameImport(e, games.id, games.plays)}>
                //             Import
                //     </Button>
                //     {games.name} || {games.id} || Plays: {games.plays}
                // </li>
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
                    <Button type='submit'>Grab List</Button>
                </form>
                <h2>Click Image to Import Game</h2>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal">
                    <h3>{this.state.importedGame} is imported</h3>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
                <Masonry className='import-games-list'>
                    {games}
                </Masonry>
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
                console.log(result.data)
            })
            .catch(err => console.warn(err))
    }

}

export default connect(state => state)(Import);