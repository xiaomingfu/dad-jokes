import React, { Component } from 'react';
import Joke from './Joke';
import Face from './Face';

class Jokes extends Component {
    render() {
        return (
            <div className="Joke">
                <div className="Joke-header">
                    <h1 className="Joke-title">Dad <span>Jokes</span></h1>
                    😂
                    <button>New Jokes</button>
                </div>
                <div className="Joke-content">
                    <ul>
                        <li>
                            <i class="fas fa-arrow-up"></i>
                            <div>1</div>
                            <i class="fas fa-arrow-down"></i>
                            <Joke />
                            <Face />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Jokes;