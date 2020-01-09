<template>
  <div class="goods">
    <Merchandise v-for="image in images" :key="image.id" :src="image.src" :title="image.title">
      <ul>
        <li v-for="content in image.contents" :key="content.id">
          {{ content.line }}
        </li>
      </ul>
    </Merchandise>
  </div>
</template>

<script>
import Merchandise from './small/goods/Merchandise.vue'
export default {
  components: {
    Merchandise
  },
  data() {
    return {
      images: [
        {
          src: 'goods-1',
          title: 'Pallets EPAL',
          contents: [
            { line: 'EPAL - 1200 x 800 mm', id: 100 },
            { line: 'EPAL 2 - 1200 x 1000 mm', id: 101 },
            { line: 'EPAL 3 - 1000 x 1200 mm', id: 102 }
          ],
          id: 0
        },
        {
          src: 'goods-2',
          title: 'CP pallets',
          contents: [
            { line: 'CP1 - 1200 x 1000 mm', id: 103 },
            { line: 'CP2 - 1200 x 800 mm', id: 104 },
            { line: 'CP3 - CP9', id: 105 }
          ],
          id: 1
        },
        {
          src: 'goods-3',
          title: 'Used pallets',
          contents: [
            { line: 'Class I (light) EPAL', id: 106 },
            { line: 'Class I (light) MIX', id: 107 },
            { line: 'Class II (dark)', id: 108 }
          ],
          id: 2
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  grid-area: goods;
  // align-self: end;
  margin-top: 70px;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
