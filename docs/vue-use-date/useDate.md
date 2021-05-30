# :calendar: useDate

> `useDate` It is a function that we have completed date operations in functions.

## :maple_leaf: Usage

`useDate` function import.

```js
import { useDate } from 'vue-use-date';
const { format, timeAgo, getDate, utc, timezone, difference } = useDate('Type a here....');
```

## :hammer_and_wrench: Setup

### :key: Step 1

src/dayjs.js

Open a file named as `dayjs.js` inside the folder of `src` and add the codes below. The reason adding `dayjs.js` file is customizability of `dayjs` library.

#### dayjs.js

```js
import Vue from 'vue';
import dayjs from 'dayjs';
// For the other language options, add "dayjs/locale/{langCode}"
import 'dayjs/locale/tr';
import 'dayjs/locale/ar';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

Object.defineProperties(Vue.prototype, {
  $dayjs: {
    get() {
      return dayjs;
    },
  },
});
```

### :key: Step 2

Import `dayjs.js` file inside `main.js`

#### main.js

```js
import Vue from 'vue';
import App from './App.vue';
import VueCompositionApi from '@vue/composition-api';
// "dayjs.js" imported
import './dayjs.js';

Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
```

## :bouquet: Example

You can see how it changes reactively using the example below.

<I18nDateComponent />

:::: tabs type:border-card
::: tab template lazy

```html
<template>
  <div class="date">
    <div class="wrapper">
      <div class="select">
        <select v-model="selectedLang">
          <option v-for="lang in languages" :value="lang.key" :key="lang.key">{{ lang.name }}</option>
        </select>
        <h4>Language: {{ langUnit }}</h4>
      </div>
    </div>
    <p><b>Format: </b>{{ dateFormat }}</p>
    <p><b>TimeAgo: </b>{{ timeAgoFormat }}</p>
    <p><b>GetDate: </b>{{ getDateFormat }}</p>
    <p><b>Difference: </b>{{ differenceFormat }}</p>
    <p><b>Utc: </b>{{ utcFormat }}</p>
    <p><b>Timezone: </b>{{ timezoneFormat }}</p>
  </div>
</template>
```

:::
::: tab javascript lazy

```js
<script>
import {ref, computed} from '@vue/composition-api'
import { useDate } from "vue-use-date";

export default {
  setup() {
    const date = new Date();
    const selectedLang = ref('en');
    const langUnit = ref('en');
    const languages = ref([
      {
        key: 'en',
        name: 'English',
      },
      {
        key: 'es',
        name: 'Spanish',
      },
      {
        key: 'tr',
        name: 'Turkish',
      },
      {
        key: 'zh-cn',
        name: 'Chinese',
      },
      {
        key: 'ar',
        name: 'Arabic',
      },
    ]);

    const { format, timeAgo, getDate, utc, timezone, difference } = useDate(langUnit);

    watch(selectedLang, currentValue => {
      langUnit.value = currentValue;
    });

    const dateFormat = computed(() => format(date, 'LLLL'));
    const timeAgoFormat = computed(() => timeAgo(date, '2021-04-07:23:00'));
    const getDateFormat = computed(() => getDate('date'));
    const differenceFormat = computed(() => difference(date, '2018-06-05', 'day'));
    const utcFormat = computed(() => utc(date, 'LLLL'));
    const timezoneFormat = computed(() => timezone(date, 'America/New_York', 'L LT'));

    return {
      dateFormat,
      timeAgoFormat,
      getDateFormat,
      differenceFormat,
      utcFormat,
      timezoneFormat,
      languages,
      langUnit,
      selectedLang,
    };
  },
};
</script>
```

:::
::: tab scss lazy

```scss
<style lang="scss" scoped>
$purple: #8e44ad;

.date {
  .wrapper {
    margin-top: 30px;

    .select {
      display: flex;
      align-items: center;
      height: 30px;

      select {
        border: 2px solid $purple;
        border-radius: 0.6em;
        padding: 0.8em 0.8em;
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        font-size: 12px;

        &:hover,
        &:focus {
          outline: 0;
        }
      }
    }

    h4 {
      margin-left: 20px;
    }
  }

  p {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    border-left: 0.3rem solid #42b983;
    color: #666;
    font-family: monospace;
    padding: 1em 1.5em;
    display: block;
  }
}
</style>
```

:::
::::

<br />

<iframe src="https://codesandbox.io/embed/vue-use-date-ue7no?fontsize=14&hidenavigation=1&theme=dark"width="100%" height="500px"></iframe>

## :star2: Features

### format() Func

is used to format sent date. Gets two parameters. First one is the date that is going to be formatted, second one is format style.

