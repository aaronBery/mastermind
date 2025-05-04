import { Injectable, signal } from "@angular/core";
import { Counter } from "../models/counter.model";

@Injectable({
    providedIn: 'root',
})
export class GuessesService {
    guesses = signal<(Counter | undefined)[][]>([]);
    currentGuessRow = signal<number>(0);

    updateGuess(guessIndex: number, counterIndex: number, guessColor: Counter | undefined) {
        this.guesses.update(guesses => {
            const newGuesses: (Counter | undefined)[][] = [];

            guesses.forEach((guess, i) => {
                const copyOfGuess = [...guess];
                
                if (guessIndex === i) {
                    copyOfGuess[counterIndex] = guessColor;
                }

                newGuesses.push(copyOfGuess);
            });
            return newGuesses;
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
        ]);
    }
}