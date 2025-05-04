import { Injectable, signal } from "@angular/core";
import { Counter, counters } from "../models/counter.model";


@Injectable({
    providedIn: 'root'
})
export class CountersToGuessService {
    selectedCounter = signal<(Counter | undefined)[]>([undefined, undefined, undefined, undefined]);

    setSelectedCounters() {
        const randomCounters: Counter[] = Array(4).fill(null).map(() => {
            const randomIndex = Math.floor(Math.random() * counters.length);
            return counters[randomIndex];
        });
        
        this.selectedCounter.set(randomCounters);
    }
}