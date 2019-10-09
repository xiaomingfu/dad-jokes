import React, { Component } from 'react';
import uuid from 'uuid/v4';
import Joke from './Joke';
import Face from './Face';
import axios from 'axios';
import './JokeList.css';

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.state = { jokes: [] };
        this.handleVote = this.handleVote.bind(this);
    }
    async componentDidMount() {
        //load joke
        let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
            let jokeres = await axios.get("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" }
            });
            let data = jokeres.data;
            jokes.push({ text: data.joke, vote: 0, id: uuid() });
        }
        this.setState({ jokes: jokes });
    }
    handleVote(id, delta) {
        this.setState(
            st => ({
                jokes: st.jokes.map(j =>
                    j.id === id ? { ...j, vote: j.vote + delta } : j
                )
            }));
    }
    render() {
        let defaultJoke = this.state.jokes.map(joke =>
            <Joke
                key={joke.id}
                text={joke.text}
                vote={joke.vote}
                upvote={() =>
                    this.handleVote(joke.id, 1)}
                downvote={() =>
                    this.handleVote(joke.id, -1)} />);
        return (
            <div className="JokeList" >
                <div className="JokeList-sidehar">
                    <h1 className="JokeList-title"><span>Dad </span>Jokes</h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className="JokeList-btn">New Jokes</button>
                </div>
                <div className="JokeList-content">

                    {defaultJoke}
                    <Face />
                </div>
            </div>
        )
    }
}
export default JokeList;