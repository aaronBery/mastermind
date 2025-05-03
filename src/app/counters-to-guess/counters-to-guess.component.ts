import { Component, inject, OnInit } from "@angular/core";
import { Input } from "postcss";
import { CountersToGuessService } from "./counter-to-guess.service";
import { CommonModule } from "@angular/common";
import { CounterComponent } from "../counter/counter.component";

@Component({
    standalone: true,
    selector: 'counters-to-guess',
    imports: [
    CommonModule,
    CounterComponent
],
    providers: [
        CountersToGuessService
    ],
    template: `
        <ul class="flex flex-row">
            @for (item of countersToGuessService.selectedCounter(); track $index) {
            <li class="mr-5">
                <counter-component [color]="item"></counter-component>
            </li>
            } @empty {
            <li>There are no items.</li>
            }
        </ul>
    `
})
export class CountersToGuess implements OnInit {
    countersToGuessService = inject(CountersToGuessService);

    ngOnInit(): void {
        this.countersToGuessService.setSelectedCounters();
    }
    
}