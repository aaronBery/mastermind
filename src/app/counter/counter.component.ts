import { Component, Input } from "@angular/core";

@Component({
    selector: 'counter-component',
    standalone: true,
    styles: `
        .counter {
            width: 20px;
            height: 20px;
            border-radius: 20px;
        }
    `,
    template: `
        <div class="counter" [style]="{'background': color, 'border': '1px solid black' }"></div>
    `
})
export class CounterComponent {
    @Input() color: string | undefined = 'transparent';
}