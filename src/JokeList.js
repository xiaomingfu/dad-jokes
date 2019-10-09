import React, { Component } from 'react';
import uuid from 'uuid/v4';
import Joke from './Joke';
import axios from 'axios';
import './JokeList.css';

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.state = { jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]") };
        this.handleVote = this.handleVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
    }
    //load joke
    async getJokes() {
        let newJokes = [];
        while (newJokes.length < this.props.numJokesToGet) {
            let jokeres = await axios.get("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" }
            });
            let data = jokeres.data;
            newJokes.push({ text: data.joke, vote: 0, id: uuid() });
        }
        this.setState(st => ({
            jokes: [...st.jokes, ...newJokes]
        }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)));
    }
    handleVote(id, delta) {
        this.setState(
            st => ({
                jokes: st.jokes.map(j =>
                    j.id === id ? { ...j, vote: j.vote + delta } : j
                )
            }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }
    handleClick() {
        this.getJokes();
    }
    render() {
        return (
            <div className="JokeList" >
                <div className="JokeList-sidehar">
                    <h1 className="JokeList-title"><span>Dad </span>Jokes</h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className="JokeList-btn" onClick={this.handleClick}>New Jokes</button>
                </div>
                <div className="JokeList-content">
                    {this.state.jokes.map(joke => (
                        <Joke
                            key={joke.id}
                            text={joke.text}
                            vote={joke.vote}
                            upvote={() =>
                                this.handleVote(joke.id, 1)}
                            downvote={() =>
                                this.handleVote(joke.id, -1)}
                        />
                    ))}
                </div>
            </div>
        )
    }
}
export default JokeList;