import { TestBed } from '@angular/core/testing';
import { GuessesService } from './guesses.service';
import { CountersToGuessService } from '../counters-to-guess/counter-to-guess.service';
import { Counter } from '../models/counter.model';

describe('GuessesService', () => {
  let service: GuessesService;
  let countersToGuessService: CountersToGuessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GuessesService,
        CountersToGuessService
      ]
    });
    service = TestBed.inject(GuessesService);
    countersToGuessService = TestBed.inject(CountersToGuessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isCorrectGuess', () => {
    it('should return true when current guesses match selected counters', () => {
      // Arrange
      const selectedCounters: Counter[] = ['blue', 'red', 'green', 'purple'];
      countersToGuessService.selectedCounter.set(selectedCounters);
      
      service.initializeGuesses();
      service.updateGuess(0, 0, 'blue');
      service.updateGuess(0, 1, 'red');
      service.updateGuess(0, 2, 'green');
      service.updateGuess(0, 3, 'purple');

      // Act
      const result = (service as any).isCorrectGuess();

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when current guesses do not match selected counters', () => {
      // Arrange
      const selectedCounters: Counter[] = ['blue', 'red', 'green', 'purple'];
      countersToGuessService.selectedCounter.set(selectedCounters);
      
      service.initializeGuesses();
      service.updateGuess(0, 0, 'blue');
      service.updateGuess(0, 1, 'red');
      service.updateGuess(0, 2, 'green');
      service.updateGuess(0, 3, 'pink'); // Different from selected counter

      // Act
      const result = (service as any).isCorrectGuess();

      // Assert
      expect(result).toBe(false);
    });

    it('should return false when any guess is undefined', () => {
      // Arrange
      const selectedCounters: Counter[] = ['blue', 'red', 'green', 'purple'];
      countersToGuessService.selectedCounter.set(selectedCounters);
      
      service.initializeGuesses();
      service.updateGuess(0, 0, 'blue');
      service.updateGuess(0, 1, 'red');
      // Leaving position 2 and 3 undefined

      // Act
      const result = (service as any).isCorrectGuess();

      // Assert
      expect(result).toBe(false);
    });
  });
}); 