import { ChangeDetectionStrategy, Component, inject, Input } from "@angular/core";
import { CounterComponent } from "../counter/counter.component";
import { Counter } from "../models/counter.model";
import { CounterPickerComponent } from "../counter-picker/counter-picker.component";
import { GuessesService } from "../guesses/guesses.service";

@Component({
    standalone: true,
    imports: [CounterComponent, CounterPickerComponent],
    selector: 'guess-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
       <ul class="flex flex-row mt-5">
        @for (item of guesses; track $index) {
            <li class="mr-5">
                <counter-component [color]="item" [referencePosition]="$index" (onSelection)="openPicker($event)"></counter-component>
            </li>
        }
            <li><button>Guess</button></li>
        </ul>
        <counter-picker [class]="{ 'hidden': !pickerOpen }" (onSelection)="selectionMade($event)" [referencePosition]="currentlyEditedCounterIndex" ></counter-picker>
    `
})
export class GuessComponent {
    @Input() guesses: (Counter | undefined)[] = [];
    @Input() guessRow = -1;

    guessesService = inject(GuessesService);

    pickerOpen = false;
    currentlyEditedCounterIndex = -1;

    openPicker($event: { color: string | undefined, referencePosition: number }) {
        const { referencePosition } = $event;
        this.pickerOpen = true;
        this.currentlyEditedCounterIndex = referencePosition;
    }

    selectionMade($event: { color: Counter | undefined, referencePosition: number }) {
        const { color, referencePosition } = $event;
        this.pickerOpen = false;

        this.guessesService.updateGuess(this.guessRow, referencePosition, color);
    }
}