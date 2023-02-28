import { ICurrencyValue } from '../models/ICurrencyValue.interface';

export const mockResponse: ICurrencyValue[] = [
  {
    title: 'USD',
    valueInRub: 75.11,
    changeValue: 0.0,
    sign: true,
  },
  {
    title: 'EUR',
    valueInRub: 75.21,
    changeValue: 0.0,
    sign: true,
  },
  {
    title: 'GBR',
    valueInRub: 75.51,
    changeValue: 0.0,
    sign: true,
  },
];

export const mockResponse2: ICurrencyValue[] = [
  {
    title: 'CNY',
    valueInRub: 75.51,
    changeValue: 0.0,
    sign: false,
  },

  {
    title: 'JPY',
    valueInRub: 75.51,
    changeValue: 0.0,
    sign: false,
  },
  {
    title: 'TRY',
    valueInRub: 75.51,
    changeValue: 0.0,
    sign: false,
  },
];
