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
        this.state = {
            loading: false,
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")
        };
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
        console.log(this.seenJokes);
        this.handleVote = this.handleVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
    }
    //load joke
    async getJokes() {
        try {
            let newJokes = [];
            while (newJokes.length < this.props.numJokesToGet) {
                let jokeres = await axios.get("https://icanhazdadjoke.com/", {
                    headers: { Accept: "application/json" }
                });
                let newJoke = jokeres.data.joke;
                if (!this.seenJokes.has(newJoke)) {
                    newJokes.push({ text: newJoke, vote: 0, id: uuid() });
                } else {
                    console.log("There is the same one");
                    console.log(newJoke);
                }
            };
            this.setState(st => ({
                loading: false,
                jokes: [...st.jokes, ...newJokes]
            }),
                () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)));
        } catch (e) {
            alert(e);
            this.setState({ loading: false });
        }
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
        this.setState({ loading: true }, this.getJokes);
    }
    render() {
        if (this.state.loading) {
            return (
                <div className="spinner">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="JokeList-title">Loading....</h1>
                </div>
            );
        }
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