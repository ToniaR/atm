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
      if(this.entryAmount % 10 === 0) {
        if(this.checkedNotes) {
          this.calculate(this.entryAmount, this.checkedNotes);          
        }
        else {
          this.calculate(this.entryAmount, this.availNotes);
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
        for(let i = 0; i < arr.length; i++) {
          if(amount >= arr[i]) {
            // this.result= this.amount % arr[i]; // 
            let division = amount / arr[i];
            count = Math.floor(division); // how much note we should add
            remainder = amount % arr[i]; // the remainder from the division

            this.addNotes(arr[i], count); // add notes to result
            amount = remainder;
          }
        }
      }
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
    // toggle() {
    //   let checkList = document.querySelectorAll('li');
    //   checkList.forEach(el => {
    //     el.addEventListener('click', e => {
    //       e.preventDefault();
    //       console.log(e.target);
    //     });
    //   });
    // }
  }
}
</script>

<style>

</style>