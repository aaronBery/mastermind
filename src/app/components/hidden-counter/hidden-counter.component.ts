import { Component } from "@angular/core";

@Component({
    selector: 'hidden-counter',
    standalone: true,
    styles: `
    .hidden-counter {
        width: 20px;
        height: 20px;
        border-radius: 20px;
        border: 1px solid black;
    }
    `,
    template: `
        <div class="hidden-counter grid content-center">
            ?
        </div>
    `       
})
export class HiddenComponent {

}