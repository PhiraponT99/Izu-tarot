# Izu Tarot – Public Assets

## ambient.mp3

Place your ambient sound file here at:
```
/public/ambient.mp3
```

This file is used by the ambient sound toggle button in the UI.

### Recommended specs:
- Format: MP3 (or any browser-supported audio format)
- Duration: 2–5 minutes looping
- Content: Calm ambient music, nature sounds, or meditation tones
- Volume: Normalize to -14 LUFS for comfortable listening

The app uses `audio.loop = true` so the sound will repeat seamlessly.

> Note: The sound button will show but gracefully remain silent if the file is missing.

## og-image.png

Add the social share preview image at:
```
/public/og-image.png
```

Recommended size: 1200 × 630 pixels. The Open Graph and Twitter metadata in
`index.html` already reference this production asset.
