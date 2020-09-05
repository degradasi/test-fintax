<template>
  <div>
    <table border="1">
      <tr>
        <th>No</th>
        <th>Photo</th>
        <th>
          First Name 
          <i class="fa fa-sort" @click="clickSort"></i>
        </th>
        <th>Last Name</th>
        <th>Email</th>
      </tr>
      <tr v-for="(item, index) in dataTable.data" :key="index" :id="`row${item.id}`">
        <td :style="{ textAlign: 'center' }">
          {{ index+1 }}
        </td>
        <td>
          <img :src="item.avatar">
        </td>
        <td>
          {{ item.first_name }}
        </td>
        <td>
          {{ item.last_name }}
        </td>
        <td>
          {{ item.email }}
        </td>
      </tr>
    </table>
    <Pagination :dataTable="dataTable" />
  </div>
</template>

<script>
import Pagination from '~/components/Pagination'

export default {
  props: ['dataTable'],
  components: {
    Pagination
  },
  methods: {
    clickSort() {
      this.$router.push({
        path: this.$route.fullPath,
        query: { 
          sort: this.$route.query.sort == 'asc' ? 'desc' : 'asc'
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  table {
    border-spacing: unset;
  }

  td, th {
    text-align: left;
    padding: 8px 10px;
  }

  th i {
    cursor: pointer;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>