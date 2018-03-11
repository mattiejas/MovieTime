import React from 'react';
import Button from '../components/button/Button';
import { removeUser } from '../utils/auth';


export class Home extends React.Component {

    handleClick = async (e) => {
        console.log('Inside Handle click');
        const response = await removeUser('devopsproj');
        console.log('response= ', response );
    };

    render() {
        return (
            <Button onClick={this.handleClick} dark>Remove Me From Your System</Button>
        );
    }
}

//const Home = () => (
//    <div>

//        <Button onClick={this.handleClick} dark>Remove Me From Your System</Button>
//  </div>
//);

export default Home;
