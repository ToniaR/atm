<template>
  <div id="app">
      <h1>Withdraw cash easily!</h1>
      <div class="form">
        <input type="text" id="amount" name="amount" v-model="entryAmount">
        <div class="form__checkboxes">
          <span class="form-field">
            <label for="hungreed">100</label>
            <input type="checkbox" value="100" id="hungreed">
          </span>
        </div>
        <div>
          <span class="form-field">
            <label for="fifty">50</label>
            <input type="checkbox" value="50" id="fifty">
          </span>
        </div>
        <div>
          <span class="form-field">
            <label for="twenty">20</label>
            <input type="checkbox" value="20" id="twenty">
          </span>
        </div>
        <div>
          <span class="form-field">
            <label for="ten">10</label>
            <input type="checkbox" value="10" id="ten">
          </span>
        </div>
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
      notes: [100, 50, 20, 10],
      choosenNotes: [],
      result: []
    }
  },
  watch: {
    // entryAmount: function(value) {
    //   value !== null ? this.getResult(value) : console.log('wprowadź wartość');
    // } 
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
      if(this.entryAmount % 10 === 0) {
        if(this.choosenNotes) {
          this.calculate(this.entryAmount, this.choosenNotes);          
        }
        else {
          this.calculate(this.entryAmount, this.notes);
        }
      }
      else {
        this.result.push('NoteUnavailableException');
      }
    },
    calculate(amount, arr) {
      let remainder = null, count = null; 
      this.result = [];
      if(amount > 0 ) {
        console.log('r', this.result)
        console.log(1, amount);
        for(let i = 0; i < arr.length; i++) {
          if(amount >= arr[i]) {
            console.log(2 + ' arr[i]', arr[i]);
            // this.result= this.amount % arr[i]; // 
            let division = amount / arr[i];
            console.log(3 + ' division', division);

            count = Math.floor(division); // how much note we should add
            console.log(4 + ' count', count);
            remainder = amount % arr[i]; // the remainder from the division
            console.log(5 + ' reminder', remainder);

            this.addNotes(arr[i], count); // add notes to result
            amount = remainder;
            console.log(6 + ' amount', amount);
          }
          else {
            console.log('GO ON!');
          }
        }
      }

      console.log(7 + ' result ', this.result);
    },
    addNotes(note, noteNum) {
      if(noteNum > 1) {
        for(let i = 0; i < noteNum; i++) {
          this.result.push(note);
        }
      }
      else {
        this.result.push(note);
      }

    },
    clearResult() {
      let input = document.getElementById('amount');
      input.addEventListener('oninput', () => {
        this.result = [];
      })
    }
  }
}
</script>

<style>

</style>