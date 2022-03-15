import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import correct from '../../sounds/correct-answer.wav';
import wrong from '../../sounds/wrong-answer.wav';

import Keyboard from '../Keyboard/Keyboard';


import './FirstLetter.css';

import images from '../../images/images.js';


const FirstLetter = () => {



    const [index, setIndex] = useState(0);
    const [isKeyboard, setIsKeyboard] = useState(true);

    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);


    useEffect(() => {
        let randomIndex = Math.floor(Math.random() * images.length);
        setIndex(randomIndex);
        getFocus();
    }, []);


    const onClickLetterHandler = (e) => {
        // console.log(e.target.tagName);
        if (e.target.tagName === 'DIV') {
            return;
        }


        let inputField = document.getElementById("inputOnFocus");

        let imageLetter = images[index].startLetter.toUpperCase();
        console.log("START LETTER " + imageLetter);
        let selectedLetter = e.target.textContent.toUpperCase();
        console.log(selectedLetter);
        if (selectedLetter === imageLetter) {
            inputField.value = selectedLetter;
            inputField.className = "input green";

            correctAnswer();
            document.getElementsByClassName("next")[0].focus();

            // onClickNextHandler();  ///// Automatically change the next image and clear the input field!
        } else {
            inputField.value = selectedLetter;
            inputField.className = "input red";

            wrongAnswer();
            getFocus();
        }

    }

    const onClickNextHandler = () => {
        let randomIndex = Math.floor(Math.random() * images.length);
        setIndex(randomIndex);
        document.getElementById("inputOnFocus").value = "";
        document.getElementById("inputOnFocus").className = "input";
        getFocus();
    }


    const onKeyUpCheck = (e) => {

        console.log(e.target.value);
        if (e.target.tagName === 'DIV' || e.target.value === "") {
            return;
        }

        let imageLetter = images[index].startLetter.toUpperCase();
        // console.log("START LETTER " + imageLetter);
        let selectedLetter = e.target.value.toUpperCase();
        // console.log(selectedLetter);
        if (selectedLetter === imageLetter) {
            // e.target.value = '';

            e.target.value = e.target.value.toUpperCase();
            e.target.className = "input green";
            correctAnswer();
            document.getElementsByClassName("next")[0].focus();
            // onClickNextHandler();
            // e.target.value = '';
        } else {
            e.target.className = "input red";
            wrongAnswer();
            getFocus();
        }
    }


    const onKeyDownHandler = (e) => {
        e.target.value = '';

    }

    const getFocus = () => {
        document.getElementById("inputOnFocus").focus();
    }

    const onClickButtonHandler = () => {
        const hideShowButton = document.getElementById("hideShowButton");
        if (isKeyboard) {
            hideShowButton.className = "hide"
            setIsKeyboard(false);

        } else {
            hideShowButton.className = "show"
            setIsKeyboard(true);
        }

        if (document.getElementById("inputOnFocus").className === "input green") {
            console.log("NEXT BUTTON onFocus");
            document.getElementsByClassName("next")[0].focus();
        } else {
            console.log("GET FOCUS");
            getFocus();
        }

    }



    return (
        <div>
            <div>
                <Link to="/"><p className="home"><b>HOME</b></p></Link>
            </div>

            <button id="hideShowButton" className="show" onClick={onClickButtonHandler}>{isKeyboard ? "Hide keyboard" : "Show keyboard"}</button>

            <h3>First Letter</h3>

            <div>
                <img src={images[index].url} alt="animal" width="200" height="200" />
            </div>
            <div>
                <p><button className="next" onClick={onClickNextHandler}><b>next</b></button></p>
            </div>
            <div id="container" className="lettersInput" onKeyUp={onKeyUpCheck}>
                <input id="inputOnFocus" className="input" size="1" maxLength="1" autofocus onKeyDown={onKeyDownHandler}></input>
            </div>
            <div className="alphabet" onClick={onClickLetterHandler}>

                {isKeyboard ? <Keyboard /> : ""}

            </div>
        </div>
    );
}

export default FirstLetter;
