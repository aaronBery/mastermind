import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Counter } from "../models/counter.model";

@Component({
    selector: 'counter-component',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: `
        .counter {
            width: 20px;
            height: 20px;
            border-radius: 20px;
        }
    `,
    template: `
        <div class="counter cursor-pointer" [style]="{'background': (color ?? 'transparent'), 'border': highlighted ? ('1px solid black') : ('1px solid #D3D3D3') }" 
            (click)="colorSelected(color)">
        </div>
    `
})
export class CounterComponent {
    @Input() highlighted = false;
    @Input() color: Counter | undefined;
    @Input() referencePosition: number = -1;
    @Output() onSelection = new EventEmitter<{color: Counter | undefined, referencePosition: number }>();

    colorSelected(color: Counter | undefined) {
        const { referencePosition } = this;
        this.onSelection.emit({ color, referencePosition });
    }
}