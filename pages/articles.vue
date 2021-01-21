<template>
    <div>
        <h1 style="text-align: center; margin: 32px 0px;">Articles</h1>
        <div class="container">
            <div class="grid">
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ArticlesPage'
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 25px;
  align-items: center;
  justify-content: center;
}
@media only screen and (max-width: 1000px) {
  .grid {
    grid-template-columns: 100%;
    align-items: center;
    justify-content: center;
  }
}
</style>