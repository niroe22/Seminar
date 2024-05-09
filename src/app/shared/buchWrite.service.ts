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

import { BUECHER, nextId, remove } from './daten';
import { type Buch } from './buch';
import { Injectable } from '@angular/core';
import log from 'loglevel';
import { of } from 'rxjs';
import { toBuchServer } from './buchServer';

// Services
// - wiederverwendbarer Code: in ggf. verschiedenen Controller
// - Zugriff auf Daten, z.B. durch Aufruf von RESTful Web Services
// - View (HTML-Template) <- Controller <- Service

/**
 * Mocking f&uuml;r die Service-Klasse zu B&uuml;cher. Die Buchobjekte
 * werden durch Mockobjekte bereitgestellt.
 */
@Injectable({ providedIn: 'root' })
export class BuchWriteService {
    constructor() {
        log.debug('BuchWriteService(): BUECHER=', BUECHER);
    }

    /**
     * Ein neues Buch anlegen
     * @param neuesBuch Das JSON-Objekt mit dem neuen Buch
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     */
    save(neuesBuch: Buch) {
        log.debug('BuchWriteService.save: neuesBuch=', neuesBuch);

        neuesBuch.id = nextId().toString();
        BUECHER.push(toBuchServer(neuesBuch));
        log.debug('BuchWriteService.save: BUECHER=', BUECHER);

        return of(neuesBuch.id);
    }

    /**
     * Ein vorhandenes Buch aktualisieren
     * @param buch Das JSON-Objekt mit den aktualisierten Buchdaten
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     */
    update(buch: Buch) {
        log.debug('BuchWriteService.update: buch=', buch);
        for (const [idx, b] of BUECHER.entries()) {
            if (b.id === buch.id) {
                BUECHER[idx] = toBuchServer(buch);
                log.debug('BUECHER=', BUECHER);
                return of(true);
            }
        }

        return of(true);
    }

    /**
     * Ein Buch l&ouml;schen
     * @param buch Das JSON-Objekt mit dem zu loeschenden Buch
     */
    remove(buch: Buch) {
        log.debug('BuchWriteService.remove: buch=', buch);
        const { id } = buch;
        if (id !== undefined) {
            const idNumber = Number(id);
            remove(idNumber);
        }
        return of(true);
    }
}
