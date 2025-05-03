import { Component, Input } from "@angular/core";
import { Counter } from "../counters-to-guess/counter-to-guess.service";
import { CounterComponent } from "../counter/counter.component";

@Component({
    standalone: true,
    imports: [CounterComponent],
    providers: [],
    selector: 'guess-component',
    template: `
       <ul class="flex flex-row mt-5">
        @for (item of guesses; track $index) {
            <li class="mr-5">
                <counter-component [color]="item"></counter-component>
            </li>
        }
        </ul>
    `
})
export class GuessComponent {
    @Input() guesses: (Counter | undefined)[] = [];
}