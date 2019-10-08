import React, { Component } from 'react';
import Joke from './Joke';
import Face from './Face';
import axios from 'axios';
import './Jokes.css';

class Jokes extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.state = { jokes: [] };
    }
    async componentDidMount() {
        //load joke
        let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
            let jokeres = await axios.get("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" }
            });
            let data = jokeres.data;
            jokes.push(data.joke);
        }
        this.setState({ jokes: jokes });
    }
    render() {
        let defaultJoke = this.state.jokes.map(joke => <div>{joke}</div>);
        return (
            <div className="Jokes" >
                <div className="Jokes-sidehar">
                    <h1 className="Jokes-title"><span>Dad </span>Jokes</h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className="Jokes-btn">New Jokes</button>
                </div>
                <div className="Jokes-content">
                    <i className="fas fa-arrow-up"></i>
                    <div>1</div>
                    <i className="fas fa-arrow-down"></i>
                    {defaultJoke}
                    <Face />
                </div>
            </div>
        )
    }
}
export default Jokes;