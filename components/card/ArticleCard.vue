<template>
  <div>
    <a href="https://cagatay.me/yaptığın-işten-keyif-al-sev-ad8a9cfb0390">
      <div class="image-div" style="background-image: url('https://miro.medium.com/max/1920/1*DpGRKwHfMVqQ1_TodUa0jQ.jpeg')"/>
      <h4 class="title">Yaptığın işten keyif al, sev!</h4>
      <p class="paragraph">Sevgili dostum, büyüğüm, küçüğüm sözüm sana. Nacizane bir yazılım geliştiricisi adayıyım. Yaptığım işi seviyorum. Ben daha yolun çok…</p>
    </a>
    <a href="http://asd.com">
      <div class="author-info-card">
        <img src="https://cdn-images-1.medium.com/fit/c/36/36/1*z_gEmgkSp_RGmWT-ElsCUg.jpeg" class="avatar-image" alt="Go to the profile of Çağatay Çalı">
        <div class="author-info">
          <span class="author-name">Çağatay Çalı</span>
          <span>Jun 8, 2019</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
</script>

<style scoped>
.title {
  color: var(--color-ui-06);
}
.paragraph {
  color: #888888;
}
.avatar-image {
  vertical-align: middle;
  display: inline-block;
  border-radius: 100%;
}
.author-info-card {
  display:-webkit-box!important;
  display:-webkit-flex!important;
  display:-ms-flexbox!important;
  display:flex!important;
  -webkit-box-align:center!important;
  -webkit-align-items:center!important;
  -ms-flex-align:center!important;
  align-items:center!important;
  color: #888888;
}
.author-name{
  font-size: 18px;
  color: var(--color-ui-06);
}
.author-info {
  padding: 8px;
  display: grid!important;
}
.image-div {
  margin-bottom: 15px;
  width: 328px;
  height: 174px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
@media only screen and (max-width: 1000px) {
  .image-div {
    width: 100%;
  }
}
</style>