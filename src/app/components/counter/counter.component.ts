import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
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
            [class]="{'cursor-pointer': !disabled()}"
            [style]="{'background': (color() ?? 'transparent'), 'border': highlighted() && !disabled() ? ('1px solid black') : ('1px solid #D3D3D3') }" 
            (click)="colorSelected(color())">
        </div>
    `
})
export class CounterComponent {
    disabled = input<boolean>(false);
    highlighted = input<boolean>(false);
    color = input<Counter>();
    referencePosition = input<number>(-1);
    onSelection = output<{color: Counter | undefined, referencePosition: number }>();

    colorSelected(color: Counter | undefined) {
        if (this.disabled()) {
            return;
        }
        const referencePosition = this.referencePosition();
        this.onSelection.emit({ color, referencePosition });
    }
}