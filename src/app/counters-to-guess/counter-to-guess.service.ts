import { Injectable, signal } from "@angular/core";
import { Counter } from "../models/counter.model";


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