import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { ResultsService } from "./results.service";
import { DisplayResultComponent } from "./display-result/display-result.component";

@Component({
    standalone: true,
    selector: 'app-results',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ DisplayResultComponent ],
    template: `
        <p>Games won: {{gamesWon()}}</p>
        <br />
        <ul>
        @for (result of resultsService.gameHistory(); track $index) {
            <li class="grid grid-cols-2">
                <span class="col-span-1">ID: {{result.id.slice(0, 5) }}</span>
                <span class="col-span-1 grid justify-self-end"><app-display-result [gameStatus]="result.outcome"></app-display-result></span
            ></li>
        }
        </ul>
    `,
    styles: ``
})
export class ResultsComponent {
    resultsService = inject(ResultsService);

    gamesWon = computed(() => this.resultsService.gameHistory().filter(history => history.outcome === 'SUCCESS').length);
}