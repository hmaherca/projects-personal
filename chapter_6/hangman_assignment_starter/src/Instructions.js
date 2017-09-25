import React from 'react'

function Instruction(){
    return(
        <div>
            <ul>
                <li>On the hangman page, use your keyboard to select the letter you wish to guess, then hit enter to lock it in.</li>
                <li>If you've guessed correctly, the answer key will begin to be filled in with the letters you've chosen.</li>
                <li>Incorrect guesses will begin to form the hangman, with all guesses being displayed below the answer key.</li>
                <li>The Highscore page houses a history of all the games you've played, </li>
            </ul>
        </div>
    )
}

export default Instruction