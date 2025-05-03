import { Inject, Injectable, signal } from "@angular/core";


export type Counter = 'blue' | 'green' | 'red' | 'purple' | 'pink';

@Injectable({
    providedIn: 'root'
})
export class CountersToGuessService {
    selectedCounter = signal<(Counter | undefined)[]>([undefined, undefined, undefined, undefined]);

    setSelectedCounters() {
        // todo random generte these
        this.selectedCounter.set([
            'blue',
            'blue',
            'blue',
            'blue'
        ])
    }
}