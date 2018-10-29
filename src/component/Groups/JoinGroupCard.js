import React, { Component } from 'react';
import axios from 'axios';

import Button from '../Button/Button';

class JoinGroupCard extends Component {
    constructor(props){
        super(props)

        this.state={
            ispublic: true,
            password: ''
        }
    }

    componentDidMount() {
        this.setState({
            ispublic: this.props.group.ispublic
        })
        console.log(this.props.group)
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            password: e.target.value
        })
    }

    render(){
        return(
            <div className='join-group-item'>
                <h3 className='title'>{this.props.group.name}</h3>
                <span className='info-span'> {this.props.group.locationcity}, {this.props.group.locationstate}</span>
                {!this.state.ispublic ? (
                    <span className='button-span'><form>
                        <label>Password: </label>
                        <input value={this.state.password} type='password' onChange={(e) => this.handleChange(e)} />
                        <br />
                        <Button type='submit'>Join</Button>
                    </form></span>
                ) : <span className='button-span'><Button>Join</Button></span>
                }
            </div>
        )
    }
}

export default JoinGroupCard;