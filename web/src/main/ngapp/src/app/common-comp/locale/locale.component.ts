import { Component, Input } from '@angular/core';

import { LocaleService } from '../../service/locale.service';

@Component({
    moduleId: module.id,
    selector: 'app-locale',
    templateUrl: './locale.component.html'
})
export class LocaleComponent {

    languages = [
        { code: 'en', label: 'English' },
        { code: 'ru', label: 'Русский' }
    ];

    constructor(private localeService: LocaleService) { }

    getLocaleId(): string {
        if (this.localeService.getLocaleId()) {
            // en-US in dev mode 
            return this.localeService.getLocaleId().substring(0, 2);
        }
        return 'en';
    }
}
