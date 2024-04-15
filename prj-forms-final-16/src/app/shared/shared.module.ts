import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";
import { AlertComponent } from "./alert/alert.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations: [
        DropdownDirective,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        AlertComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        CommonModule,
        AlertComponent
    ],
    entryComponents: [AlertComponent]
})
export class SharedModule {}