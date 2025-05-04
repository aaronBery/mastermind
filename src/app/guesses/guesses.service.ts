import { computed, inject, Injectable, signal } from "@angular/core";
import { Counter, GameSatus } from "../models/counter.model";
import { CountersToGuessService } from "../counters-to-guess/counter-to-guess.service";

@Injectable({
    providedIn: 'root',
})
export class GuessesService {
    gameStatus: GameSatus = 'IN_PROGRESS';
    guesses = signal<(Counter | undefined)[][]>([]);
    currentGuessRow = signal<number>(0);

    counterToGuessService = inject(CountersToGuessService);

    currentRowOfGuesses = computed(() => this.guesses()[this.currentGuessRow()]);

    guess() {
        const numberOfGuesses = this.guesses().length;
        const correctGuess = this.counterToGuessService.selectedCounter() === this.currentRowOfGuesses();


        if (correctGuess) {
            this.gameStatus = 'SUCCESS';
            return;
        }

        if ((this.currentGuessRow() + 1) === numberOfGuesses) {
            this.gameStatus = 'FAILED';

            return;
        }

        this.currentGuessRow.update(row => row + 1);
    }

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