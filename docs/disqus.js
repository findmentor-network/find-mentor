/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

/**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */

// eslint-disable-next-line no-var
var disqus_config = function () {
  this.page.url = window.location.href // Replace PAGE_URL with your page's canonical URL variable
  this.page.identifier = window.location.href // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
(function () { // DON'T EDIT BELOW THIS LINE
  const d = document; const s = d.createElement('script')
  s.src = 'https://findmentor.disqus.com/embed.js'
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s)
})()
