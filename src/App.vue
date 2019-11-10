<template>
  <div id="app" class="center-content">
      <h1>Withdraw cash easily!</h1>
      <div class="app-form">
        <input type="text" id="amount" name="amount" v-model="entryAmount" class="app-form__input-field">
        <ul class="app-form__checkbox-list">
          <li v-for="(note, key) in notes" :key="key" class="app-form__list-item">
              <span class="form-field">
                <label :for="note.id" class="form-label">
                  {{ `${note.amount}$` }}
                </label>
                <input type="checkbox" :id="note.id" v-model="checkedNotes" :value="note.amount" class="app-form__checkbox">
              </span>
          </li>
        </ul>
        <div class="app-form__error-block" v-show="errorMsg.length > 0">{{ errorMsg }}</div>
        <div v-if="result.length > 0" class="app__result-block">
          <div>
            <span class="app__result-title">{{ `${entryAmount}$ : ` }}</span>
            <span v-for="(note, key) in result" :key="key" class="app__result-item">{{ note }}</span>
          </div>
        </div>
        <button @click="getResult" class="app-form__submit-btn">Withdraw</button>
      </div>
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
      ],
      errorMsg: ''
    }
  },
  watch:  {
    'entryAmount'(val) {
      if(this.entryAmount !== null) {
        this.result = [];
      }
    }
  },
  methods: {
    getResult() {
      if(!this.entryAmount) {
        this.showError('Empty set');
      }
      else {
        this.getNotes()
      }
    },
    showError(err) {
        this.errorMsg = err;
        setTimeout(() => {
          this.errorMsg = '';
        }, 1000)
    },
    getNotes() {
      this.result = []; 
      if(this.checkedNotes.length > 0) {
        this.calculateWithNotes(this.entryAmount, this.checkedNotes);        
      }
      else {
        this.calculate(this.entryAmount, this.availNotes);
      }
    },
    calculate(amount, arr) {
      let remainder = null, count = null;
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
      let arrSum = arr.reduce((a, b) => a + b);
      if (amount >= arrSum) {
        console.log(amount + ' ' + arrSum)
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
        this.refresh();
      }
      else {
        this.showError('InvalidArgumentException');
      }
    },
    addNotes(note, noteNum) {
      for(let i = 0; i < noteNum; i++) {
        this.result.push(note);
      }
    },
    sumResult(arr) {
      let sum = 0;
      for(let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum;
    },
    refresh() {
      let boxes = document.querySelectorAll('.app-form__checkbox');
      boxes.forEach(box => {
        box.checked = box.checked === true ? false : box.checked;
      })
    }
  }
}
</script>

<style>

</style>