import { Component, computed, inject, OnInit } from '@angular/core';
import { CountersToGuessService } from './counters-to-guess/counter-to-guess.service';
import { CountersToGuess } from './counters-to-guess/counters-to-guess.component';
import { GuessesService } from './guesses/guesses.service';
import { GuessComponent } from "./guess/guess.component";
import { MarkComponent } from './components/mark/mark.component';

@Component({
  selector: 'app-root',
  imports: [CountersToGuess, GuessComponent, MarkComponent],
  styleUrl: './app.component.css',
  providers: [
    CountersToGuessService,
    GuessesService,
  ],
  template: `
    <main class="w-full grid justify-items-center">
      <h1>Mastermind</h1>
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
