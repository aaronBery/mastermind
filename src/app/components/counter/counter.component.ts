import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Counter } from "../../models/counter.model";

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
        <div class="counter"  
            [class]="{'cursor-pointer': !disabled}"
            [style]="{'background': (color ?? 'transparent'), 'border': highlighted ? ('1px solid black') : ('1px solid #D3D3D3') }" 
            (click)="colorSelected(color)">
        </div>
    `
})
export class CounterComponent {
    @Input() disabled = false;
    @Input() highlighted = false;
    @Input() color: Counter | undefined;
    @Input() referencePosition: number = -1;
    @Output() onSelection = new EventEmitter<{color: Counter | undefined, referencePosition: number }>();

    colorSelected(color: Counter | undefined) {
        if (this.disabled) {
            return;
        }
        const { referencePosition } = this;
        this.onSelection.emit({ color, referencePosition });
    }
}