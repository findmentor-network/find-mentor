<template>
  <div class="footer app-footer">
    <div class="footer-content">
      <b-container>
        <b-row>
          <b-col md="3" sm="12"
            ><h5>Find Mentor</h5>
            <div class="list">
              <div class="list-item">
                <b-link href="/guide/">How It Works</b-link>
              </div>
              <div class="list-item">
                <b-link target="_blank" href="/mentorships/">Mentorships</b-link>
              </div>
              <div class="list-item">
                <b-link target="_blank" href="/events/">Events</b-link>
              </div>
              <div class="list-item">
                <b-link target="_blank" href="/jobs/">Jobs</b-link>
              </div>
            </div>
          </b-col>
          <b-col md="3" sm="12">
            <h5>Mentors And Mentees</h5>
            <div class="list">
              <div class="list-item">
                <b-link target="_blank" href="/mentors/">Mentors</b-link>
              </div>
              <div class="list-item">
                <b-link target="_blank" href="/mentees/">Mentees</b-link>
              </div>
              <div class="list-item">
                <b-link target="_blank" href="/hire/">Job Seekers</b-link>
              </div>
            </div>
          </b-col>
          <b-col md="3" sm="12">
            <h5>Social</h5>
            <div class="list mt-4">
              <b-link target="_blank" href="https://twitter.com/findmentorapp">
                <font-awesome-icon class="social-media__icon" :icon="['fab', 'twitter']" size="2x" />
              </b-link>
              <b-link target="_blank" href="https://www.youtube.com/channel/UCx7Q-6Qqrf9TU5gY-i9xovA"
                ><font-awesome-icon class="social-media__icon mr-1" :icon="['fab', 'youtube']" size="2x" />
              </b-link>
              <b-link target="_blank" href="https://www.linkedin.com/company/find-mentor-network"
                ><font-awesome-icon class="social-media__icon" :icon="['fab', 'linkedin']" size="2x" />
              </b-link>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="footer-bottom-bar">
      <p><strong class="url">findmentor.network</strong> © {{ new Date().getFullYear() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style lang="scss">
.app-footer {
  width: 100%;
  padding-top: 25px;
  .footer-content {
    background-color: var(--color-ui-02);
    color: var(--color-text-01);
    .row {
      display: flex;
      text-align: center;
      justify-content: center;
    }
    h5 {
      padding-top: 15px;
    }
    padding: 20px;
  }
  .footer-bottom-bar {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px;
    background-color: var(--color-ui-01);
    color: var(--color-text-02);
  }
  .url {
    padding-left: 10px;
  }
}
</style>
