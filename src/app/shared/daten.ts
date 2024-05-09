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

import { type BuchServer } from './buchServer';

export let BUECHER: BuchServer[] = [
    {
        id: 1,
        isbn: '000-0-000-00000-1',
        titel: 'Alpha',
        rating: 4,
        art: 'DRUCKAUSGABE',
        datum: '2018-02-01',
        preis: 11.1,
        rabatt: 0.011,
        lieferbar: true,
        schlagwoerter: ['JAVASCRIPT'],
    },
    {
        id: 20,
        isbn: '000-0-000-00000-2',
        titel: 'Beta',
        rating: 2,
        art: 'KINDLE',
        datum: '2018-02-02',
        preis: 22.2,
        rabatt: 0.022,
        lieferbar: true,
        schlagwoerter: ['TYPESCRIPT'],
    },
    {
        id: 30,
        isbn: '000-0-000-00000-3',
        titel: 'Gamma',
        rating: 1,
        art: 'KINDLE',
        datum: '2018-02-03',
        preis: 33.3,
        rabatt: 0.033,
        lieferbar: true,
        schlagwoerter: ['JAVASCRIPT', 'TYPESCRIPT'],
    },
    {
        id: 40,
        isbn: '000-0-000-00000-4',
        titel: 'Delta',
        rating: 3,
        art: 'DRUCKAUSGABE',
        datum: '2018-02-04',
        preis: 44.4,
        rabatt: 0.044,
        lieferbar: true,
        schlagwoerter: [],
    },
    {
        id: 50,
        isbn: '000-0-000-00000-4',
        titel: 'Epsilon',
        rating: 2,
        art: 'KINDLE',
        datum: '2018-02-05',
        preis: 55.5,
        rabatt: 0.055,
        lieferbar: true,
        schlagwoerter: ['TYPESCRIPT'],
    },
];

export const nextId = () => {
    // https://stackoverflow.com/questions/28607451/removing-undefined-values-from-array
    const idArray = BUECHER.map((buch) => buch.id).filter(Boolean) as number[];
    return Math.max(...idArray) + 1;
};
export const remove = (id: number | undefined) => {
    BUECHER = BUECHER.filter((b) => b.id !== id);
};
