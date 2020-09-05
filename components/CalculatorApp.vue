<template>
  <div class="calculator_app">
    <div class="calc_menu">
      <input type="text" v-model="textVal" readonly>
    </div>
    <div class="calc_menu menu_number">
      <button
        v-for="(data, index) in calcNumber"
        :key="index"
        @click="clickNumber(data)"
      >
        {{ data }}
      </button>
      <button @click="clickNumber('+')">
        +
      </button>
      <button @click="textVal = ''">
        C
      </button>
    </div>
    <div class="calc_menu">
      <button class="btn_footer" @click="clickResult">
        =
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calcNumber: [1,2,3,4,5,6,7,8,9,0],
      textVal: ''
    }
  },
  methods: {
    clickNumber(val) {
      let checkDoubleOperation = this.textVal.charAt(this.textVal.length - 1)
      if (typeof val == 'number') {
        this.textVal += val 
      } else {
        if (checkDoubleOperation != '+' && typeof val == 'string' && checkDoubleOperation) {
          this.textVal += val 
        }
      }
    },
    clickResult() {
      let getNumber = this.textVal.split('+')
      let getResult = 0
      getNumber.forEach(element => {
        getResult = getResult + Number(element)
      })
      this.textVal = String(getResult)
    }
  }
}
</script>

<style lang="css" scoped>
  .calculator_app {
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
  }

  .calculator_app .calc_menu {
    display: flex;
  }

  .calculator_app button {
    font-size: 16px;
  }

  .calc_menu input {
    text-align: right;
    padding: 10px 15px;
    font-size: 16px;
    width: 100%;
  }

  .menu_number {
    flex-wrap: wrap;
  }

  .btn_footer {
    height: 50px;
    width: 100%;
  }

  .menu_number button {
    width: 33.33%;
    height: 50px;
  }
</style>