import React, { Component } from 'react';
import { connect } from 'react-redux';

class Import extends Component {
    constructor(){
        super()

        this.state={
            bggid: ''
        }
        this.handleChange=this.handleChange.bind(this);
        this.import=this.import.bind(this);
    }

    componentWillMount() {
        if(this.props.bggUserName)
        {this.setState({
            bggid: this.props.bggUserName
        })}
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
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
            </div>
        )
    }

    import(e) {
        e.preventDefault();
    }

}

export default connect(state => state)(Import);