<template>
  <NewsCardGroup>
    <NewsCard v-for="(news, key) in news_list.items" :item="news" :key="key" />
  </NewsCardGroup>
</template>

<script setup lang="ts">
import NewsCardGroup from './news/NewsCardGroup.vue';
import NewsCard from './news/NewsCard.vue';
import { reactive, onMounted } from 'vue';
import axios from 'axios';

const news_list: any = reactive({ items: [] });

// 從後端 Server 獲得 RSS API
const fetchRSS = async () => {
  try {
    // Get RSS from server
    const rss = await axios.get('/api/v1/rss');

    // Copy all feeds into 'news_list'
    news_list.items = [];
    news_list.items = Array.from(rss.data.feeds);
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fetchRSS();
});
</script>
