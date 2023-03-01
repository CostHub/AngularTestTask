import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { IRequestAnswer } from '../models/IRequestAnswer.interface';
import { ICurrencyValue } from '../models/ICurrencyValue.interface';
import { mockResponse } from '../mockData/response.mock';
import { IAllValues } from '../models/IAllValues.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public readonly searchUrl =
    'https://api.apilayer.com/currency_data/live?source=';

  public Currencies: ICurrencyValue[] = mockResponse;
  constructor(private http: HttpClient) {}

  setNewCurrency(currency: string): void {
    const res = this.Currencies.find((element) => element.title === currency);
    if (res) {
      res.isShowed = !res.isShowed;
    }
  }

  getQuotes(source: string, currencies: string): Subscription {
    const getUrl = this.searchUrl + source + '&currencies=' + currencies;
    return this.http
      .get<IRequestAnswer>(getUrl)
      .subscribe((answer: IRequestAnswer) => {
        const AllCurrencies: IAllValues = {
          USD: 1 / answer.quotes.RUBUSD,
          EUR: 1 / answer.quotes.RUBEUR,
          GBP: 1 / answer.quotes.RUBGBP,
          CNY: 1 / answer.quotes.RUBCNY,
          JPY: 1 / answer.quotes.RUBJPY,
          TRY: 1 / answer.quotes.RUBTRY,
        };
        let c = 0;
        for (const [, value] of Object.entries(AllCurrencies)) {
          if (value) {
            const difference = this.Currencies[c].valueInRub - value.toFixed(4);
            this.Currencies[c].changeValue = difference;
            this.Currencies[c].sign = difference > 0;
            this.Currencies[c].valueInRub = value.toFixed(2);
          } else {
            console.log('error, no data');
          }
          c++;
        }
      });
  }
}
