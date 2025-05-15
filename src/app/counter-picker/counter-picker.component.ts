import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from "@angular/core";
import { } from '@angular/material/dialog'
import { CounterComponent } from "../components/counter/counter.component";
import { Counter, counters } from "../models/counter.model";

@Component({
    selector: 'counter-picker',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    CounterComponent
],
    styles: `
        .picker { position: absolute; border: 1px solid; background: white;}
    `,
    template: `
        <ul class="picker grid grid-cols-3 gap-5 p-10">
            @for (color of CHOICES; track $index) {
                <li>
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