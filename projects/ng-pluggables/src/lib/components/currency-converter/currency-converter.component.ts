import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface NgPluggableCurrency {
  key: string,
  display_name?: string,
  base: string,
  rate: number
}

export interface NgPluggableCurrencyConverterConfig {
  currencies?: NgPluggableCurrency[];
}

@Component({
  selector: 'ng-pluggable-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  lastSourceRow = null;
  @Input() config: NgPluggableCurrencyConverterConfig;
  rows: {
    currency_key: string,
    value: number
  }[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    if (!this.config) {
      this.config = {};
    }
    if (!this.config.currencies) {
      this.config.currencies = [];
    }
    if (this.config.currencies.length < 2) {
      this.httpClient.get('https://api.exchangeratesapi.io/latest?base=INR').subscribe(response => {
        if (response['rates'] && response['base']) {
          Object.keys(response['rates']).forEach(key => {
            if (response['rates'].hasOwnProperty(key)) {
              this.config.currencies.push({
                key: key,
                display_name: key,
                base: response['base'],
                rate: response['rates'][key]
              });
            }
          });
          if (this.config.currencies.length > 2) {
            this._initializeRows();
          }
          else {
            console.log('Not enough currencies available for conversion');
          }
        }
      });
    } else {
      this._initializeRows();
    }
  }

  private _initializeRows() {
    this.rows.splice(0, this.rows.length);
    this.addRow(1);
    this.addRow();
  }

  addRow(value = null) {
    const nextCurrencyIndex = this.rows.length
      ? this.rows.length % this.config.currencies.length
      : this.rows.length;

    this.rows.push({
      currency_key: this.config.currencies[nextCurrencyIndex].key,
      value: value
    });
    this.convertAllRows(this.lastSourceRow ? this.lastSourceRow : this.rows[0]);
  }

  convertAllRows(sourceRow: {
    currency_key: string,
    value: number
  }) {
    if (isNaN(sourceRow.value)) {
      return;
    }
    const sourceCurrency = this.config.currencies.find(currency => currency.key === sourceRow.currency_key);
    this.rows.forEach(targetRow => {
      if (targetRow.currency_key !== sourceRow.currency_key) {
        const targetCurrency = this.config.currencies.find(currency => currency.key === targetRow.currency_key);
        targetRow.value = sourceRow.value * sourceCurrency.rate / targetCurrency.rate;
      } else {
        targetRow.value = sourceRow.value;
      }
    });
    this.lastSourceRow = sourceRow;
  }

}
