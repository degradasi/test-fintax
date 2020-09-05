<template>
  <div class="content_container" :style="{ marginTop: '50px' }">
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div v-else>
      <div v-if="dataTable">
        <TableUser :dataTable="dataTable" />
      </div>
      <div v-else>
        <h2>
          {{ msgResponse }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import TableUser from '~/components/TableUser'
import Cookies from 'js-cookie'

export default {
  components: {
    TableUser
  },
  data() {
    return {
      dataTable: null,
      loading: false,
      params: {
        page: this.$route.query.page ? this.$route.query.page : 1
      },
      msgResponse: ''
    }
  },
  watch: {
    '$route': function(newVal, oldVal) {
      if (newVal.query.page != oldVal.query.page) {
        this.params.page = newVal.query.page
        this.getData() 
      } else {
        this.dataSort()
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.msgResponse = ''
      this.$axios.get('users', { params: this.params })
      .then((res) => {
        if (res.data.data) {
          if (res.data.data.length == 0) {
            this.msgResponse = 'Data not found.'
            this.dataTable = null
          } else {
            this.dataTable = res.data
            if (this.$route.query.sort) {
              this.dataSort()
            }
          }
        } else {
          this.msgResponse = 'Data not found.'
          this.dataTable = null
        }
        this.loading = false
      })
      .catch(err => {
        this.msgResponse = err
        this.dataTable = null
        this.loading = false
      })
    },
    dataSort() {
      let _this = this
      this.dataTable.data.sort(function(a, b) {
        if (_this.$route.query.sort == 'desc') {
          if (a.first_name > b.first_name) {
            return -1
          }
        } else if (_this.$route.query.sort == 'asc') {
          if (a.first_name < b.first_name) {
            return -1
          }
        }
        return 0
      })
    }
  }
}
</script>