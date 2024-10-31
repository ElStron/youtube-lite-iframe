## Basic usage Astro
```html
<head>
  <script> import { liteYoutubeIframe } from 'youtube-lite-iframe/component';</script>
</head>
```
Use Id video or Src 
```html
---
import { YoutubeEmbed } from "youtube-lite-iframe";
---
<YoutubeEmbed
  id="Jvd-d4"
  title="Example"
></YoutubeEmbed>
```

## Basic usage typescript
Import component and liteYoutube function
```html
<head>
  <script> import { liteYoutubeIframe } from 'youtube-lite-iframe/component';</script>
</head>
```
```javascript
  import { liteYoutube } from "youtube-lite-iframe";

  liteYoutube({
    id: "vs-5674"
    title: "Example"
  })
```