```js
const dateFormat = format(date, 'dddd'); //  Friday, April 9, 2021 11:47 PM
const dateFormat = format(date, 'YYYY'); // 2021
const dateFormat = format(date, 'MMM'); // Jan-Dec
```

| Format |      Output      |                           Description |
| :----- | :--------------: | ------------------------------------: |
| `YY`   |        18        |                        Two-digit year |
| `YYYY` |       2018       |                       Four-digit year |
| `M`    |       1-12       |             The month, beginning at 1 |
| `MM`   |      01-12       |                   The month, 2-digits |
| `MMM`  |     Jan-Dec      |            The abbreviated month name |
| `MMMM` | January-December |                   The full month name |
| `D`    |       1-31       |                  The day of the month |
| `DD`   |      01-31       |        The day of the month, 2-digits |
| `d`    |       0-6        | The day of the week, with Sunday as 0 |
| `dd`   |      Su-Sa       |   The min name of the day of the week |
| `ddd`  |     Sun-Sat      | The short name of the day of the week |
| `dddd` | Sunday-Saturday  |       The name of the day of the week |
| `H`    |       0-23       |                              The hour |
| `HH`   |      00-23       |                    The hour, 2-digits |
| `h`    |       1-12       |               The hour, 12-hour clock |
| `hh`   |      01-12       |     The hour, 12-hour clock, 2-digits |
| `m`    |       0-59       |                            The minute |
| `mm`   |      00-59       |                  The minute, 2-digits |
| `s`    |       0-59       |                            The second |
| `ss`   |      00-59       |                  The second, 2-digits |
| `SSS`  |     000-999      |             The millisecond, 3-digits |
| `Z`    |      +05:00      |           The offset from UTC, ±HH:mm |
| `ZZ`   |      +0500       |            The offset from UTC, ±HHmm |
| `A`    |      AM PM       |                                       |
| `a`    |      am pm       |                                       |

List of localized formats

| Format |      English Locale       |                     Sample Output |
| :----- | :-----------------------: | --------------------------------: |
| `LT`   |          h:mm A           |                           8:02 PM |
| `LTS`  |         h:mm:ss A         |                        8:02:18 PM |
| `L`    |        MM/DD/YYYY         |                        08/16/2018 |
| `LL`   |       MMMM D, YYYY        |                   August 16, 2018 |
| `LLL`  |    MMMM D, YYYY h:mm A    |           August 16, 2018 8:02 PM |
| `LLLL` | dddd, MMMM D, YYYY h:mm A | Thursday, August 16, 2018 8:02 PM |
| `l`    |         M/D/YYYY          |                         8/16/2018 |
| `ll`   |        MMM D, YYYY        |                      Aug 16, 2018 |
| `lll`  |    MMM D, YYYY h:mm A     |              Aug 16, 2018 8:02 PM |
| `llll` |  ddd, MMM D, YYYY h:mm A  |         Thu, Aug 16, 2018 8:02 PM |

Sample

```js
const dateFormat = format(date, 'LLLL'); // Friday, April 9, 2021 9:23 PM
const dateFormat = format(date, 'llll'); // Fri, Apr 9, 2021 9:23 PM
const dateFormat = format(date, 'll'); // Apr 9, 2021
```

### getDate() Func

```js
const getDateFormat = getDate('date'); // date => Ayın Tarihi
```

| Uni          | Shorted |                              Description |
| :----------- | :-----: | ---------------------------------------: |
| `date`       |    D    |                            Date of Month |
| `day`        |    d    | Day of Week (Sunday as 0, Saturday as 6) |
| `month`      |    M    |     Month (January as 0, December as 11) |
| `year`       |    y    |                                     Year |
| `hour`       |    h    |                                     Hour |
| `minute`     |    m    |                                   Minute |
| `second`     |    s    |                                   Second |
| `milisecond` |   ms    |                              Millisecond |

### difference() Func

Gives the difference of two dates according to the determined time unit.

Gets three parameters

1- First Date

2- Second Date

3- Time Unit

```js
// It tells you how many days are between two dates.
const differenceFormat = difference(date1, date2, 'day');

// Reports how many months are between two dates.
const differenceFormat = difference(date1, date2, 'mount');
```

### utc() Func

Gets two parameters. First one is the sent date, second one is date format unit.

```js
const utcFormat = utc(date, 'llll');
```

### timezone() Func

It takes 3 parameters.

1- Date

2- Location

3- Format Unit

```js
const timezoneFormat = timezone('2014-06-01 12:00', 'Europe/Istanbul', 'LLLL');
```

<ToggleDarkMode/>
