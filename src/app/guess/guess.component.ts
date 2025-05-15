import { ChangeDetectionStrategy, Component, computed, inject, Input } from "@angular/core";
import { CounterComponent } from "../components/counter/counter.component";
import { Counter } from "../models/counter.model";
import { CounterPickerComponent } from "../counter-picker/counter-picker.component";
import { GuessesService } from "../guesses/guesses.service";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';

@Component({
    standalone: true,
    imports: [CommonModule, CounterComponent, CounterPickerComponent, MatButtonModule],
    selector: 'guess-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
       <ul class="flex flex-row mt-5 h-[30px] items-center">
        @for (item of guesses; track $index) {
            <li class="mr-5">
                <counter-component [disabled]="guessRow !== this.guessesService.currentGuessRow() || guessesService.gameStatus() !== 'IN_PROGRESS'" [highlighted]="$index === guessesService.currentlyEditedCounterIndex()" [color]="item" [referencePosition]="$index" (onSelection)="openPicker($event)"></counter-component>
            </li>
        }
        @if (isCurrentGuessRow() && guessesService.gameStatus() === 'IN_PROGRESS') {
            <li><button (click)="guessesService.guess()" mat-stroked-button>Check</button></li>
        }
        </ul>
        <counter-picker [class]="{ 'hidden': !pickerOpen }" (onSelection)="selectionMade($event)" [referencePosition]="guessesService.currentlyEditedCounterIndex()" ></counter-picker>
    `
})
export class GuessComponent {
    @Input() guesses: (Counter | undefined)[] = [];
    @Input() guessRow = -1;

    guessesService = inject(GuessesService);

    pickerOpen = false;

    isCurrentGuessRow = computed(() => this.guessesService.currentGuessRow() === this.guessRow);

    openPicker($event: { color: string | undefined, referencePosition: number }) {
        const { referencePosition } = $event;
        this.pickerOpen = true;
        this.guessesService.currentlyEditedCounterIndex.set(referencePosition);
    }

    selectionMade($event: { color: Counter | undefined, referencePosition: number }) {
        const { color, referencePosition } = $event;
        this.pickerOpen = false;

        this.guessesService.updateGuess(this.guessRow, referencePosition, color);
    }
}