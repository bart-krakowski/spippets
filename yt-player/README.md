# YouTube Player
## HTML Structure

```html
 <div data-yt-player>
    <button data-ref="yt-player[play-button]" data-active-class="video__play-btn--active">
    </button>
    <div class="video__video-wrapper">
      <div data-ref="yt-player[overlay]" data-active-class="video__overlay--active"></div>
      <iframe data-ref="yt-player[frame]" class="video__iframe" src="<insert-youtube-video-link-here>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
    </div>
  </div>
```

### Notices
- ```id``` attribute for general component is generated automatically (info on error is available in console bug catching)
- ```id``` attribute for ```data-ref="yt-player[frame]"``` is generated automatically
- placeholder image for ```data-ref="yt-player[overlay]"``` is generated automatically