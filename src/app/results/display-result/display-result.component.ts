import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { GameSatus } from "../../models/counter.model";

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-display-result',
    template: `
        @switch (gameStatus) {
            @case ('IN_PROGRESS') {
                <span class="text-gray-600">In Progress</span> 
            }
            @case ('FAILED') {
                <span class="text-red-600">Failed</span>   
            }
            @case ('SUCCESS') {
                <span class="text-green-600">Success</span>   
            }
        }
    `,
})
export class DisplayResultComponent {
    @Input() gameStatus!: GameSatus;
}   