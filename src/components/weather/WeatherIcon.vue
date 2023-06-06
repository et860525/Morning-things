<template lang="">
  <div>
    <img :src="weatherIcons[dayStatus][weatherCode2Type(currentWeatherCode)]" alt="" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

// Import 所有 Icons
import DayThunderstorm from '../../assets/icons/day-thunderstorm.svg';
import DayClear from '../../assets/icons/day-clear.svg';
import DayCloudyFog from '../../assets/icons/day-cloudy-fog.svg';
import DayCloudy from '../../assets/icons/day-cloudy.svg';
import DayFog from '../../assets/icons/day-fog.svg';
import DayPartiallyClearWithRain from '../../assets/icons/day-partially-clear-with-rain.svg';
import DaySnowing from '../../assets/icons/day-snowing.svg';
import NightThunderstorm from '../../assets/icons/night-thunderstorm.svg';
import NightClear from '../../assets/icons/night-clear.svg';
import NightCloudyFog from '../../assets/icons/night-cloudy-fog.svg';
import NightCloudy from '../../assets/icons/night-cloudy.svg';
import NightFog from '../../assets/icons/night-fog.svg';
import NightPartiallyClearWithRain from '../../assets/icons/night-partially-clear-with-rain.svg';
import NightSnowing from '../../assets/icons/night-snowing.svg';

// weatherCode -> weatherTypes -> weatherIcons

defineProps({
  currentWeatherCode: {
    type: Number,
    default: 1,
  },
  dayStatus: {
    type: String,
    default: 'night',
  },
});

// https://opendata.cwb.gov.tw/opendatadoc/MFC/ForecastElement.pdf
const weatherTypes = {
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [1],
  isCloudyFog: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isFog: [24],
  isPartiallyClearWithRain: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39],
  isSnowing: [23, 37, 42],
};

const weatherIcons = reactive({
  day: {
    isThunderstorm: DayThunderstorm,
    isClear: DayClear,
    isCloudyFog: DayCloudyFog,
    isCloudy: DayCloudy,
    isFog: DayFog,
    isPartiallyClearWithRain: DayPartiallyClearWithRain,
    isSnowing: DaySnowing,
  },
  night: {
    isThunderstorm: NightThunderstorm,
    isClear: NightClear,
    isCloudyFog: NightCloudyFog,
    isCloudy: NightCloudy,
    isFog: NightFog,
    isPartiallyClearWithRain: NightPartiallyClearWithRain,
    isSnowing: NightSnowing,
  },
});

const weatherCode2Type = (weatherCode: number) => {
  const [weatherType] =
    Object.entries(weatherTypes).find(([weatherType, weatherCodes]) => weatherCodes.includes(Number(weatherCode))) ||
    [];

  return weatherType;
};
</script>
