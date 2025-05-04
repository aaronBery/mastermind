import { Component, inject, OnInit } from '@angular/core';
import { CountersToGuessService } from './counters-to-guess/counter-to-guess.service';
import { CountersToGuess } from './counters-to-guess/counters-to-guess.component';
import { GuessesService } from './guesses/guesses.service';
import { GuessComponent } from "./guess/guess.component";

@Component({
  selector: 'app-root',
  imports: [CountersToGuess, GuessComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    CountersToGuessService,
    GuessesService,
  ],
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
