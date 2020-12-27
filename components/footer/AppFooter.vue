<template>
  <v-footer
    :class="`footer app-footer ${revealClass}`"
    :type="$colorMode.value"
    :variant="$colorMode.value"
  >
    <div class="footer-content">
      <b-container>
        <b-row>
          <b-col md="4" sm="12"
            ><h5>Find Mentor</h5>
            <div class="list">
              <div class="list-item">
                <b-link href="/guide/">How İt Works</b-link>
              </div>
              <div class="list-item">
                <b-link target="_blank" href="/mentorships/"
                  >Active Mentorships</b-link
                >
              </div>
              <div class="list-item">
                <b-link target="_blank" href="/events/">Events</b-link>
              </div>
            </div>
          </b-col>
          <b-col md="4" sm="12">
            <h5>Mentors And Mentees</h5>
            <div class="list">
              <div class="list-item">
                <b-link target="_blank" href="/mentors/">Mentors</b-link>
              </div>

              <div class="list-item">
                <b-link target="_blank" href="/mentees/">Mentees</b-link>
              </div>
            </div>
          </b-col>
          <b-col md="4" sm="12">
            <h5>Social</h5>
            <div class="list">
              <div class="list-item">
                <b-link target="_blank" href="https://twitter.com/findmentorapp"
                  >Twitter</b-link
                >
              </div>
              <div class="list-item">
                <b-link
                  target="_blank"
                  href="https://www.youtube.com/channel/UCx7Q-6Qqrf9TU5gY-i9xovA"
                  >YouTube</b-link
                >
              </div>
              <div class="list-item">
                <b-link
                  target="_blank"
                  href="https://www.linkedin.com/company/find-mentor-network"
                  >Linkedin</b-link
                >
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="footer-bottom-bar">
      <strong class="url">findmentor.network</strong>
    </div>
  </v-footer>
</template>

<script>
export default {}
</script>

<style lang="scss">
.app-footer {
  width: 100%;
  .footer-content {
    h5 {
      padding-top: 15px;
    }
    width: 100%;
    background-color: #f8f9fa;
    padding: 20px;
  }
  .footer-bottom-bar {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px;
    background-color: rgb(179, 179, 179);
  }
  .url {
    padding-left: 10px;
    color: white;
  }
}
</style>
