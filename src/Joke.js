import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {

    render() {
        return (
            <div className="Joke">
                <div className="Joke-btn">
                    <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
                    <span className="Joke-vote">{this.props.vote}</span>
                    <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>
                </div>
                <div className="Joke-text">
                    {this.props.text}
                </div>
                <div className="Joke-smiley">
                    <i className="em em-rolling_on_the_floor_laughing" aria-role="presentation" aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
                </div>

            </div>

        )
    }
}

export default Joke;