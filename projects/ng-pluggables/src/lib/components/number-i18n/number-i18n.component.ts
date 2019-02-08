import { Component, OnInit, Input, OnChanges } from '@angular/core';

const defaultLocales = [{
  locale: 'en-US',
  digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
}, {
  locale: 'hi-IN',
  digits: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']
}, {
  locale: 'ka-IN',
  digits: ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯']
}];

@Component({
  selector: 'ng-pluggable-number-i18n',
  templateUrl: './number-i18n.component.html',
  styleUrls: ['./number-i18n.component.css']
})
export class NumberI18nComponent implements OnInit, OnChanges {
  translatedValue = '';
  locale = null;

  @Input() locales: {
    locale: string,
    digits: string[]
  }[] = defaultLocales;
  @Input() selectedLocale: string = 'en-US';
  @Input() value: number = null;

  ngOnInit() {
    this.locale = this.locales.find(localeData => {
      return localeData.locale === this.selectedLocale
    });
    this.ngOnChanges();
  }

  ngOnChanges() {
    if (isNaN(this.value) || !this.locale) {
      this.translatedValue = `${this.value}`;
    }
    else {
      console.log(this.value)
      this.translatedValue = '';
      const valueString = `${this.value}`;
      for (let i = 0; i < valueString.length; i++) {
        const digit: any = valueString.charAt(i);
        this.translatedValue += digit === '.' ? digit : this.locale.digits[digit * 1];
      }
    }
  }
}
