import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Subscription, timer } from 'rxjs';
import { MyServiceService } from './services/my-service.service';
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
  public shownCurrencies: ICurrencyValue[] = this.ReqService.shownCurrencies;

  now: number | undefined;

  today: number = Date.now();

  constructor(private ReqService: MyServiceService, public datepipe: DatePipe) {
    setInterval(() => {
      this.now = Date.now(); //обновление времени для часов
    }, 1000);
  }

  getRequest(): void {
    this.ReqService.getQuotes2(
      'RUB',
      'USD%2C%20EUR%2C%20GBR%2C%20CNY%2C%20JPY%2C%20TRY'
    );
  }

  setNewCurrency(currency: string): void {
    this.ReqService.setNewCurrency_(currency);
    this.shownCurrencies = this.ReqService.shownCurrencies;
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
    console.log('on Init');
  }

  // Отписка при уничтожении компонента
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    } else {
      console.log('this.timerSubscription is undefined');
    }
  }
}
