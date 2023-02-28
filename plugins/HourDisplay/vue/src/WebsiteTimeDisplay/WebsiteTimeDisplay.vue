<!--
  Matomo - free/libre analytics platform

  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="example-component" v-if="websiteDate">
    <table class="dataTable">
      <tbody>
        <tr>
          <td class="label column">Website Current Time</td>
          <td>{{websiteDateFormatted}}</td>
        </tr>
        <tr v-if="showLocalDate">
          <td class="label column">Local Current Time</td>
          <td>{{localDateFormatted}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="less" scoped>
  .example-component {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      background-color: indigo;
      color: white;
      margin: 8px;
    }
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';

interface WebsiteTimeDisplayState {
  websiteDate: Date,
  localDate: Date,
}

export default defineComponent({
  components: {
  },
  data(): WebsiteTimeDisplayState {
    return {
      websiteDate: null,
      localDate: new Date(),
    };
  },
  props: {
    timezone: {
      type: String,
      required: true,
    },
  },
  computed: {
    showLocalDate() {
      return this.websiteDateFormatted !== this.localDateFormatted;
    },
    websiteDateFormatted() {
      return `${this.websiteDate.getFullYear()}/${this.websiteDate.getMonth() + 1}/${this.websiteDate.getDate()} ${this.websiteDate.getHours()}:${this.websiteDate.getMinutes()}`;
    },
    localDateFormatted() {
      return `${this.localDate.getFullYear()}/${this.localDate.getMonth() + 1}/${this.localDate.getDate()} ${this.localDate.getHours()}:${this.localDate.getMinutes()}`;
    },
  },
  methods: {
    changeTimeZone(date, timeZone) {
      if (typeof date === 'string') {
        return new Date(
          new Date(date).toLocaleString('en-US', {
            timeZone,
          }),
        );
      }

      return new Date(
        date.toLocaleString('en-US', {
          timeZone,
        }),
      );
    },
    updateDateTime: function updateDateTime() {
      this.localDate = new Date();
      this.websiteDate = this.changeTimeZone(new Date(), this.timezone);

      setTimeout(this.updateDateTime, 30000);
    },
  },
  mounted() {
    this.updateDateTime();
  },
});
</script>
<style scoped>
  table.dataTable td.label, table.subDataTable td.label {
    width: 60%;
  }
</style>
