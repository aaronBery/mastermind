import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Marks } from "../../models/counter.model";

@Component({
    selector: 'mark-component',
    standalone: true,
    styles: `
        .mark {
            width: 10px;
            height: 10px;
            border-radius: 10px;
        }
    `,
    template: `
        <div class="mark" [style]="{'background': (color ?? 'transparent'), 'border': color ? '1px solid black' : '1px dashed grey'}">
        </div>
    `
})
export class MarkComponent {
    @Input() color: Marks | undefined;
}