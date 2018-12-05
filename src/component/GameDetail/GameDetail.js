import React, { Component } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { connect } from 'react-redux';
import { HorizontalBar } from 'react-chartjs-2';

import Button from '../Button/Button';
import './GameDetail.css';

class GameDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            game: null,
            loading: true,
            message: '',
            newVote: 0,
            databaseVote: 0,
            voteArray: [],
            chartData: {},
            expansions: [],
            voteOptions: [],
        };

        this.submitVote = this.submitVote.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    

    componentWillMount() {
        axios.get('/vote/options')
            .then( response => {
                this.setState({
                    voteOptions: response.data
                })
            })
            .catch(err => console.warn(err))
        if(this.props.match.params.groupid !== "mygame") {     
            axios.get(`/vote/getVotes/${this.props.match.params.gameid}?groupID=${this.props.match.params.groupid}`)
            .then(response => {
                this.setState({
                    voteArray: response.data,
                });
            })
            .catch(err => {
                console.warn(err => console.warn(err));
            })
        } 
        axios.get(`/vote/getVotes/${this.props.match.params.gameid}`)
            .then(response => {
                this.setState({
                    newVote: response.data[0].vote,
                    databaseVote: response.data[0],
                })
            })
            .catch(err => {
                console.warn(err => console.warn(err));
            })
        axios
            .get(`/games/gameDetails/${this.props.match.params.gameid}`)
            .then(response => {

                if(response.data.length === 1) {
                    this.setState({
                        game: response.data[0],
                        expansions: [response.data[0].etitle],
                    });
                } else {
                    const expansions = response.data.map(e =>  e.etitle);
                    this.setState({
                        game: response.data[0],
                        expansions: expansions,
                    })
                }
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
        const voteOptions = this.state.voteOptions.map((o, i) => {
            return <option key={`option-${i}`} value={o.voteoptionid}>{o.display}</option>
        })
        const groupVotes = this.state.voteArray.map((v, i) => {
            return(<li key={`vote-${i}`} className='vote-list'>{v.firstname}: {v.display}</li>)
        })
        const { game, loading, message } = this.state;
        let content;
        var exps = null;
        if(this.state.expansions.length >= 1) { 
            exps = this.state.expansions.map((exp, i) => {
                return(<div key={`exp-${i}`}>{exp}</div>)
            })
        }
        if (loading) {
            content = <p className="loading">Page Loading</p>;
        }
        else if (message) {
            content = <p className="error-message">{message}: Please Reload Page</p>;
        }
        else {
            let description = game.description;
            content = (
                <div className="game">
                    <h2 className='game-title'>{game.title}</h2>
                    <br />
                    <img src={game.thumbnail} alt='not available' />
                    <br />
                    {this.props.match.params.groupid !== 'mygame' ? (
                        <div className="average-vote">
                            {groupVotes}
                        </div>
                    ) : (
                        <div>
                            My Current Vote: {this.state.databaseVote.display}
                        </div>
                    )
                    }
                    {exps.length > 1 ? 
                                <div>
                                    <h5>Expansions Owned</h5>
                                    {exps}
                                </div>
                            : game.etitle ? 
                                <div>
                                    <h5>Expansion Owned</h5>
                                    {game.etitle}
                                    <br />
                                </div>
                            :    
                                <p>No Expansions Owned</p>
                    }
                    <div 
                            className="description" 
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}}>
                    </div>
                </div>
            );
        }

        return (
            <div className="game-details-component">
                {content}
                {this.props.match.params.groupid !== "mygame" ?
                    <div>
                    
                    </div> : null 
                }
                <form onSubmit={(e) => this.submitVote(e)}>
                    <label>My Vote </label>
                    <select 
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.newVote}
                        >
                        {voteOptions}
                    </select>
                    <Button type="submit"> VOTE! </Button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            newVote: e.target.value
        })
    }

    submitVote(e) {
        e.preventDefault();
        axios.post(`/vote/addVote/${this.props.match.params.gameid}`, {vote: this.state.newVote, username: this.props.bggUserName})
            .then(result => {
                this.componentWillMount();
            })
            .catch(err => console.warn(err))
    }

}

export default connect(state=>state)(GameDetail);