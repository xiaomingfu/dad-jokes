import React, { Component } from 'react';

class Joke extends Component {

    render() {
        return (
            <div className="Joke">
                <div>
                    <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
                    <div className="Joke-vote">{this.props.vote}</div>
                    <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>
                </div>
                <div className="Joke-text">
                    {this.props.text}
                </div>
            </div>

        )
    }
}

export default Joke;