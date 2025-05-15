import { Component, computed, inject, OnInit } from '@angular/core';
import { CountersToGuessService } from './counters-to-guess/counter-to-guess.service';
import { CountersToGuess } from './counters-to-guess/counters-to-guess.component';
import { GuessesService } from './guesses/guesses.service';
import { GuessComponent } from "./guess/guess.component";
import { MarkComponent } from './components/mark/mark.component';
import { MatButtonModule } from '@angular/material/button';
import { Result, ResultsService } from './results/results.service';
import { ResultsComponent } from "./results/results.component";
import { v4 as uuidv4 } from 'uuid';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  imports: [CountersToGuess, GuessComponent, MarkComponent, MatButtonModule, ResultsComponent, MatTabsModule ],
  styleUrl: './app.component.css',
  providers: [
    CountersToGuessService,
    GuessesService,
    ResultsService
  ],
  template: `
    <main class="w-full grid justify-items-center p-5">
      <h1 class="text-2xl mb-5">Mastermind</h1>
      <mat-tab-group class="w-96">
        <mat-tab label="Play">
          <div class="w-100 text-center mt-5">
            <div class="grid grid-cols-3">
              <div class="col-span-1"></div>
              <div class="col-span-2">
                <ul class="flex flex-row mt-5 h-[30px] items-center">
                  <li>
                    <counters-to-guess [hideValues]="guessesService.gameStatus() === 'IN_PROGRESS'"></counters-to-guess>
                  </li>
                  <li>
                    <button mat-button (click)="startNewGame()">New Game</button>
                  </li>
                </ul>
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
          <div class="w-100 text-center mt-5 p-5">
            @if (guessesService.gameStatus() === 'FAILED') {
              <p>GAME OVER</p>
            } @else if (guessesService.gameStatus() === 'SUCCESS') {
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
        </mat-tab>
        <mat-tab label="Results">
          <div class="p-5">
            <app-results></app-results>
          </div>
        </mat-tab>
      </mat-tab-group>
     </main>
  `
})
export class AppComponent implements OnInit {
  title = 'ng-mastermind';

  countersToGuessService = inject(CountersToGuessService);
  guessesService = inject(GuessesService);
  resultsSercice = inject(ResultsService);

  currentGameData: Result | undefined;

  constructor() {
    toObservable(this.guessesService.gameStatus)
      .pipe(takeUntilDestroyed())
      .subscribe(gamestatus => (this.resultsSercice.updateGameStatus({
        ...this.currentGameData, 
        outcome: gamestatus,
        completionTime: new Date,
      } as Result)));
  }

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame() {
    this.countersToGuessService.setSelectedCounters();
    this.guessesService.reset();

    this.currentGameData = {
      id: uuidv4(),
      outcome: 'IN_PROGRESS',
      startTime: new Date(),
      completionTime: undefined,
    };

    this.resultsSercice.addGame(this.currentGameData);
  }
}
