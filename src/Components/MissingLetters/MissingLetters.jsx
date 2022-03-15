import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import correct from '../../sounds/correct-answer.wav';
import correctLetter from '../../sounds/correctLetter.mp3';
import wrongLetter from '../../sounds/wrongLetter.mp3';

import Keyboard from '../Keyboard/Keyboard';

import images from '../../images/images.js';
import './MissingLetters.css';

const MissingLetters = () => {


    const [index, setIndex] = useState(0);
    const [targetId] = useState(1);
    const [isKeyboard, setIsKeyboard] = useState(true);


    const [correctWord] = useSound(correct);
    const [letterCorrect] = useSound(correctLetter);
    const [letterWrong] = useSound(wrongLetter);

    useEffect(() => {
        let randomIndex = Math.floor(Math.random() * images.length);
        setIndex(randomIndex);
        onClickNextHandler();
    }, []);


    let emptyLettersArray = [];

    const clearHandler = (e) => {
        e.target.value = '';
    }

    const onKeyUpCheckHandler = (e) => {

        let allInputs = document.getElementsByTagName("INPUT");
        if (e.target.value.length > 0) {
            if (e.target.value.toUpperCase() === e.target.name.toUpperCase()) {

                e.target.value = e.target.value.toUpperCase();
                e.target.className = "input green";
                if (e.target.id < allInputs.length) {
                    let allEmptyInputs = document.getElementsByClassName("empty");
                    if (allEmptyInputs.length > 0) {

                        allEmptyInputs[0].focus();
                    }
                    // setTargetId(Number(e.target.id) + 1);///////////
                }

                letterCorrect();
            } else {

                e.target.className = "input red";

                letterWrong();
            }
        }
    }

    const activeInputHandler = (e) => {
        // setTargetId(Number(e.target.id));  ////////////////////////
        // console.log(targetId);
    }


    const onClickNextHandler = () => {
        let randomIndex = Math.floor(Math.random() * images.length);
        setIndex(randomIndex);
        // setTargetId(1); //////////////////////


        const output = document.getElementById('container');
        output.innerHTML = '';

        let randomNum = Math.ceil(images[randomIndex].letters.length / 2);

        // if (randomNum === 0) {
        //     randomNum = 1;
        // }

        let showLettersArray = [];

        emptyLettersArray = [];

        while (showLettersArray.length < randomNum) {
            let numberToAddToArray = Math.floor(Math.random() * images[randomIndex].letters.length);
            if (showLettersArray.includes(numberToAddToArray)) {

            } else {
                showLettersArray.push(numberToAddToArray);
            }
        }

        console.log('Array ' + showLettersArray);

        let isOnFocus = false;
        let useThisIndexForFocus = -100;

        for (let i = 0; i < images[randomIndex].letters.length; i++) {



            console.log('RandomNum ' + randomNum);

            let input = document.createElement("INPUT");
            input.className = "input empty";

            input.setAttribute("maxlength", 1);
            input.setAttribute("size", 1);
            input.setAttribute("id", i + 1);

            input.setAttribute("name", images[randomIndex].letters[i]);


            if (showLettersArray.includes(i)) {

                input.setAttribute("value", images[randomIndex].letters[i].toUpperCase());
                input.setAttribute("readonly", true);
                input.className = "input green";

            } else {

                emptyLettersArray.push(i);

                input.addEventListener('keydown', clearHandler);
                input.addEventListener('keyup', onKeyUpCheckHandler);

                input.addEventListener('click', activeInputHandler);

                if (isOnFocus === false) {
                    useThisIndexForFocus = i;

                    console.log('SUPER Focus ' + isOnFocus);
                }

                isOnFocus = true;
                console.log("TOO LATE " + isOnFocus);
            }

            output.appendChild(input);


            // if (input.id === '1') {
            //     input.focus();
            // }
        }

        if (useThisIndexForFocus >= 0) {

            let allInputs = document.getElementsByTagName('input');
            allInputs[useThisIndexForFocus].focus();
        }

    }

    let allInputs = document.getElementsByTagName('input');

    const onKeyUpCheck = (e) => {
        let counter = 0;
        let currentInput = allInputs[targetId - 1] || e.target;
        if (currentInput.tagName === 'INPUT') {

            for (let i = 0; i < allInputs.length; i++) {
                if (allInputs[i].className === 'input green') {
                    counter += 1;
                }
            }

            if (counter === allInputs.length) {

                correctWord();
                let nextButton = document.getElementsByClassName("next");

                nextButton[0].focus();
            }
        }
    }

    
    const onClickLetterHandlerInput = (e) => {
        let allEmptyInputs = document.getElementsByClassName("empty");
        let allRedInputs = document.getElementsByClassName("red");

        if (e.target.tagName === 'DIV') {
            return;
        }

        if (allRedInputs && allRedInputs.length > 0) {
            allRedInputs[0].value = e.target.textContent;
        } else if (allEmptyInputs.length > 0) {
            allEmptyInputs[0].value = e.target.textContent;
        }
        // let allInputs = document.getElementsByTagName('input');
        // allInputs[targetId - 1].value = e.target.textContent;

        if (allEmptyInputs.length > 0 && allEmptyInputs[0].value.length > 0) {
            if (allEmptyInputs[0].value.toUpperCase() === allEmptyInputs[0].name.toUpperCase()) {

                allEmptyInputs[0].className = "input green";

                if (allEmptyInputs.length >= 1) {
                    // if (targetId < allInputs.length) {
                    // setTargetId(targetId + 1);
                    allEmptyInputs[0].focus();
                    // allInputs[targetId].focus();
                }
                onKeyUpCheck();
                letterCorrect();
            } else {

                allEmptyInputs[0].className = "input red empty";
                allEmptyInputs[0].focus(); ////// Iavor ///////

                letterWrong();
            }
        } else if (document.getElementsByClassName("red").length > 0) {
            if (allRedInputs[0].value.toUpperCase() === allRedInputs[0].name.toUpperCase()) {

                allRedInputs[0].className = "input green";

                if (allRedInputs.length >= 1) {
                    // if (targetId < allInputs.length) {
                    // setTargetId(targetId + 1);
                    allRedInputs[0].focus();
                    // allInputs[targetId].focus();
                }
                onKeyUpCheck();
                letterCorrect();
            } else {

                allRedInputs[0].className = "input red empty";
                allRedInputs[0].focus(); ////// Iavor ///////

                letterWrong();
            }
            allRedInputs[0].focus();
        }

    }


    const onClickButtonHandler = () => {
        let allEmptyInputs = document.getElementsByClassName("empty");
        let allRedInputs = document.getElementsByClassName("red");


        console.log(allInputs[targetId]);
        const hideShowButton = document.getElementById("hideShowButton");
        if (isKeyboard) {
            hideShowButton.className = "hide"
            setIsKeyboard(false);

        } else {
            hideShowButton.className = "show"
            setIsKeyboard(true);
        }


        if (allEmptyInputs && allEmptyInputs.length > 0) {

            allEmptyInputs[0].focus();
        } else if (allRedInputs && allRedInputs.length > 0) {
            allRedInputs[0].focus();
        } else {
            onKeyUpCheck();
        }


        // console.log(allInputs[targetId -1]);
        // if (allInputs[targetId - 1].className === "input green") {
        //     if (allInputs[targetId - 1] !== allInputs[allInputs.length - 1]) {

        //         allInputs[targetId].focus();
        //     } else {
        //         onKeyUpCheck();
        //     }

        // } else {
        //     allInputs[targetId - 1].focus();
        // }

    }


    return (
        <div>
            <div>
                <Link to="/"><p className="home"><b>HOME</b></p></Link>
            </div>

            <button id="hideShowButton" className="show" onClick={onClickButtonHandler}>{isKeyboard ? "Hide keyboard" : "Show keyboard"}</button>

            <h3>Missling Letters</h3>

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

export default MissingLetters;