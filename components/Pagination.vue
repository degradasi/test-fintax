<template>
  <div class="pagination">
    <div class="item_paging">
      <nuxt-link
        :to="`/table?page=${ item }`"
        v-for="(item, index) in dataTable.total_pages"
        :key="index"
        :class="{ active: item == dataTable.page }"
      >
        {{ item }}
      </nuxt-link>
    </div>
    <div>
      Total record {{ dataTable.total }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataTable']
}
</script>

<style lang="css" scoped>
  .pagination {
    margin: 20px 0 50px;
    display: flex;
    justify-content: space-between;
  }

  .pagination .item_paging {
    display: flex;
  }

  .item_paging a {
    text-decoration: none;
    height: 30px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #333333;
    color: #ffffff;
    transition: all ease .2s;
  }

  .item_paging .active, .item_paging a:hover {
    background: #1565C0;
  }
</style>