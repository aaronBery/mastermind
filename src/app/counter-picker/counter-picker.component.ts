import { Component, EventEmitter, Output, Input } from "@angular/core";
import { } from '@angular/material/dialog'
import { CounterComponent } from "../counter/counter.component";
import { Counter, counters } from "../models/counter.model";

@Component({
    selector: 'counter-picker',
    standalone: true,
    imports: [
    CounterComponent
],
    styles: `
        .picker { position: absolute; border: 1px solid; background: white;}
    `,
    template: `
        <ul class="picker flex flex-row p-10">
            @for (color of CHOICES; track $index) {
                <li class="mr-5">
                    <counter-component [color]="color" (onSelection)="selection($event)" [referencePosition]="referencePosition"></counter-component>
                </li>
            }
        </ul>
    `
})
export class CounterPickerComponent {
    @Input() referencePosition = -1;
    @Output() onSelection = new EventEmitter<{color: Counter | undefined, referencePosition: number}>();
    
    CHOICES = [...counters];

    selection($event: {color: Counter | undefined, referencePosition: number}) {
        const { color, referencePosition } = $event;
        this.onSelection.emit({color, referencePosition});
    }
}