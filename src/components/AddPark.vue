<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="park.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="park.description"
          name="description"
        />
      </div>

      <button @click="savePark" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPark">Add</button>
    </div>
  </div>
</template>

<script>
import ParkDataService from "../services/ParkDataService";

export default {
  name: "add-park",
  data() {
    return {
      park: {
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    savePark() {
      var data = {
        title: this.park.title,
        description: this.park.description,
        published: false
      };

      ParkDataService.create(data)
        .then(() => {
          console.log("Created new item successfully!");
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newPark() {
      this.submitted = false;
      this.park = {
        title: "",
        description: "",
        published: false
      };
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
