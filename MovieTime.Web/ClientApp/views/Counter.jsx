import * as React from 'react';

import styles from './Counter.scss';

export class Counter extends React.Component {
    constructor() {
        super();
        this.state = {currentCount: 0};
    }

    render() {
        return (
            <div>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p>Current count: <strong>{this.state.currentCount}</strong></p>

                <button onClick={() => {
                    this.incrementCounter()
                }}>Increment
                </button>
                
                <div className={styles["test-red"]}>
                    <span className={styles.jeffrey}>Hoi Jeffrey</span>
                    Hello, world!
                </div>
            </div>
        );
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }
}
