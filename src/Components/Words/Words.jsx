import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import correct from '../../sounds/correct-answer.wav';
import correctLetter from '../../sounds/correctLetter.mp3';
import wrongLetter from '../../sounds/wrongLetter.mp3';

import Keyboard from '../Keyboard/Keyboard';

import images from '../../images/images.js';
import './Words.css';

const Words = () => {


    const [index, setIndex] = useState(0);
    const [targetId, setTargetId] = useState(1);
    const [isKeyboard, setIsKeyboard] = useState(true);


    const [correctWord] = useSound(correct);
    const [letterCorrect] = useSound(correctLetter);
    const [letterWrong] = useSound(wrongLetter);

    useEffect(() => {
        let randomIndex = Math.floor(Math.random() * images.length);
        setIndex(randomIndex);
        onClickNextHandler();
    }, []);


    const clearHandler = (e) => {
        e.target.value = '';
    }

    const onKeyUpCheckHandler = (e) => {
        console.log(e.target.value);
        let allInputs = document.getElementsByTagName("INPUT");
        if (e.target.value.length > 0) {
            if (e.target.value.toUpperCase() === e.target.name.toUpperCase()) {

                e.target.value = e.target.value.toUpperCase();
                e.target.className = "input green";
                if (e.target.id < allInputs.length) {
                    console.log('Proba 123456789');
                    e.target.nextSibling.focus();
                    setTargetId(Number(e.target.id) + 1);///////////
                }

                letterCorrect();
            } else {

                e.target.className = "input red";

                letterWrong();
            }
        }
    }

    const activeInputHandler = (e) => {
        setTargetId(Number(e.target.id));
        console.log(targetId);
    }


    const onClickNextHandler = () => {
        let randomIndex = Math.floor(Math.random() * images.length);
        setIndex(randomIndex);
        setTargetId(1);


        const output = document.getElementById('container');
        output.innerHTML = '';



        for (let i = 0; i < images[randomIndex].letters.length; i++) {

            let input = document.createElement("INPUT");
            input.className = "input";
            input.setAttribute("maxlength", 1);
            input.setAttribute("size", 1);
            input.setAttribute("id", i + 1);

            input.setAttribute("name", images[randomIndex].letters[i]);

            input.addEventListener('keydown', clearHandler);
            input.addEventListener('keyup', onKeyUpCheckHandler);

            input.addEventListener('click', activeInputHandler);

            output.appendChild(input);

            if (input.id === '1') {
                console.log(input.focus());
            }
        }



    }


    const onKeyUpCheck = (e) => {
        let counter = 0;
        let allInputs = document.getElementsByTagName('input');
        let currentInput = allInputs[targetId - 1] || e.target;
        if (currentInput.tagName === 'INPUT') {
            console.log('input');
            for (let i = 0; i < allInputs.length; i++) {
                if (allInputs[i].className === 'input green') {
                    counter += 1;
                }
            }

            if (counter === allInputs.length) {

                correctWord();
                let nextButton = document.getElementsByClassName("next");
                console.log(nextButton[0]);
                nextButton[0].focus();
            }
        }
    }

    let allInputs = document.getElementsByTagName('input');

    const onClickLetterHandlerInput = (e) => {
        if (e.target.tagName === 'DIV') {
            return;
        }


        allInputs[targetId - 1].value = e.target.textContent;

        if (allInputs[targetId - 1].value.length > 0) {
            if (allInputs[targetId - 1].value.toUpperCase() === allInputs[targetId - 1].name.toUpperCase()) {

                allInputs[targetId - 1].className = "input green";

                if (targetId < allInputs.length) {
                    setTargetId(targetId + 1);
                    allInputs[targetId].focus();
                }
                onKeyUpCheck();
                letterCorrect();
            } else {

                allInputs[targetId - 1].className = "input red";
                allInputs[targetId - 1].focus(); ////// Iavor ///////

                letterWrong();
            }
        }
    }


    const onClickButtonHandler = () => {
        console.log(allInputs[targetId]);
        const hideShowButton = document.getElementById("hideShowButton");
        if (isKeyboard) {
            hideShowButton.className = "hide"
            setIsKeyboard(false);

        } else {
            hideShowButton.className = "show"
            setIsKeyboard(true);
        }
    
        console.log(allInputs[targetId -1]);
        if (allInputs[targetId - 1].className === "input green") {
            if (allInputs[targetId - 1] !== allInputs[allInputs.length - 1]) {

                allInputs[targetId].focus();
            } else {
                onKeyUpCheck();
            }

        } else {
            allInputs[targetId - 1].focus();
        }

    }


    return (
        <div>
            <div>
                <Link to="/"><p className="home"><b>HOME</b></p></Link>
            </div>

            <button id="hideShowButton" className="show" onClick={onClickButtonHandler}>{isKeyboard ? "Hide keyboard" : "Show keyboard"}</button>

            <h3>Words</h3>

            <div>
                <img src={images[index].url} alt="animal" width="200" height="200" />
            </div>
            <div>
                <p><button className="next" onClick={onClickNextHandler}><b>next</b></button></p>
            </div>
            <div id="container" className="lettersInput" onKeyUp={onKeyUpCheck}>

            </div>
            <div className="alphabet" onClick={onClickLetterHandlerInput}>

                {isKeyboard ? <Keyboard /> : ""}

            </div>
        </div>
    );
}

export default Words;