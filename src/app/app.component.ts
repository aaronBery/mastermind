import { Component, computed, inject, OnInit } from '@angular/core';
import { CountersToGuessService } from './counters-to-guess/counter-to-guess.service';
import { CountersToGuess } from './counters-to-guess/counters-to-guess.component';
import { GuessesService } from './guesses/guesses.service';
import { GuessComponent } from "./guess/guess.component";
import { MarkComponent } from './components/mark/mark.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [CountersToGuess, GuessComponent, MarkComponent, MatButtonModule],
  styleUrl: './app.component.css',
  providers: [
    CountersToGuessService,
    GuessesService,
  ],
  template: `
    <main class="w-full grid justify-items-center p-5">
      <h1 class="text-2xl mb-5">Mastermind</h1>
      <div class="w-100 text-center mt-5">
        <div class="grid grid-cols-3">
          <div class="col-span-1"></div>
          <div class="col-span-2">
            <counters-to-guess [hideValues]="guessesService.gameStatus === 'IN_PROGRESS'"></counters-to-guess>
          </div>
        </div>
        <div class="grid grid-cols-3">
          <div class="col-span-1">
            @for(marks of guessesService.marks(); track $index) {
              <ul class="flex flex-row mt-5 h-[30px] items-center">
              @for(mark of marks; track $index) {
                <li class="mr-5">
                    <mark-component [color]="mark"></mark-component>
                </li>
              }
              </ul>
            }
          </div>
          <div class="col-span-2">
            @for (guess of guessesService.guesses(); track $index) {
              <guess-component [guesses]="guess" [guessRow]="$index"></guess-component>
            }
          </div>
        </div>
      </div>
      <div class="w-100 text-center mt-5">
        @if (guessesService.gameStatus === 'FAILED') {
          <p>GAME OVER</p>
        } @else if (guessesService.gameStatus === 'SUCCESS') {
          <p>WINNER!</p>
        }

        <p>The aim of the game is to guess the hidden sequence (note colours can be duplicated). 
          After each guess you are scored with black and white markers. 
          Black markers indicate the correct colour in the correct position. 
          White markers indicate a correct colour in the wrong position. 
          You must guess the correct combination in {{guessesService.guesses().length}} attempts.
        </p>
        <p class="mt-5">
          <a mat-stroked-button href="https://en.wikipedia.org/wiki/Mastermind_(board_game)#Gameplay_and_rules" target="_blank">Rules</a> 
        </p>
      </div>
     </main>
  `
})
export class AppComponent implements OnInit {
  title = 'ng-mastermind';

  countersToGuessService = inject(CountersToGuessService);
  guessesService = inject(GuessesService);

  ngOnInit(): void {
    this.countersToGuessService.setSelectedCounters();

    this.guessesService.initializeGuesses();
    this.guessesService.initizialiseMarks();
  }
}
