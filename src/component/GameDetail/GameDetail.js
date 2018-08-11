import React, { Component } from 'react';
import axios from 'axios';

class GameDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            game: null,
            loading: true,
            message: '',
        };
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
                    <div className="description" dangerouslySetInnerHTML={{__html: description}}></div>
                </div>
            );
        }

        return (
            <div className="game-details-component">
                Game Detail
                {content}
            </div>
        );
    }
}

export default GameDetail;