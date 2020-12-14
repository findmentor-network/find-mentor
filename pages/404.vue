<template>
  <div id="center">
    <h1>404</h1>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped>
#center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
h1 {
  padding-top: 40px;
  font-weight: bold;
  font-size: 60px;
}
canvas {
  margin-top: 5vh;
  height: 60vh;
}
</style>

<script>
export default {
  mounted() {
    const { canvas } = this.$refs
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    const img = new Image();
    img.src = this.url;

    const text = [
      'KARDEŞİM BAK/BURASI GAYET BOŞ',
      'BURASI 404/YANLIS YER SANKİ',
      'LİNK YANLIŞ/BİLADERİM YAV',
      'YAZILIM/ÖĞRENSEN İYİ OLUR',
      'HERŞEY İYİ GÜZEL DE/NİYE BURDASIN KANKİ',
      'YİAAA ŞAPŞİK/GİT YAZILIM ÖĞREN',
    ]
    const t = text[Math.floor(Math.random() * (text.length))];

    const top = t.split('/')[0].trim();
    const bottom = t.split('/')[1]?.trim() || '';

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      ctx.drawImage(img, 0, 0);

      ctx.font = `bold ${Math.floor(width / 15)}px Helvetica`;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowColor = 'rgba(0, 0, 0, 1)';
      ctx.shadowBlur = 5;
      ctx.fillStyle= '#FFF';

      ctx.fillText(top, (width - ctx.measureText(top).width) / 2, 40);
      ctx.fillText(bottom, (width - ctx.measureText(bottom).width) / 2, height - 20);
    }
  },
  async asyncData({$content}) {
    const { contribs } = await $content('contribs').fetch()
    const randidx = Math.floor(Math.random() * (contribs.length - 1))
    const randcontrib = contribs[randidx]
    return { url: randcontrib.avatar_url }
  }
}
</script>
