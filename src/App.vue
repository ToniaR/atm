<template>
  <div id="app">
      <h1>Withdraw cash easily!</h1>
      <div class="form">
        <input type="text" id="amount" name="amount">
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

      <h2>Output</h2>
      <p></p>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>