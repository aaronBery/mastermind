import { computed, inject, Injectable, signal } from "@angular/core";
import { Counter, GameSatus, Marks } from "../models/counter.model";
import { CountersToGuessService } from "../counters-to-guess/counter-to-guess.service";

@Injectable({
    providedIn: 'root',
})
export class GuessesService {
    gameStatus = signal<GameSatus>('IN_PROGRESS');
    guesses = signal<(Counter | undefined)[][]>([]);
    marks = signal<(Marks | undefined)[][]>([]);
    currentGuessRow = signal<number>(0);
    currentlyEditedCounterIndex = signal<number>(-1);

    counterToGuessService = inject(CountersToGuessService);

    currentRowOfGuesses = computed(() => this.guesses()[this.currentGuessRow()]);

    reset() {
        this.gameStatus.set('IN_PROGRESS');
        this.initializeGuesses();
        this.initizialiseMarks();
        this.currentGuessRow.set(0);
        this.currentlyEditedCounterIndex.set(-1);
    }

    guess() {
        const numberOfGuesses = this.guesses().length;
        
       this.markGuesses();

        if (this.isCorrectGuess()) {
            this.gameStatus.set('SUCCESS');
            return;
        }

        if ((this.currentGuessRow() + 1) === numberOfGuesses) {
            this.gameStatus.set('FAILED');

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

    initizialiseMarks() {
        const blankMarks: (Marks | undefined)[] = [undefined, undefined, undefined, undefined];

        this.marks.set([
            [...blankMarks],
            [...blankMarks],
            [...blankMarks],
            [...blankMarks],
            [...blankMarks],
            [...blankMarks],
        ]);
    }

    private isCorrectGuess() {
        const currentGuesses = this.currentRowOfGuesses();
        const selectedCounters = this.counterToGuessService.selectedCounter();
        
        if (!currentGuesses || !selectedCounters) {
            return false;
        }

        return currentGuesses.every((guess, index) => guess === selectedCounters[index]);
    }

    private markGuesses() {
        const currentGuesses = this.currentRowOfGuesses();
        const selectedCounters = this.counterToGuessService.selectedCounter();
        
        if (!currentGuesses || !selectedCounters) {
            return;
        }

        const marks: (Marks | undefined)[] = Array(4).fill(undefined);
        const blackMarkedIndexes: number[] = [];
        const whiteAssignedIndexes: number[] = [];

        // First pass: mark black for exact matches
        currentGuesses.forEach((guess, index) => {
            if (guess === selectedCounters[index]) {
                marks[index] = 'black';
                blackMarkedIndexes.push(index);
            }
        });

        currentGuesses.forEach((guess, index) => {
            const selectedCounterMatchedInWrongPositionIndex = selectedCounters.findIndex((selectedCounter, selectedCounterIndex) => 
                selectedCounter === guess && !blackMarkedIndexes.includes(selectedCounterIndex) && !blackMarkedIndexes.includes(index)
                && !whiteAssignedIndexes.includes(selectedCounterIndex)) 

            if (selectedCounterMatchedInWrongPositionIndex > -1) {
                marks[index] = 'white';
                whiteAssignedIndexes.push(selectedCounterMatchedInWrongPositionIndex);
            }
        });

        // Update marks for current row
        this.marks.update(currentMarks => {
            const newMarks = [...currentMarks];
            newMarks[this.currentGuessRow()] = marks;
            return newMarks;
        });
    }


}