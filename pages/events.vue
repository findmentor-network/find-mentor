<template>
  <div class="page guide-page">
    <div id="jumbotron-mentor" class="container">
      <b-jumbotron text-variant="black" border-variant="dark">
        <h1>Events</h1>
        <p>
          <i>
            You can find all the events organized by
            <a href="https://findmentor.network/">findmentor.network</a>
          </i>
        </p>
      </b-jumbotron>

      <div>
        <b-table
          striped
          :table-variant="$colorMode.value"
          :items="events"
          :fields="fields"
          :tbody-tr-class="rowClass"
        >
          <template #cell(event_name)="data">
            <a v-if="data.item.link" :href="`${data.item.link}`">{{
              data.value
            }}</a>
            <span v-else>{{ data.value }}</span>
          </template>

          <template #cell(speakers)="data">
            <span v-for="speaker in data.value" :key="speaker">
              <a :href="`${speaker.twitter}`"> {{ speaker.name }} </a>
            </span>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

// TODO Data will connect with firebase
<script>
export default {
  data() {
    return {
      fields: [{ key: 'event_name' }, 'speakers', 'date', 'status'],
      events: [
        {
          event_name: 'What is the findmenotor? How was start?',
          speakers: [
            {
              name: 'Çağatay Çalı',
              twitter: 'https://twitter.com/cagataycali',
            },
          ],
          link: 'https://www.youtube.com/watch?v=IhNCyOx-2Yc&t=1s',
          date: '2020/12/20',
          status: 'done',
        },
        {
          event_name: 'Q/A About Technical Interviews with Orhan ÖZALP',
          speakers: [
            {
              name: 'Çağatay Çalı',
              twitter: 'https://twitter.com/cagataycali',
            },
            {
              name: 'Orhan ÖZALP',
              twitter: 'https://twitter.com/ocozalp',
            },
          ],
          link: 'https://www.youtube.com/watch?v=5ntPmkZXxb8&t=2s',
          date: '2020/12/24',
          status: 'done',
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
