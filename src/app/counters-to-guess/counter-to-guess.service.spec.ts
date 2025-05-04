import { TestBed } from '@angular/core/testing';
import { CountersToGuessService } from './counter-to-guess.service';
import { Counter, counters } from '../models/counter.model';

describe('CountersToGuessService', () => {
  let service: CountersToGuessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountersToGuessService]
    });
    service = TestBed.inject(CountersToGuessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setSelectedCounters', () => {
    it('should generate 4 random counters', () => {
      // Act
      service.setSelectedCounters();
      const result = service.selectedCounter();

      // Assert
      expect(result.length).toBe(4);
      result.forEach(counter => {
        expect(counter).toBeDefined();
        expect(counters).toContain(counter as Counter);
      });
    });

    it('should generate different counters on multiple calls', () => {
      // Act
      service.setSelectedCounters();
      const firstResult = [...service.selectedCounter()];
      
      service.setSelectedCounters();
      const secondResult = service.selectedCounter();

      // Assert
      // Note: This test might occasionally fail due to random chance
      // of getting the same sequence twice
      expect(firstResult).not.toEqual(secondResult);
    });

    it('should only use valid counter values', () => {
      // Act
      service.setSelectedCounters();
      const result = service.selectedCounter();

      // Assert
      result.forEach(counter => {
        expect(counter).toBeDefined();
        expect(counters).toContain(counter as Counter);
      });
    });
  });
}); 