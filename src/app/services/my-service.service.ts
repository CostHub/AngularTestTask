import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { IRequestAnswer } from '../models/IRequestAnswer.interface';
import { ICurrencyValue } from '../models/ICurrencyValue.interface';
import { mockResponse, mockResponse2 } from '../mockData/response.mock';

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  public readonly searchUrl =
    'https://api.apilayer.com/currency_data/live?source=';
  public shownCurrencies: ICurrencyValue[] = mockResponse;
  public hiddenCurrencies: ICurrencyValue[] = mockResponse2;
  public allCurrencies: ICurrencyValue[] = mockResponse.concat(mockResponse2);
  constructor(private http: HttpClient) {}

  setNewCurrency_(currency: string): void {
    const pushedCurrency = this.hiddenCurrencies.filter(
      (element) => element.title === currency
    );
    if (this.shownCurrencies.find((el) => el.title === currency)) {
      // при попытке добавить уже существующую валюту ее удалит из списка
      this.shownCurrencies = this.shownCurrencies.filter(
        (el) => el.title !== currency
      );
    } else {
      // добавляет валюту по клику
      this.shownCurrencies = this.shownCurrencies.concat(pushedCurrency);
    }
  }

  getQuotes(source: string, currencies: string): Subscription {
    const getUrl = this.searchUrl + source + '&currencies=' + currencies;
    return this.http
      .get<IRequestAnswer>(getUrl)
      .subscribe((answer: IRequestAnswer) => {
        const AllCurrencies =
          //todo Добавить тип
          {
            CNY: 1 / answer.quotes.RUBCNY,
            EUR: 1 / answer.quotes.RUBEUR,
            GBR: 1 / answer.quotes.RUBGBR,
            JPY: 1 / answer.quotes.RUBJPY,
            TRY: 1 / answer.quotes.RUBTRY,
            USD: 1 / answer.quotes.RUBUSD,
          };

        for (const CurrencyName of Object.keys(AllCurrencies)) {
          let foundCurrencyObj = this.allCurrencies.find(
            (currency) => currency.title === CurrencyName
          );
          if (foundCurrencyObj) {
            console.log('smth');
          } else {
            console.log('Cant find currency in store');
          }

          // let isInShownCurrencies = this.shownCurrencies.find(currency => currency.title === CurrencyName);
          // let isInHiddenCurrencies = this.hiddenCurrencies.find(currency => currency.title === CurrencyName);
          // if(!isInShownCurrencies){
          //   if(!isInHiddenCurrencies){ console.log('smth wrong all undefigned')}
          //   else {  }
          // }
        }
      });
  }

  getQuotes2(source: string, currencies: string): void {
    //todo delete
    console.log('source  ', source, '  cur  ', currencies);
  }
}
