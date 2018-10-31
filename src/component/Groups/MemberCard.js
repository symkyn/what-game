import React, { Component } from 'react'

export default class MemberCard extends Component {
  constructor(props){
    super(props)
  }

  render() {
      return(
          <div>
              {this.props.m.firstname} {this.props.m.lastname} {this.props.m.bggid}
          </div>
      )
  }

}
