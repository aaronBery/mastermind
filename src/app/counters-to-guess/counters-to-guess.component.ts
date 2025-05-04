import { Component, inject, OnInit, Input } from "@angular/core";
import { CountersToGuessService } from "./counter-to-guess.service";
import { CommonModule } from "@angular/common";
import { CounterComponent } from "../counter/counter.component";
import { HiddenComponent } from "../components/hidden-counter/hidden-counter.component";
import { GuessesService } from "../guesses/guesses.service";

@Component({
    standalone: true,
    selector: 'counters-to-guess',
    imports: [
    CommonModule,
    CounterComponent,
    HiddenComponent,
],
    template: `
        <ul class="flex flex-row">
            @for (item of countersToGuessService.selectedCounter(); track $index) {
            <li class="mr-5">
                <ng-content *ngIf="!hideValues; else hiddenCounterTmpl">
                    <counter-component [color]="item"></counter-component>
                </ng-content>
            </li>
            } @empty {
            <li>There are no items.</li>
            }
        </ul>
        <ng-template #hiddenCounterTmpl>
            <hidden-counter></hidden-counter>
        </ng-template>
    `
})
export class CountersToGuess implements OnInit {
    @Input() hideValues = true;
    
    countersToGuessService = inject(CountersToGuessService);
    guessesService = inject(GuessesService);

    ngOnInit(): void {
        this.countersToGuessService.setSelectedCounters();
    }
    
}