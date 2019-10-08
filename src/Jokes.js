import React, { Component } from 'react';
import Joke from './Joke';
import Face from './Face';
import axios from 'axios';

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
            <div className="Joke" >
                <div className="Joke-header">
                    <h1 className="Joke-title">Dad <span>Jokes</span></h1>
                    😂
                    <button>New Jokes</button>
                </div>
                <div className="Joke-content">
                    <ul>
                        <li>
                            <i className="fas fa-arrow-up"></i>
                            <div>1</div>
                            <i className="fas fa-arrow-down"></i>
                            {defaultJoke}
                            <Face />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Jokes;