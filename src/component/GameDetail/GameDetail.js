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
            voteArray: [],
            chartData: {},
            showGraph: false,
        };

        this.submitVote = this.submitVote.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    

    componentWillMount() {
        axios.get(`http://localhost:4000/vote/getVotes/${this.props.match.params.gameid}`)
        .then(response => {
            this.setState({
                voteArray: response.data,
            });
            const lables = this.state.voteArray.map(user => (user.firstname));
            const votes = this.state.voteArray.map(user => (user.vote));
            this.setState({
                chartData: {
                    labels: lables,
                    datasets: [
                        {
                            label: 'Vote',
                            data: votes,
                            backgroundColor: 'rgba(255, 99, 125, 0.2)',
                            borderColor: 'rgba(255, 0, 125, 1)',
                            color: 'black',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',

                        }
                    ]
                }
            })
        })
        .catch(err => {
            console.warn(err.response.data.message);
        })
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
                    {game.averagevote !== 'NaN' ? (
                        <div className="average-vote">
                            <h5>Average vote</h5>
                            {game.averagevote}
                            <br />
                        </div>
                    ) : (
                        <div className="average-vote">
                            <h5>No Votes Yet</h5>
                        </div>
                    )
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
                {this.state.showGraph
                    ? (<div className="graph">
                    <HorizontalBar 
                          data={this.state.chartData}
                          options={{
                              maintainAspectRatio: false,
                              legend: {
                                  labels: {
                                    fontColor: 'black'
                                  }
                              },
                              scales: {
                                  xAxes: [{
                                      display: true,
                                      ticks: {
                                          fontColor: 'black',
                                          beginAtZero: true,
                                          steps: 10,
                                          min: 0,
                                          max: 10
                                      }
                                  }],
                                  yAxes: [{
                                      ticks: {
                                          fontColor: 'black'
                                      }
                                  }]
                              }
                          }}   
                    />
                    <Button onClick={() => this.hideDetail()}>Hide Detail</Button>
                    </div>)
                    : (<Button onClick={() => this.showDetail()}>Show Detail</Button>)
                }
                <form onSubmit={(e) => this.submitVote(e)}>
                    <label>My Vote </label>
                    <input 
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.newVote}
                            type="number"
                            min='1'
                            max='10'
                        />
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

    showDetail() {
        this.setState({
            showGraph: true
        })
    }

    hideDetail() {
        this.setState({
            showGraph: false
        })
    }

}

export default connect(state=>state)(GameDetail);