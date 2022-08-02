<template>
  <div v-if="currentPark" class="edit-form">
    <h4>Park</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentPark.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentPark.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentPark.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentPark.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deletePark">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updatePark">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Park...</p>
  </div>
</template>

<script>
import ParkDataService from "../services/ParkDataService";

export default {
  name: "park",
  props: ["park"],
  data() {
    return {
      currentPark: null,
      message: "",
    };
  },
  watch: {
    park: function(park) {
      this.currentPark = { ...park };
      this.message = "";
    },
  },
  methods: {
    updatePublished(status) {
      ParkDataService.update(this.currentPark.key, {
        published: status,
      })
        .then(() => {
          this.currentPark.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePark() {
      const data = {
        title: this.currentPark.title,
        description: this.currentPark.description,
      };

      ParkDataService.update(this.currentPark.key, data)
        .then(() => {
          this.message = "The park was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deletePark() {
      ParkDataService.delete(this.currentPark.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentPark = { ...this.park }
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
