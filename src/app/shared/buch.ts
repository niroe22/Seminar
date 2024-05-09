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
import { Temporal } from '@js-temporal/polyfill'; // eslint-disable-line @typescript-eslint/consistent-type-imports


export const MAX_RATING = 5;

export type BuchArt = 'DRUCKAUSGABE' | 'KINDLE';

export const ISBN_REGEX = /\d{3}-\d-\d{3}-\d{5}-\d/u;

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export interface Buch {
    id: string | undefined;
    isbn: string;
    titel: string;
    rating: number | undefined;
    art: BuchArt;
    readonly datum: Temporal.PlainDate | undefined;
    readonly preis: number;
    readonly rabatt: number;
    readonly lieferbar: boolean | undefined;
    schlagwoerter: string[];
}

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Buchdaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 */
export interface BuchShared {
    readonly isbn: string;
    readonly titel: string;
    readonly art: BuchArt;
    readonly preis: number;
    readonly rabatt: number | undefined;
    readonly lieferbar: boolean | undefined;
}
