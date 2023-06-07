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
    // TODO: 後面會選擇 RSS
    const rss = await axios.get('/api/rss/v1');

    // TODO: 組合所有 RSS 的前三篇文章

    // 目前一次只有一個 RSS
    rss.data.feed.items.forEach((news: any) => {
      // 把原始的 Title 與 link 加到單個新聞裡
      news.origin_title = rss.data.feed.title;
      news.origin_link = rss.data.feed.link;
      news_list.items.push(news);
    });
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fetchRSS();
});
</script>
