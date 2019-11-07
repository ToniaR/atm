<template>
  <div id="app">
      <div>balance</div>
      {{ checkedNotes }}

      <h1>Withdraw cash easily!</h1>
      <div class="form">
        <input type="text" id="amount" name="amount" v-model="entryAmount">
        <ul class="form__checkboxes">
          <li v-for="(note, key) in notes" :key="key">
              <span class="form-field">
                <label :for="note.id">{{ note.amount }}</label>
                <input type="checkbox" :id="note.id" v-model="checkedNotes" :value="note.amount">
              </span>
          </li>
        </ul>


      </div>
      <button @click="getNotes">Withdraw</button>

      <h2>Output</h2>
      <p>{{ result }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      entryAmount: null,
      availNotes: [100, 50, 20, 10],
      checkedNotes: [],
      result: [],
      notes: [
        { id: 1, amount: 100 },
        { id: 2, amount: 50 },
        { id: 3, amount: 20 },
        { id: 4, amount: 10 }
      ]
      
    }
  },
  watch: {
  },
  methods: {
    getResult(amount) {
      if(!amount) {
        this.result = 'Empty set';
      }
      else {
        this.calculate(amount);
      }
    },
    getNotes() {
      this.result = []; 
      if(this.checkedNotes.length > 0) {
        console.log('a')
        this.calculateWithNotes(this.entryAmount, this.checkedNotes);        
      }
      else {
        console.log('b')
        this.calculate(this.entryAmount, this.availNotes);
      }
    },
    calculate(amount, arr) {
      let remainder = null, count = null; 
      // this.result = [];
      if(amount > 0 ) {
        for(let i = 0; i < arr.length; i++) {
          if(amount >= arr[i]) {
            let division = amount / arr[i];
            count = Math.floor(division); // how much note we should add
            remainder = amount % arr[i]; // the remainder from the division

            this.addNotes(arr[i], count); // add notes to result
            amount = remainder;
          }
        }
      }
    },
    calculateWithNotes(amount, arr) {
      this.result = [];
      for(let i = 0; i < arr.length; i++) {
        this.result.push(arr[i]);
        if (i === arr.length - 1) {
          let sum = this.result.reduce((a, b) => a + b);
          if (amount > sum) {
            let remainder = amount - sum;
            this.calculate(remainder, this.availNotes);
          }
        }
      }
    },
    addNotes(note, noteNum) {
      for(let i = 0; i < noteNum; i++) {
        this.result.push(note);
      }
    },
    clearResult() {
      let input = document.getElementById('amount');
      input.addEventListener('oninput', () => {
        this.result = [];
      })
    },
    sumResult(arr) {
      let sum = 0;
      for(let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum;
    }
  }
}
</script>

<style>

</style>