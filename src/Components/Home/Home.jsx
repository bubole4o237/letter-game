import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
    return (
        <div>
            <h2>WELCOME</h2>
            <h3>Choose level</h3>
            <ul>
                <Link to='/level/first-letter'><li>First Letter</li></Link>
                <Link to='/level/letters'><li>Words</li></Link>
                <Link to='/level/words'><li>Missing Letters</li></Link>
            </ul>
        </div>
    );
}

export default Home;
