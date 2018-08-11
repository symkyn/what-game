import React, { Component } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

class GameDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            game: null,
            loading: true,
            message: '',
            vote: 0,
        };

        this.submitVote = this.submitVote.bind(this);
    }

    

    componentWillMount() {
        console.log(this.props.match.params.gameid)
        axios
            .get(`http://localhost:4000/games/gameDetails/${this.props.match.params.gameid}`)
            .then(response => {
                this.setState({
                    game: response.data,
                });
            })
            .catch(err => {
                console.warn(err.response.data.message);
                this.setState({
                    message: err.response.data.message,
                });
            })
            .then(() => {
                this.setState({
                    loading: false,
                });
            });
    }

    render() {
        const { game, loading, message } = this.state;

        let content;
        
        if (loading) {
            content = <p className="loading">Loading</p>;
        }
        else if (message) {
            content = <p className="error-message">{message}</p>;
        }
        else {
            let description = game.description;
            content = (
                <div className="game">
                    {game.title}
                    <br />
                    <div className="description" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}}></div>
                </div>
            );
        }

        return (
            <div className="game-details-component">
                Game Detail
                {content}
                <form onSubmit={(e) => this.submitVote(e)}>
                    <label>My Vote </label>
                    <input 
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.vote}
                            type="number"
                            min='1'
                            max='10'
                        />
                    <button type="submit"> VOTE! </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            vote: e.target.value
        })
    }

    submitVote(e) {
        e.preventDefault();
        console.log('submitting vote');
        axios.post(`/vote/addVote/${this.props.match.params.gameid}`, {vote: this.state.vote})
            .then(result => console.log(result))
            .catch(err => console.warn(err))
    }

}

export default GameDetail;