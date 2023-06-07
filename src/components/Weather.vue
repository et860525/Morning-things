<template>
  <WeatherCard>
    <Title :location="currentWeather.locationName" :description="currentWeather.description" />
    <div class="flex justify-center gap-10 items-center">
      <CurrentWeather :temperature="currentWeather.temperature" />
      <WeatherIcon :currentWeatherCode="currentWeather.weatherCode" :dayStatus="currentWeather.dayStatus" />
    </div>
    <div class="flex justify-start items-center gap-5 mt-5 px-5">
      <Airflow :wind="currentWeather.windSpeed" />
      <Rain :rain="currentWeather.rainPossibility" />
    </div>

    <!-- TODO: 如果要做成一個 Component 要如何限制按鈕間 -->
    <div class="flex justify-end items-end mt-5 gap-3 text-right">
      <p class="text-mg">最後觀測時間: {{ dateFormat() }}</p>
      <button
        @click="
          () => {
            fetchCurrentWeather();
            fetchWeatherForecast();
            fetchSunRiseSunSet();
            updateAPILimit();
          }
        "
        :disabled="disabled.clicked"
      >
        <!-- Windows 動畫設定不能關掉，否則看不到旋轉特效 -->
        <i class="fa-solid fa-refresh fa-spin" style="color: #7da8f2" v-if="isLoading.status === true"></i>
        <i class="fa-solid fa-rotate" v-else></i>
      </button>
    </div>
  </WeatherCard>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import WeatherCard from './weather/WeatherCard.vue';
import Title from './weather/Title.vue';
import WeatherIcon from './weather/WeatherIcon.vue';
import CurrentWeather from './weather/CurrentWeather.vue';
import Airflow from './weather/Airflow.vue';
import Rain from './weather/Rain.vue';
import Redo from './weather/Redo.vue';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const disabled = reactive({ clicked: false });
const isLoading = reactive({ status: false });

// 中央氣象局的更新頻率為 1 小時
const updateAPILimit = () => {
  disabled.clicked = true;

  setTimeout(() => {
    disabled.clicked = false;
  }, 2 * 60 * 1000);
};

interface IWeather {
  observationTime: string;
  locationName: string;
  description: string;
  temperature: number;
  windSpeed: number;
  humid: number;
  weatherCode: number;
  rainPossibility: number;
  comfortability: string;
  dayStatus: string;
}

// 預設資料
const currentWeather: IWeather = reactive({
  observationTime: '2023-6-05 12:10:00',
  locationName: 'NaN',
  description: 'NaN',
  temperature: 27.5,
  windSpeed: 0.3,
  humid: 0.88,
  weatherCode: 1,
  rainPossibility: 10,
  comfortability: '悶熱',
  dayStatus: 'night',
});

// 優化 date
const dateFormat = () => {
  return new Intl.DateTimeFormat('zh-TW', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(currentWeather.observationTime));
};

// 獲得目前天氣 API
const fetchCurrentWeather = async () => {
  // 更新按鈕動畫
  isLoading.status = true;

  const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${API_KEY}&limit=5&format=JSON&locationName=高雄`;

  try {
    const weatherData = await axios.get(url);

    // 取出資料
    const locationData = weatherData.data.records.location[0];
    console.log(locationData);

    // 將 WDSD、TEMP、HUMD 取出
    const weatherElements = locationData.weatherElement.reduce((neededElements: any, item: any) => {
      if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
        neededElements[item.elementName] = item.elementValue;
      }
      return neededElements;
    }, {});

    // 設定變數
    currentWeather.observationTime = locationData.time.obsTime;
    currentWeather.temperature = weatherElements.TEMP;
    currentWeather.windSpeed = weatherElements.WDSD;
    currentWeather.humid = weatherElements.HUMD;
  } catch (err) {
    console.log(err);
  }
};

// 獲得預測天氣 API
const fetchWeatherForecast = async () => {
  const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${API_KEY}&format=JSON&locationName=高雄市`;

  try {
    const weatherForecastData = await axios.get(url);

    const locationData = weatherForecastData.data.records.location[0];

    const weatherElements = locationData.weatherElement.reduce((neededElements: any, item: any) => {
      if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
        neededElements[item.elementName] = item.time[0].parameter;
      }
      return neededElements;
    }, {});

    currentWeather.locationName = locationData.locationName;
    currentWeather.description = weatherElements.Wx.parameterName;
    currentWeather.weatherCode = weatherElements.Wx.parameterValue;
    currentWeather.rainPossibility = weatherElements.PoP.parameterName;
    currentWeather.comfortability = weatherElements.CI.parameterName;
  } catch (err) {
    console.log(err);
  }
};

// 獲得日出日落時間 API
const fetchSunRiseSunSet = async () => {
  // 獲得目前日期
  let currentDate: string = new Date().toJSON().slice(0, 10);

  // 設定獲取日期的範圍：當前日期的後兩天
  let end: Date = new Date();
  end.setDate(end.getDate() + 2);
  let endDate = end.toJSON().slice(0, 10);

  // 從目前時間開始獲得日出日落的資料
  const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${API_KEY}&format=JSON&CountyName=高雄市&timeFrom=${currentDate}&timeTo=${endDate}`;

  const sunAPIData = await axios.get(url);
  const sunRiseSunSetData = sunAPIData.data.records.locations.location[0];

  // 找尋資料內與現在日期一致的
  const locationDate = sunRiseSunSetData.time.find((time: any) => time.Date === currentDate);

  // 將日出、日落、現在時間，轉為 TimeStamp
  const sunriseTimestamp = new Date(`${locationDate.Date} ${locationDate.SunRiseTime}`).getTime();

  const sunsetTimestamp = new Date(`${locationDate.Date} ${locationDate.SunSetTime}`).getTime();

  const nowTimeStamp = new Date().getTime();

  isLoading.status = false;

  // 如果目前的時間在日出與日落中間，那就是白天，其他時間為晚上
  currentWeather.dayStatus = sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp ? 'day' : 'night';
};

// 初始化
onMounted(() => {
  fetchCurrentWeather();
  fetchWeatherForecast();
  fetchSunRiseSunSet();
});
</script>
