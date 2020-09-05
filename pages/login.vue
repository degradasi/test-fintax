<template>
  <div class="content_container">
    <form @submit.prevent="clickLogin" class="form_login">
      <div class="wrap_input">
        <label>
          Email
        </label>
        <input type="text" v-model="form.email" required>
      </div>
      <div class="wrap_input">
        <label>
          Password
        </label>
        <input type="password" v-model="form.password" required>
      </div>
      <button class="btn_primary" :disabled="loading">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
      <div class="response_message" :class="`${msgType}_message`" v-if="msgType">
        {{ resMessage }}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      msgType: '',
      resMessage: '',
      loading: false
    }
  },
  methods: {
    clickLogin() {
      this.msgType = ''
      this.loading = true
      this.$axios.post('login', this.form)
      .then((res) => {
        if (res.data.token ) {
          this.msgType = 'success'
          this.resMessage = 'Login success'
          this.$store.dispatch('login/setToken', res.data.token)
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        } else {
          this.msgType = 'error'
          this.resMessage = 'Invalid email or password'
        }
        this.loading = false
      })
      .catch(err => {
        this.msgType = 'error'
        this.resMessage = err.response.data.error
        this.loading = false
      })
    }
  },
}
</script>

<style lang="css" scoped>
  .form_login {
    width: 300px;
    max-width: 100%;
    padding: 20px;
    background: #ffffff;
    border-radius: 5px;
  }

  .form_login button {
    background: #1565C0;
    color: #ffffff;
    border: 1px solid #1565C0;
    border-radius: 5px;
  }
</style>