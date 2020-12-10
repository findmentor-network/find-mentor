<template>
  <div
    v-if="person"
    :class="`item ${personType}`"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <div class="social-media">
      <div v-if="person.twitter_handle.length" class="twitter">
        <a
          :href="person.twitter_handle"
          target="_blank"
          :title="`${person.name} twitter`"
          itemprop="sameAs"
        >
          <font-awesome-icon
            class="social-media-icon"
            :icon="['fab', 'twitter']"
            color="white"
          />
        </a>
      </div>
      <div v-if="person.github.length" class="github">
        <a
          :href="person.github"
          target="_blank"
          :title="`${person.name} github`"
          itemprop="sameAs"
        >
          <font-awesome-icon
            class="social-media-icon"
            :icon="['fab', 'github']"
            color="white"
          />
        </a>
      </div>
      <div v-if="person.linkedin.length" class="linkedin">
        <a
          :href="person.linkedin"
          target="_blank"
          :title="`${person.name} linkedin`"
          itemprop="sameAs"
        >
          <font-awesome-icon
            class="social-media-icon"
            :icon="['fab', 'linkedin']"
            color="white"
          />
        </a>
      </div>
    </div>

    <NuxtLink :to="`/peer/${person.slug}`" itemprop="url">
      <div class="profile-photo">
        <img
          v-if="person.github.length"
          :src="getProfilePicture(person.github)"
          alt="mentee-profile-picture"
          itemprop="image"
          loading="lazy"
        />
        <div v-if="!person.github.length" class="non-image" />
      </div>

      <div class="name">
        {{ person.name }}
      </div>
    </NuxtLink>

    <div class="interests" itemprop="seeks">
      {{ person.interests }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["person", "personType"],
  methods: {
    getProfilePicture(githubLink) {
      const regex = /github.com\/([\w\d-]+)(.+)?/;
      const response = githubLink.match(regex);
      if (!response) {
        return "";
      }
      return `https://avatars.githubusercontent.com/${response[1]}`;
    }
  }
};
</script>

<style scoped>
.item {
  width: 248px;
  height: 320px;
  border-radius: 20px;
  transition: box-shadow 0.3s;
  overflow: hidden;
}

.item.mentee {
  background-color: #32475b;
}

.item.mentor {
  background-color: #17aa90;
}

.item.mentee:hover {
  box-shadow: 16px 16px 16px rgba(11, 11, 11, 0.2);
}
.item.mentor:hover {
  box-shadow: 16px 16px 16px rgba(11, 11, 11, 0.2);
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

.social-media-icon {
  width: 20px;
  height: 20px;
  margin-top: 8px;
}

.twitter {
  background-color: #22acf3;
}

.github {
  background-color: #282e36;
}

.linkedin {
  background-color: #0e76a8;
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

.non-image {
  border-radius: 100%;
  width: 120px;
  height: 120px;
  border: 2px solid white;
  background-image: url(https://findmentor.network/dummy.png);
  background-repeat: no-repeat, repeat;
  background-position: center;
  background-size: cover;
}

.name {
  color: white;
}

.mentee .interests {
  color: #a4a4a4;
}
.mentor .interests {
  color: #d6d5d5;
}

.profile-photo,
.name,
.interests {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 626px) {
  .item {
    width: 300px;
    height: 350px;
  }
  .twitter,
  .github,
  .linkedin {
    width: 40px;
    height: 46px;
    margin-right: 20px;
  }
  .social-media-icon {
    width: 30px;
    height: 30px;
    margin-top: 8px;
    font-size: 25px;
  }
}
</style>
