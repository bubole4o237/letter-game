import { Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import FirstLetter from './Components/FirstLetter/FirstLetter';
import Words from './Components/Words/Words';
import MissingLetters from './Components/MissingLetters/MissingLetters';
import Footer from './Components/Footer/Footer'


function App() {
    return (
        <div className="App">
            <div className="main">

                <Header />

                <Switch>

                    <Route path='/' exact component={Home} />
                    <Route path='/level/first-letter' component={FirstLetter} />
                    <Route path='/level/letters' component={Words} />
                    <Route path='/level/words' component={MissingLetters} />
                    {/* <Route path='/level/subtraction' render={props => (<HomeOperation {...props} operation='subtraction' />)} />
                    <Route path='/level/multiply' render={props => (<HomeOperation {...props} operation='multiply' />)} />
                    <Route path='/level/divide' render={props => (<HomeOperation {...props} operation='divide' />)} />
                    <Route path='/level/mixed' render={props => (<HomeOperation {...props} operation='mixed' />)} /> */}

                </Switch>
                <Footer />
            </div>
        </div>
    );
}

export default App;
