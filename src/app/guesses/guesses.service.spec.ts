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

  describe('markGuesses', () => {
    it('should mark black for exact matches', () => {
      // Arrange
      const selectedCounters: Counter[] = ['blue', 'red', 'green', 'purple'];
      countersToGuessService.selectedCounter.set(selectedCounters);
      
      service.initializeGuesses();
      service.initizialiseMarks();
      service.updateGuess(0, 0, 'blue');
      service.updateGuess(0, 1, 'red');
      service.updateGuess(0, 2, 'green');
      service.updateGuess(0, 3, 'purple');

      // Act
      (service as any).markGuesses();
      const marks = service.marks()[0];

      // Assert
      expect(marks).toEqual(['black', 'black', 'black', 'black']);
    });

    it('should mark white for correct colors in wrong positions', () => {
      // Arrange
      const selectedCounters: Counter[] = ['blue', 'red', 'green', 'purple'];
      countersToGuessService.selectedCounter.set(selectedCounters);
      
      service.initializeGuesses();
      service.initizialiseMarks();
      service.updateGuess(0, 0, 'red');   // Should be white (correct color, wrong position)
      service.updateGuess(0, 1, 'blue');  // Should be white (correct color, wrong position)
      service.updateGuess(0, 2, 'pink');  // Should be undefined (wrong color)
      service.updateGuess(0, 3, 'green'); // Should be white (correct color, wrong position)

      // Act
      (service as any).markGuesses();
      const marks = service.marks()[0];

      // Assert
      expect(marks).toEqual(['white', 'white', undefined, 'white']);
    });

    it('should not mark white twice', () => {
      // Arrange
      const selectedCounters: Counter[] = ['blue', 'red', 'red', 'purple'];
      countersToGuessService.selectedCounter.set(selectedCounters);
      
      service.initializeGuesses();
      service.initizialiseMarks();
      service.updateGuess(0, 0, 'red');   // Should be white (correct color, wrong position)
      service.updateGuess(0, 1, 'green');  // Should be white (correct color, wrong position)
      service.updateGuess(0, 2, 'green');  // Should be undefined (wrong color)
      service.updateGuess(0, 3, 'green'); // Should be white (correct color, wrong position)

      // Act
      (service as any).markGuesses();
      const marks = service.marks()[0];

      // Assert
      expect(marks).toEqual(['white', undefined, undefined, undefined]);
    });


    it('should mark 3 matching counters some in the correct place correctly', () => {
      // Arrange
      const selectedCounters: Counter[] = ['blue', 'red', 'red', 'purple'];
      countersToGuessService.selectedCounter.set(selectedCounters);
      
      service.initializeGuesses();
      service.initizialiseMarks();
      service.updateGuess(0, 0, 'red');   // Should be white (correct color, wrong position)
      service.updateGuess(0, 1, 'blue');  // Should be white (correct color, wrong position)
      service.updateGuess(0, 2, 'red');  // Should be undefined (wrong color)
      service.updateGuess(0, 3, 'green'); // Should be white (correct color, wrong position)

      // Act
      (service as any).markGuesses();
      const marks = service.marks()[0];

      // Assert
      expect(marks).toEqual(['white', 'white', 'black', undefined]);
    });

    it('should not assign white marker twice when others are all in the right place', () => {
      // Arrange
      const selectedCounters: Counter[] = ['red', 'red', 'gray', 'yellow'];
      countersToGuessService.selectedCounter.set(selectedCounters);
      
      service.initializeGuesses();
      service.initizialiseMarks();
      service.updateGuess(0, 0, 'red');   // Should be white (correct color, wrong position)
      service.updateGuess(0, 1, 'yellow');  // Should be white (correct color, wrong position)
      service.updateGuess(0, 2, 'gray');  // Should be undefined (wrong color)
      service.updateGuess(0, 3, 'yellow'); // Should be white (correct color, wrong position)

      // Act
      (service as any).markGuesses();
      const marks = service.marks()[0];

      // Assert
      expect(marks).toEqual(['black', undefined, 'black', 'black']);
    });

    it('should handle mixed matches correctly', () => {
      // Arrange
      const selectedCounters: Counter[] = ['blue', 'red', 'green', 'purple'];
      countersToGuessService.selectedCounter.set(selectedCounters);
      
      service.initializeGuesses();
      service.initizialiseMarks();
      service.updateGuess(0, 0, 'blue');  // Should be black (exact match)
      service.updateGuess(0, 1, 'green'); // Should be white (correct color, wrong position)
      service.updateGuess(0, 2, 'red');   // Should be white (correct color, wrong position)
      service.updateGuess(0, 3, 'pink');  // Should be undefined (wrong color)

      // Act
      (service as any).markGuesses();
      const marks = service.marks()[0];

      // Assert
      expect(marks).toEqual(['black', 'white', 'white', undefined]);
    });

    it('should not mark undefined guesses', () => {
      // Arrange
      const selectedCounters: Counter[] = ['blue', 'red', 'green', 'purple'];
      countersToGuessService.selectedCounter.set(selectedCounters);
      
      service.initializeGuesses();
      service.initizialiseMarks();
      service.updateGuess(0, 0, 'blue');
      // Leave other positions undefined

      // Act
      (service as any).markGuesses();
      const marks = service.marks()[0];

      // Assert
      expect(marks).toEqual(['black', undefined, undefined, undefined]);
    });
  });
}); 