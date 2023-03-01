import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription, timer } from 'rxjs';
import { RequestService } from './services/request.service';
import { ICurrencyValue } from './models/ICurrencyValue.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'AngularTestTask';
  timerSubscription: Subscription | undefined;
  public Currencies: ICurrencyValue[] = this.reqService.Currencies;

  now: number = 0;
  today: number = Date.now();

  constructor(private reqService: RequestService, public datepipe: DatePipe) {
    setInterval(() => {
      this.now = Date.now();
    }, 1000);
  }

  getRequest(): void {
    this.reqService.getQuotes(
      'RUB',
      'USD%2C%20EUR%2C%20GBP%2C%20CNY%2C%20JPY%2C%20TRY'
    );
    this.Currencies = this.reqService.Currencies;
  }

  setNewCurrency(currency: string): void {
    this.reqService.setNewCurrency(currency);
  }

  ngOnInit(): void {
    // повтор запроса раз в минуту
    this.timerSubscription = timer(0, 60000)
      .pipe(
        map(() => {
          this.getRequest();
        })
      )
      .subscribe();
  }

  // Отписка при уничтожении компонента
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    } else {
      console.log('timerSubscription is undefined');
    }
  }
}
