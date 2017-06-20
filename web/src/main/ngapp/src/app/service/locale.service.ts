import { Injectable, LOCALE_ID, Inject } from '@angular/core';

@Injectable()
export class LocaleService {

    constructor( @Inject(LOCALE_ID) private localeId: string) { }

    public getLocaleId(): string {
        return this.localeId;
    }
}