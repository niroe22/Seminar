/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, input } from '@angular/core';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r die Darstellung einer Fehlermeldung durch das Tag
 * &lt;app-error-message [text]="..."&gt;
 */
@Component({
    selector: 'app-error-message',
    templateUrl: './error-message.component.html',
    imports: [NgIf],
    standalone: true,
})
export class ErrorMessageComponent {
    // Property Binding: <app-error-message [text]="...">
    // siehe InputMetadata
    text = input<string | undefined>();

    constructor() {
        log.debug('ErrorMessageComponent()');
    }
}
