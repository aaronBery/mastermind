import { Injectable, signal } from "@angular/core";
import { Counter } from "../counters-to-guess/counter-to-guess.service";

@Injectable({
    providedIn: 'root',
})
export class GuessesService {
    guesses = signal<(Counter | undefined)[][]>([]);

    addGuess(guess: (Counter | undefined)[]) {
        this.guesses.update(guesses => {
            guesses.push(guess);

            return [...guesses];
        });
    }

    initializeGuesses() {
        const blankGuesses = [undefined, undefined, undefined, undefined];

        this.guesses.set([
            [...blankGuesses],
            [...blankGuesses],
            [...blankGuesses],
            [...blankGuesses],
            [...blankGuesses],
            [...blankGuesses],
        ])
    }
}