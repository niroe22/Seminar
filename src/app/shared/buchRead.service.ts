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

import { type Buch, type BuchArt } from './buch';
import { type Observable, of } from 'rxjs';
import { BUECHER } from './daten';
import { FindError } from './errors';
import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import log from 'loglevel';
import { toBuch } from './buchServer';

export interface Suchkriterien {
    readonly titel: string;
    rating: number | undefined;
    readonly art: BuchArt | '';
    readonly schlagwoerter: { javascript: boolean; typescript: boolean };
}

// Services
// - wiederverwendbarer Code: in ggf. verschiedenen Controller
// - Zugriff auf Daten, z.B. durch Aufruf von RESTful Web Services
// - View (HTML-Template) <- Controller <- Service
// https://angular.io/guide/singleton-services

/**
 * Mocking f&uuml;r die Service-Klasse zu B&uuml;cher. Die Buchobjekte
 * werden durch Mockobjekte bereitgestellt.
 */
@Injectable({ providedIn: 'root' })
export class BuchReadService {
    constructor() {
        log.debug('BuchReadService(): BUECHER=', BUECHER);
    }

    /**
     * {method} find
     * Buecher suchen
     * @param suchkriterien Die Suchkriterien
     */
    find(
        suchkriterien: Suchkriterien | undefined = undefined,
    ): Observable<Buch[] | FindError> {
        let buecher = BUECHER;

        log.debug('BuchReadService.find: suchkriterien=', suchkriterien);
        if (suchkriterien === undefined) {
            // eslint-disable-next-line no-param-reassign
            suchkriterien = {
                titel: '',
                rating: undefined,
                art: '',
                schlagwoerter: { javascript: false, typescript: false },
            };
        }
        const { titel, rating, art, schlagwoerter } = suchkriterien;
        const { javascript, typescript } = schlagwoerter;

        if (titel !== '') {
            buecher = buecher.filter((buch) =>
                buch.titel.toLowerCase().includes(titel.toLowerCase()),
            );
        }
        if (rating !== undefined) {
            buecher = buecher.filter((buch) => buch.rating === rating);
        }
        if (art !== '') {
            buecher = buecher.filter((buch) => buch.art === art);
        }
        if (javascript) {
            buecher = buecher.filter((buch) =>
                buch.schlagwoerter?.includes('JAVASCRIPT'),
            );
        }
        if (typescript) {
            buecher = buecher.filter((buch) =>
                buch.schlagwoerter?.includes('TYPESCRIPT'),
            );
        }
        log.debug('BuchReadService.find: buecher=', buecher);

        if (buecher.length === 0) {
            log.debug('BuchReadService.find: status=NOT_FOUND');
            return of(new FindError(HttpStatusCode.NotFound));
        }

        return of(buecher.map((b) => toBuch(b)));
    }

    /**
     * {method} findById
     * Ein Buch anhand der ID suchen
     * @param id Die ID des gesuchten Buchs
     */
    findById(id: string | undefined): Observable<Buch | FindError> {
        if (id === undefined) {
            return of(new FindError(-1));
        }

        if (BUECHER.length === 0) {
            return of(new FindError(HttpStatusCode.NotFound));
        }

        const buchServer = BUECHER.find((bs) => bs.id === Number(id));
        if (buchServer === undefined) {
            log.debug('BuchReadService.findById: response=NOT_FOUND');
            return of(new FindError(HttpStatusCode.NotFound));
        }

        const buch = toBuch(buchServer);
        log.debug('BuchReadService.findById: buch=', buch);
        return of(buch);
    }
}
