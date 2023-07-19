<script setup>
import { onMounted, ref } from 'vue';

import Magnify from 'vue-material-design-icons/Magnify.vue';
import HomeOutLine from 'vue-material-design-icons/HomeOutLine.vue';
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue';
import MovieOutLine from 'vue-material-design-icons/MovieOutLine.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';

import {useMovieStore} from './stores/movie'
import {storeToRefs} from 'pinia';

const useMovie= useMovieStore();
const {movie, showFullVideo} = storeToRefs(useMovie)

</script>

<template>
<div class="fixed w-full h-screen bg-black">
  <div v-if="!showFullVideo" id="SideNav" class="fixed z-40 items-center w-[120px] h-screen bg-black relative">
    IMAGE
  </div>
</div>
</template>