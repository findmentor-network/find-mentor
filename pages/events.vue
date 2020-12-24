<template>
  <div class="page guide-page">
    <div id="jumbotron-mentor" class="container">
      <b-jumbotron text-variant="black" border-variant="dark">
        <h1>Events</h1>
        <p>
          <i> You can find all events here from findmentor.network. </i>
        </p>
      </b-jumbotron>

      <div>
        <b-table
          striped
          :table-variant="$colorMode.value"
          :items="items"
          :fields="fields"
          :tbody-tr-class="rowClass"
        >
          <template #cell(event_name)="data">
            <a v-if="data.item.link" :href="`${data.item.link}`">{{
              data.value
            }}</a>
            <span v-else>{{ data.value }}</span>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [{ key: 'event_name' }, 'speakers', 'date', 'status'],
      items: [
        {
          event_name: 'What is the findmenotor? How was start?',
          speakers: 'Çağatay Çalı',
          link: 'https://www.youtube.com/watch?v=IhNCyOx-2Yc&t=1s',
          date: '2020/12/20',
          status: 'done',
        },
        {
          event_name: 'Q/A About Technical Interviews with Orhan ÖZALP',
          speakers: 'Orhan ÖZALP',
          link: '',
          date: '2020/12/24',
          status: 'upcoming',
        },
      ],
    }
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.status === 'upcoming') return 'success'
    },
  },
}
</script>

<style>
#jumbotron-mentor {
  margin-top: 50px;
  max-width: 850px;
}
html.dark-mode #jumbotron-mentor .jumbotron {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0px 2px 8px rgba(155, 155, 155, 0.18);
}
html.dark-mode #jumbotron-mentor h1,
html.dark-mode #jumbotron-mentor p,
html.dark-mode #jumbotron-mentor li {
  color: #ddd;
}
.jumbotron {
  border-radius: 20px 0px 20px 0px;
  -moz-border-radius: 20px 0px 20px 0px;
  -webkit-border-radius: 20px 0px 20px 0px;
  padding: 2rem 2rem;
  box-shadow: 0px 2px 8px rgba(155, 155, 155, 0.5);
}
.border {
  border: unset !important;
}
.border-dark {
  /* background-color: unset; */
  border-color: unset !important;
}
.table .success {
  background-color: var(--color-success-01);
}
</style>
