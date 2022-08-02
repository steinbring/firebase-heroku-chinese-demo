<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Parks List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(park, index) in parks"
          :key="index"
          @click="setActivePark(park, index)"
        >
          {{ park.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllParks">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentPark">
        <park-details
          :park="currentPark"
          @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br />
        <p>Please click on a Park...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ParkDataService from "../services/ParkDataService";
import ParkDetails from "./Park";

export default {
  name: "parks-list",
  components: { ParkDetails },
  data() {
    return {
      parks: [],
      currentPark: null,
      currentIndex: -1
    };
  },
  methods: {
    onDataChange(items) {
      let _parks = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _parks.push({
          key: key,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });

      this.parks = _parks;
    },

    refreshList() {
      this.currentPark = null;
      this.currentIndex = -1;
    },

    setActivePark(park, index) {
      this.currentPark = park;
      this.currentIndex = index;
    },

    removeAllParks() {
      ParkDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    ParkDataService.getAll().on("value", this.onDataChange);
  },
  beforeUnmount() {
    ParkDataService.getAll().off("value", this.onDataChange);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
