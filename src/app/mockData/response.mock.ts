import { ICurrencyValue } from '../models/ICurrencyValue.interface';

export const mockResponse: ICurrencyValue[] = [
  {
    title: 'USD',
    valueInRub: 75.01,
    changeValue: 0.0,
    sign: false,
    isShowed: true,
  },
  {
    title: 'EUR',
    valueInRub: 79.41,
    changeValue: 0.0,
    sign: true,
    isShowed: true,
  },
  {
    title: 'GBP',
    valueInRub: 90.01,
    changeValue: 0.0,
    sign: true,
    isShowed: true,
  },
  {
    title: 'CNY',
    valueInRub: 10.8,
    changeValue: 0.0,
    sign: true,
    isShowed: false,
  },

  {
    title: 'JPY',
    valueInRub: 0.55,
    changeValue: 0.0,
    sign: false,
    isShowed: false,
  },
  {
    title: 'TRY',
    valueInRub: 3.97,
    changeValue: 0.0,
    sign: false,
    isShowed: false,
  },
];
