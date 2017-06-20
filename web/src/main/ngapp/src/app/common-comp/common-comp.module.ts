import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertComponent } from './alert/alert.component';
import { LocaleComponent } from './locale/locale.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NgbModule
    ],
    declarations: [
        AlertComponent,
        LocaleComponent
    ],
    exports: [
        AlertComponent,
        LocaleComponent
    ]

})

export class CommonCompModule { }