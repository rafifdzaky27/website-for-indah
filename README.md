# Cute Website for Indah

This is a cute, pinkish website created especially for your girlfriend. Here's how to customize it and make it perfect for her.

## How to Customize

### 1. Customize "Things I Love About You"
- Open `index.html`
- Find the section with `class="love-grid"`
- Edit the text inside the `<p>` tags to add your own reasons why you love her
- You can add more items by duplicating the following structure:
  ```html
  <div class="love-item">
      <div class="love-item-inner">
          <p>Your custom text here</p>
      </div>
  </div>
  ```

### 2. Add Your Photos
- Gather photos of you and your girlfriend that you want to display
- Place them in the `assets` folder
- Open `script.js` and find the function `updateGalleryImages`
- Call this function at the end of the file with an array of your image paths:
  ```javascript
  // Add this line at the end of script.js
  updateGalleryImages([
    'assets/photo1.jpg',
    'assets/photo2.jpg',
    'assets/photo3.jpg',
    'assets/photo4.jpg',
    'assets/photo5.jpg',
    'assets/photo6.jpg'
  ]);
  ```

### 3. Add Your YouTube Video
- Find the YouTube video you want to embed
- Copy the video ID (the part after `v=` in the YouTube URL)
- Open `script.js` and find the function `updateYouTubeVideoId`
- Call this function at the end of the file with your video ID:
  ```javascript
  // Add this line at the end of script.js
  updateYouTubeVideoId('YOUR_YOUTUBE_VIDEO_ID');
  ```

### 4. Customize the Text
- Open `script.js` and find the `textToType` array at the beginning
- Change these messages to your own personal messages
- You can also customize other text throughout the HTML file

## How to View the Website
1. Open the `index.html` file in a web browser
2. Enjoy the cute website with your girlfriend!

## Features
- Cute pink theme with animated elements
- Typing animation for your personal message
- Display of your handwritten love note
- Photo gallery of your favorite moments
- Interactive "Do you love me?" section with cute responses
- YouTube video embed
- Final heartfelt message with animations

Enjoy sharing this special website with your girlfriend! ❤️
