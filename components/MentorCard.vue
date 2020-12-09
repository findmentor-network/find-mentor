<template>
  <div class="mentor-item">
    <div class="social-media">
      <div class="twitter">
        <a :href="mentor.twitter_handle">
          <font-awesome-icon class="social-media-icon" :icon="['fab', 'twitter']" color="white"/>
        </a>
      </div>
      <div class="github">
        <a :href="mentor.github">
          <font-awesome-icon class="social-media-icon" :icon="['fab', 'github']" color="white"/>
        </a>
      </div>
      <div class="linkedin">
        <a :href="mentor.linkedin">
          <font-awesome-icon class="social-media-icon" :icon="['fab', 'linkedin']" color="white"/>
        </a>
      </div>
    </div>
    <div class="profile-photo">
      <img :src="getProfilePicture(mentor.github)" alt="mentor-profile-picture" />
    </div>
    <NuxtLink :to="'/mentor/' + mentor.slug">
      <div class="name">
        {{ mentor.name }}
      </div>
    </NuxtLink>

    <div class="mentor-interests">
      {{ mentor.interests }}
    </div>
  </div>
</template>

<script>
export default {
  name: "mentor-card",
  props: ["mentor"],
  methods: {
     getProfilePicture(githubLink) {
      const regex = /github.com\/([\w\d-]+)(.+)?/;
      let response = githubLink.match(regex);
      if(!response){
        return "https://raw.githubusercontent.com/cagataycali/find-mentor/master/assets/images/dummy.png"
      }
      let githubImage = `https://avatars.githubusercontent.com/${response[1]}`;
      console.log(githubImage);
      return githubImage;
    }
  }
};
</script>

<style>
.mentor-item {
  width: 248px;
  height: 320px;
  background-color: #17aa90;
  border-radius: 20px;
  transition: box-shadow .3s;
  overflow: hidden;
}

.mentor-item:hover{
  box-shadow: 16px 16px 16px rgba(11,11,11,.2); 
}

.social-media {
  display: flex;
  justify-content: center;
  margin: 0px 0px 15px 20px;
}

.twitter,
.github,
.linkedin {
  width: 30px;
  height: 36px;
  margin-right: 20px;
}

.twitter {
  background-color: #22acf3;
}

.social-media-icon {
  width: 20px;
  height: 20px;
  margin-top: 8px;
}

.github {
  background-color: #282e36;
}

.linkedin {
  background-color: #f6f6f6;
}

.profile-photo {
  margin: 0 10px 10px 0;
}

.profile-photo img {
  border-radius: 100%;
  width: 120px;
  height: 120px;
  border: 2px solid white;
}


.name {
  color: white;
}

.mentor-interests {
  color: #D6D5D5;
}

.profile-photo,
.name,
.mentor-interests {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
