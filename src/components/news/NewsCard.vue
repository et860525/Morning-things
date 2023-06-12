<template>
  <div class="rounded-lg text-white shadow-2xl" :class="{ 'row-span-1': isImage, 'row-span-2': !isImage }">
    <a :href="props.item.link">
      <h2 class="text-2xl lg:text-3xl text-center p-4" :class="classObject.a_tag_hover">{{ props.item.title }}</h2>
    </a>
    <a :href="props.item.link" v-if="props.item.enclosure !== undefined">
      <img class="max-h-13 w-full p-3 md:px-7" :src="props.item.enclosure?.url" alt="rss-picture" />
    </a>
    <div class="p-3 md:px-7 text-sm md:text-base">
      <div class="flex justify-between items-center">
        <p>
          來源: <a :href="props.item.origin_link" :class="classObject.a_tag_hover">{{ props.item.origin_title }}</a>
        </p>
        <p class="text-end text-gray-300 py-3">{{ dateFormat() }}</p>
      </div>
      <div class="item-content" v-html="props.item.content"></div>
      <p class="text-blue-400 text-right">
        <a :href="props.item.link" class="text-blue-400 text-right" :class="classObject.a_tag_hover">Read More</a>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref, reactive } from 'vue';
import { type Item } from 'rss-parser';

// Controll class
const classObject = reactive({
  a_tag_hover: 'hover:underline underline-offset-8',
});

// Extends more detail of item
interface CustomItem extends Item {
  origin_title: string;
  origin_link: string;
}

const props = defineProps<{
  item: CustomItem;
}>();

// Format date
const dateFormat = () => {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(props.item.isoDate!));
};

// Check post have image or not
const isImage: Ref<boolean> = ref(!props.item.content!.includes(`<img`) && props.item.enclosure == undefined);
</script>

<style>
.item-content img {
  width: 100%;
  height: full;
  margin: 0 auto;
}
</style>
