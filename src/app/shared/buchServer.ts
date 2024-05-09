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

import { type Buch, type BuchShared } from './buch';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface BuchServer extends BuchShared {
    readonly id: number | undefined;
    readonly rating: number | undefined;
    readonly datum: string | undefined;
    readonly schlagwoerter?: string[];
}

/**
 * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
 * Service kommen.
 * @param buch JSON-Objekt mit Daten vom RESTful Web Server
 * @return Das initialisierte Buch-Objekt
 */
export const toBuch = (buchServer: BuchServer) => {
    const {
        id,
        titel,
        rating,
        art,
        datum,
        preis,
        rabatt,
        lieferbar,
        schlagwoerter,
        isbn,
    } = buchServer;

    let datumTemporal: Temporal.PlainDate | undefined;
    // TODO Parsing, ob der Datum-String valide ist
    if (datum !== undefined) {
        const [yearStr, monthStr, dayStr] = datum
            .replaceAll(/T.*/gu, '')
            .split('-');
        const year = Number(yearStr);
        const month = Number(monthStr);
        const day = Number(dayStr);
        datumTemporal = new Temporal.PlainDate(year, month, day);
    }

    const buch: Buch = {
        id: id?.toString(),
        titel,
        rating,
        art,
        datum: datumTemporal,
        preis,
        rabatt: rabatt ?? 0,
        lieferbar,
        schlagwoerter: schlagwoerter ?? [],
        isbn,
    };
    log.debug('toBuch: buch=', buch);
    return buch;
};

/**
 * Konvertierung des Buchobjektes in ein JSON-Objekt f&uuml;r den RESTful
 * Web Service.
 * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
 */
export const toBuchServer = (buch: Buch) => {
    const datum = buch.datum === undefined ? undefined : buch.datum.toString();
    const buchServer: BuchServer = {
        id: Number(buch.id),
        titel: buch.titel,
        rating: buch.rating,
        art: buch.art,
        datum,
        preis: buch.preis,
        rabatt: buch.rabatt,
        lieferbar: buch.lieferbar,
        schlagwoerter: buch.schlagwoerter,
        isbn: buch.isbn,
    };
    return buchServer;
};
