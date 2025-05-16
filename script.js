document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts background
    createFloatingHearts();
    
    // Setup background music
    setupBackgroundMusic();
    
    // Setup landing page animation
    setupLandingPage();
    
    // Section navigation setup
    setupNavigation();
    
    // Add click effect to love items
    setupLoveItemsInteraction();

    // Love question buttons
    setupLoveQuestions();
    
    // Setup letter section
    setupLetterSection();

    // Setup journey section
    setupJourneySection();

    // Mood tracker buttons
    setupMoodTracker();
    
    // Setup hidden surprises and reply section
    setupHiddenSurprises();
    
    // Animate photo cards
    setupPhotoCards();
});

// Setup background music
function setupBackgroundMusic() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    // DIRECT APPROACH: Set the music file directly in the audio element in HTML
    // This is already done in the HTML file
    
    let isMusicPlaying = false;
    
    // AGGRESSIVE APPROACH: Try multiple methods to autoplay music
    function attemptAutoplay() {
        console.log('Attempting to autoplay music...');
        
        // Try to play
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Autoplay successful!');
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                isMusicPlaying = true;
            }).catch(e => {
                console.log('Autoplay failed:', e);
                // Try again with muted (browsers allow muted autoplay)
                backgroundMusic.muted = true;
                backgroundMusic.play().then(() => {
                    console.log('Muted autoplay successful!');
                    // Show a message to the user that they need to click to hear sound
                    musicToggle.classList.add('pulse-animation');
                }).catch(e => {
                    console.log('Even muted autoplay failed:', e);
                });
            });
        }
    }
    
    // Try autoplay immediately
    attemptAutoplay();
    
    // Also try when document is fully loaded
    if (document.readyState === 'complete') {
        attemptAutoplay();
    } else {
        window.addEventListener('load', attemptAutoplay);
    }
    
    // Try on first user interaction (most reliable method)
    const userInteractionEvents = ['click', 'touchstart', 'keydown'];
    
    function handleFirstInteraction() {
        backgroundMusic.muted = false; // Unmute if it was muted
        backgroundMusic.play()
            .then(() => {
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                isMusicPlaying = true;
                musicToggle.classList.remove('pulse-animation');
            })
            .catch(e => console.log('Play failed on user interaction:', e));
            
        // Remove all event listeners
        userInteractionEvents.forEach(event => {
            document.removeEventListener(event, handleFirstInteraction);
        });
    }
    
    // Add event listeners for first interaction
    userInteractionEvents.forEach(event => {
        document.addEventListener(event, handleFirstInteraction, { once: true });
    });
    
    // Handle music toggle button
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent this from triggering the document click
        
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            isMusicPlaying = false;
        } else {
            backgroundMusic.muted = false; // Make sure it's not muted
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                    isMusicPlaying = true;
                    musicToggle.classList.remove('pulse-animation');
                }).catch(e => {
                    console.log('Audio play failed:', e);
                    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    isMusicPlaying = false;
                });
            }
        }
    });
    
    // Add a special pulsing animation to the music button
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-attention {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        .pulse-animation {
            animation: pulse-attention 1s infinite;
            box-shadow: 0 0 10px rgba(255, 102, 178, 0.8);
        }
    `;
    document.head.appendChild(style);
}

// Setup landing page
function setupLandingPage() {
    const landingAnimation = document.getElementById('landing-animation');
    const enterSiteBtn = document.getElementById('enter-site');
    
    // Make sure landing animation is active initially
    landingAnimation.classList.add('active');
    
    enterSiteBtn.addEventListener('click', function() {
        landingAnimation.classList.remove('active');
        setTimeout(() => {
            // Show the first section
            document.getElementById('section1').classList.add('active');
            
            // Start typing animation
            const typingText = document.getElementById('typing-text');
            const nextBtn = document.getElementById('next-btn-1');
            
            // Clear any previous content
            typingText.innerHTML = '';
            
            // Hide the button initially
            nextBtn.classList.add('hidden');
            
            const textToType = [
                "My dearest Indah,",
                "I still can't believe I get to call you mine.",
                "Thank you for being my best friend, my love, my everything.",
                "I made this for you, as a small piece of how much I love you.",
            ];
            
            // Show button only after typing is complete
            typeText(typingText, textToType, 0, 0, function() {
                nextBtn.classList.remove('hidden');
            });
        }, 1000);
    });
}

// Setup navigation between sections
function setupNavigation() {
    // Section 1 to Our Story
    document.getElementById('next-btn-1').addEventListener('click', function() {
        changeSection('section1', 'our-story');
        animateTimelineItems();
    });
    
    // Our Story directly to Photobooth Gallery
    document.getElementById('next-btn-story').addEventListener('click', function() {
        changeSection('our-story', 'section3');
        loadGallery();
    });
    
    // Note: Things I Love About You section has been removed
    
    // Gallery to Love Question
    document.getElementById('next-btn-3').addEventListener('click', function() {
        changeSection('section3', 'section4');
    });
    
    // Love Question to Letter
    document.getElementById('next-btn-4').addEventListener('click', function() {
        changeSection('section4', 'letter-section');
    });
    
    // Letter to Journey
    document.getElementById('next-btn-letter').addEventListener('click', function() {
        changeSection('letter-section', 'journey-section');
    });
    
    // Journey directly to Growing Heart (skipping YouTube section)
    document.getElementById('next-btn-journey').addEventListener('click', function() {
        changeSection('journey-section', 'growing-heart-section');
    });
    
    // YouTube to Growing Heart
    document.getElementById('next-btn-5').addEventListener('click', function() {
        changeSection('section5', 'growing-heart-section');
    });
    
    // Growing Heart to Final
    document.getElementById('next-btn-heart').addEventListener('click', function() {
        changeSection('growing-heart-section', 'section6');
    });
}

// Setup love questions
function setupLoveQuestions() {
    const loveOptions = document.querySelectorAll('.love-option');
    const floatingHeartsContainer = document.querySelector('.floating-hearts-container');
        
    // Create initial floating hearts
    createFloatingHeartsBackground(floatingHeartsContainer, 10);
        
    // Fix for love options not being clickable
    loveOptions.forEach(option => {
        // Ensure the option is clickable
        option.onclick = function() {
            // Remove selected class from all options
            loveOptions.forEach(opt => opt.classList.remove('selected'));
                
            // Add selected class to clicked option
            this.classList.add('selected');
                
            const response = this.getAttribute('data-response');
            showLoveResponse(response);
                
            // Create more floating hearts on click
            createFloatingHeartsBackground(floatingHeartsContainer, 5);
        };
    });
}

// Create floating hearts for the love question background
function createFloatingHeartsBackground(container, count) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart floating-heart';
            
        // Random position
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-20px';
            
        // Random size
        const size = Math.random() * 1 + 0.5; // Between 0.5 and 1.5
        heart.style.fontSize = size + 'em';
        
        // Random animation duration
        const duration = Math.random() * 3 + 3; // Between 3 and 6 seconds
        heart.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 2;
        heart.style.animationDelay = delay + 's';
        
        container.appendChild(heart);
        
        // Remove after animation completes
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }
}

// Typing animation function - improved for mobile devices
function typeText(element, textArray, textIndex, charIndex, callback) {
    // Make sure the element is visible and has content before starting
    if (textIndex === 0 && charIndex === 0) {
        // Set initial content and styling to ensure visibility
        element.style.display = 'block';
        element.style.visibility = 'visible';
        element.style.opacity = '1';
        element.innerHTML = ''; // Clear any previous content
        
        // Force element to be visible on iPhone
        setTimeout(() => {
            element.style.display = 'block';
            element.style.visibility = 'visible';
        }, 100);
    }
    
    if (textIndex < textArray.length) {
        if (charIndex < textArray[textIndex].length) {
            // Add character by character
            element.innerHTML += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(function() {
                typeText(element, textArray, textIndex, charIndex, callback);
            }, 50); // Typing speed
        } else {
            // Don't add line breaks after the last line
            if (textIndex < textArray.length - 1) {
                element.innerHTML += '<br><br>';
            }
            textIndex++;
            charIndex = 0;
            setTimeout(function() {
                typeText(element, textArray, textIndex, charIndex, callback);
            }, 500); // Delay between sentences
        }
    } else if (callback) {
        // Animation is complete, execute callback function
        callback();
    }
}

// Change section function
function changeSection(current, next) {
    document.getElementById(current).classList.remove('active');
    document.getElementById(next).classList.add('active');
    window.scrollTo(0, 0);
}

// Load gallery images
function loadGallery() {
    setupPhotoboothGallery();
}

// Setup photobooth gallery with videos - completely simplified approach
function setupPhotoboothGallery() {
    console.log('Setting up photobooth gallery - simplified version');
    
    // Get all necessary elements
    const videoPlayer = document.getElementById('main-video-player');
    const videoCaption = document.getElementById('video-caption');
    const prevBtn = document.getElementById('prev-video');
    const nextBtn = document.getElementById('next-video');
    const playBtn = document.getElementById('play-video');
    const continueBtn = document.querySelector('.continue-btn');
    const photoboothSection = document.querySelector('#section3');
    
    // Define video data
    const videos = [
        { src: 'assets/videos/photobooth5.mp4', caption: 'Our First Photobooth', isVertical: false },
        { src: 'assets/videos/photobooth1.mp4', caption: 'Lengkong!', isVertical: true },
        { src: 'assets/videos/photobooth4.mp4', caption: 'CUPS!! (with the fear of meeting your dad)', isVertical: false },
        { src: 'assets/videos/photobooth2.mp4', caption: 'TSM Newest Photobooth!!', isVertical: false },
        { src: 'assets/videos/photobooth3.mp4', caption: 'My favorite. you look SOO beautiful.', isVertical: true }
    ];
    
    // Variables to track state
    let currentIndex = 0;
    let isPlaying = false;
    const viewedVideos = new Set();
    
    // Fix cursor issues
    const allPhotoboothElements = photoboothSection.querySelectorAll('*');
    allPhotoboothElements.forEach(el => {
        el.style.cursor = 'default';
        el.style.pointerEvents = 'none';
    });
    
    // Re-enable pointer events only for control buttons
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.style.pointerEvents = 'auto';
        btn.style.cursor = 'pointer';
    });
    
    // Disable all mouse events on video
    videoPlayer.style.pointerEvents = 'none';
    videoPlayer.style.cursor = 'default';
    
    // Function to show a specific video
    function showVideo(index) {
        console.log(`Showing video at index: ${index}`);
        
        // Mark this video as viewed
        viewedVideos.add(index);
        
        // Check if all videos have been viewed
        if (viewedVideos.size === videos.length) {
            continueBtn.classList.remove('hidden');
        }
        
        // Pause current video
        videoPlayer.pause();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        // Get the current video data
        const currentVideo = videos[index];
        
        // Update video source
        const videoSource = videoPlayer.querySelector('source');
        videoSource.src = currentVideo.src;
        
        // Update video orientation class
        videoPlayer.className = currentVideo.isVertical ? 'vertical-video' : 'horizontal-video';
        
        // Update caption
        videoCaption.textContent = currentVideo.caption;
        
        // Load and reset the video
        videoPlayer.load();
        videoPlayer.currentTime = 0;
        
        // Create heart particles for transition effect
        createPhotoboothHearts();
    }
    
    // Previous button click
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        showVideo(currentIndex);
    });
    
    // Next button click
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % videos.length;
        showVideo(currentIndex);
    });
    
    // Play/pause button click
    playBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isPlaying) {
            videoPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            // Try to play the video
            const playPromise = videoPlayer.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    isPlaying = true;
                }).catch(error => {
                    console.log('Video play failed:', error);
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                    isPlaying = false;
                });
            }
        }
    });
    
    // Continue button click
    continueBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        changeSection('section3', 'section4');
    });
    
    // Add swipe functionality for mobile
    const photoboothScreen = document.querySelector('.photobooth-screen');
    let touchStartX = 0;
    let touchEndX = 0;
    
    photoboothScreen.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    photoboothScreen.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left, go to next
            nextBtn.click();
        } else if (touchEndX > touchStartX) {
            // Swipe right, go to previous
            prevBtn.click();
        }
    }
    
    // Initialize the first video
    showVideo(currentIndex);
}

// Create hearts for photobooth transitions
function createPhotoboothHearts() {
    const photoboothScreen = document.querySelector('.photobooth-screen');
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart photobooth-heart';
        
        // Random position
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 1.5 + 0.5; // Between 0.5 and 2rem
        heart.style.fontSize = size + 'rem';
        
        // Random animation duration
        const duration = Math.random() * 1.5 + 0.5; // Between 0.5 and 2 seconds
        heart.style.animationDuration = duration + 's';
        
        // Add to container
        photoboothScreen.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
}

// Function to create mini hearts that fly out when a love item is clicked
function createMiniHearts(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'mini-heart';
        document.body.appendChild(heart);
        
        // Position at the center of the clicked element
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const destinationX = centerX + Math.cos(angle) * distance;
        const destinationY = centerY + Math.sin(angle) * distance;
        
        // Animate the heart
        heart.animate([
            { transform: 'scale(0.5)', opacity: 0.8 },
            { transform: 'scale(1.5)', opacity: 0, left: destinationX + 'px', top: destinationY + 'px' }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => heart.remove();
    }
}

// Show love response
function showLoveResponse(response) {
    const loveResponse = document.getElementById('love-response');
    const nextBtn = document.getElementById('next-btn-4');
    
    let message = '';
    
    switch(response) {
        case 'Yes':
            message = "I'm so happy you love me! ❤️";
            break;
        case 'Yessss':
            message = "Aww, that's so sweet! I love you too! ❤️❤️";
            break;
        case 'Very much':
            message = "You make my heart flutter! I love you more! ❤️❤️❤️";
            break;
        case 'Super duper love you':
            message = "You're the best thing that ever happened to me! ❤️❤️❤️❤️";
            break;
    }
    
    loveResponse.innerHTML = message;
    nextBtn.classList.remove('hidden');
    
    // Add heart confetti
    createHeartConfetti();
}

// Load YouTube video
function loadYouTubeVideo() {
    // Replace 'VIDEO_ID_HERE' with your actual YouTube video ID
    const videoId = 'VIDEO_ID_HERE'; // Example: dQw4w9WgXcQ
    
    // Load YouTube API
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        window.onYouTubeIframeAPIReady = function() {
            createYouTubePlayer(videoId);
        };
    } else {
        createYouTubePlayer(videoId);
    }
}

function createYouTubePlayer(videoId) {
    new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
            'autoplay': 1,
            'controls': 1,
            'rel': 0
        }
    });
}

// Create floating hearts background
function createFloatingHearts() {
    const container = document.createElement('div');
    container.className = 'floating-hearts';
    document.body.appendChild(container);
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        // Random position
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Random size
        const size = Math.random() * 20 + 10;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 15 + 10;
        heart.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 10;
        heart.style.animationDelay = delay + 's';
        
        container.appendChild(heart);
    }
}

// Create heart confetti
function createHeartConfetti() {
    const container = document.querySelector('.love-response');
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'confetti-heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        const size = Math.random() * 10 + 5;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        heart.style.position = 'absolute';
        heart.style.top = '-20px';
        heart.style.backgroundColor = '#ff66b2';
        heart.style.borderRadius = '50%';
        heart.style.animation = 'fall 3s linear forwards';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}

// Add this to your CSS using JavaScript
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes fall {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100px) rotate(360deg);
        opacity: 0;
    }
}
</style>
`);

// Function to update the love note image
function updateLoveNote(imagePath) {
    const noteContainer = document.querySelector('.note-placeholder');
    noteContainer.innerHTML = `<img src="${imagePath}" alt="Love Note" style="max-width: 100%; border-radius: 8px;">`;
}

// Function to update gallery images
function updateGalleryImages(imageArray) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    
    imageArray.forEach(imgSrc => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Us together';
        
        item.appendChild(img);
        gallery.appendChild(item);
    });
}

// Animate timeline items
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animated');
        }, 500 * index);
    });
}

// Animate dream bubbles
function animateDreamBubbles() {
    const dreamBubbles = document.querySelectorAll('.dream-bubble');
    
    dreamBubbles.forEach((bubble, index) => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(20px)';
        bubble.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            bubble.style.opacity = '1';
            bubble.style.transform = 'translateY(0)';
        }, 300 * index);
    });
}

// Setup journey section with airplane animation
function setupJourneySection() {
    // Create floating hearts when the section becomes active
    document.getElementById('journey-section').addEventListener('transitionend', function(e) {
        if (e.target === this && this.classList.contains('active')) {
            createJourneyHearts();
        }
    });
}

// Create floating hearts for the journey section
function createJourneyHearts() {
    const journeyScene = document.querySelector('.journey-scene');
    
    // Create 15 random hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart';
            heart.style.position = 'absolute';
            heart.style.color = '#ff66b2';
            heart.style.opacity = '0.6';
            heart.style.zIndex = '2';
            
            // Random size
            const size = Math.random() * 1 + 0.5; // Between 0.5 and 1.5rem
            heart.style.fontSize = size + 'rem';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 60;
            heart.style.left = x + '%';
            heart.style.top = y + '%';
            
            // Animation
            heart.style.animation = `float-journey-heart ${Math.random() * 5 + 10}s linear forwards`;
            
            journeyScene.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 15000);
        }, i * 800); // Stagger creation
    }
}

// Add the float-journey-heart animation to the stylesheet
const journeyHeartStyle = document.createElement('style');
journeyHeartStyle.textContent = `
    @keyframes float-journey-heart {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(journeyHeartStyle);

// Setup growing heart section
function setupMoodTracker() {
    // We're replacing the mood tracker with the growing heart
    setupGrowingHeart();
}

// Setup growing heart
function setupGrowingHeart() {
    const growingHeart = document.getElementById('growing-heart');
    const heartSizeCounter = document.getElementById('heart-size-counter');
    const heartMessage = document.getElementById('heart-message');
    const surpriseContainer = document.getElementById('surprise-image-container');
    const nextBtn = document.getElementById('next-btn-heart');
    const heartContainer = document.querySelector('.growing-heart-container');
    
    let clickCount = 0;
    const maxClicks = 10;
    let currentSize = 3; // Starting size in rem
    
    // Make sure the surprise image is using the correct path
    const surpriseImage = document.getElementById('surprise-image');
    if (surpriseImage) {
        surpriseImage.src = 'assets/images/surprise.png';
    }
    
    // Fix for heart not being clickable - use direct onclick property
    growingHeart.onclick = function() {
        if (clickCount >= maxClicks) return;
        
        clickCount++;
        currentSize += 0.5;
        
        // Update heart size
        growingHeart.style.fontSize = currentSize + 'rem';
        
        // Update counter
        heartSizeCounter.textContent = clickCount + ' / ' + maxClicks;
        
        // Create heart particles
        createHeartParticles(growingHeart);
        
        // Show messages based on progress
        updateHeartMessage(heartMessage, clickCount, maxClicks);
        
        // If reached max clicks, show surprise
        if (clickCount >= maxClicks) {
            // Pop animation
            growingHeart.style.animation = 'pop-in 0.5s forwards';
            
            // Show surprise after a delay
            setTimeout(() => {
                // Hide the heart container completely
                heartContainer.style.display = 'none';
                
                // Show surprise image
                surpriseContainer.style.display = 'block';
                setTimeout(() => {
                    surpriseContainer.classList.add('visible');
                }, 50);
                
                // Show next button
                nextBtn.classList.remove('hidden');
                
                // Create a burst of hearts
                createHeartBurst(document.querySelector('.content'));
            }, 1000);
        }
    };
}

// Create heart particles when clicking the heart
function createHeartParticles(heartElement) {
    const container = heartElement.parentElement;
    const rect = heartElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Create 5 particles
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('i');
        particle.className = 'fas fa-heart heart-particle';
        
        // Random size
        const size = Math.random() * 0.8 + 0.4; // Between 0.4 and 1.2rem
        particle.style.fontSize = size + 'rem';
        
        // Position at the center of the heart
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
        particle.style.setProperty('--r', Math.random() * 360 + 'deg');
        
        container.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Create a burst of hearts when the heart pops
function createHeartBurst(container) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('i');
        particle.className = 'fas fa-heart heart-particle';
        
        // Random size
        const size = Math.random() * 1.5 + 0.5; // Between 0.5 and 2rem
        particle.style.fontSize = size + 'rem';
        
        // Position at the center
        const x = container.offsetWidth / 2;
        const y = container.offsetHeight / 2;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 50;
        particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
        particle.style.setProperty('--r', Math.random() * 360 + 'deg');
        
        container.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Update heart message based on click progress
function updateHeartMessage(messageElement, clickCount, maxClicks) {
    let message = '';
    
    if (clickCount === 1) {
        message = "Keep clicking! Let's see how big our love can grow! ❤️";
    } else if (clickCount === Math.floor(maxClicks / 3)) {
        message = "You're doing great! Our love is growing stronger! ❤️";
    } else if (clickCount === Math.floor(maxClicks * 2 / 3)) {
        message = "Almost there! Can you feel the love? ❤️";
    } else if (clickCount === maxClicks - 1) {
        message = "Just one more click! ❤️";
    } else if (clickCount === maxClicks) {
        message = "You did it! Our love is bursting! ❤️";
    }
    
    if (message) {
        // Show the message with a typing effect
        messageElement.textContent = '';
        typeTextSimple(messageElement, message, 0);
    }
}

// Simple typing effect for mood responses
function typeTextSimple(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => {
            typeTextSimple(element, text, index + 1);
        }, 30);
    }
}

// Add click effect to love items
function setupLoveItemsInteraction() {
    const loveItems = document.querySelectorAll('.love-item');
    loveItems.forEach(item => {
        item.addEventListener('click', () => {
            const innerItem = item.querySelector('.love-item-inner');
            if (innerItem) {
                innerItem.classList.toggle('flipped');
            }
        });
    });
}

// Setup letter section function
function setupLetterSection() {
    // Letter section navigation is already handled in setupNavigation
    // This function is just a placeholder to ensure the function exists
    console.log('Letter section setup complete');
}

// Function for inline love option click handler
function selectLoveOption(element, response) {
    // Remove selected class from all options
    const loveOptions = document.querySelectorAll('.love-option');
    loveOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Get the love meter elements
    const loveMeterFill = document.querySelector('.love-meter-fill');
    const loveMeterMarker = document.querySelector('.love-meter-marker');
    
    // Set the fill percentage based on which option was selected
    let fillPercentage = 0;
    if (response.includes('10')) {
        fillPercentage = 25;
    } else if (response.includes('3000')) {
        fillPercentage = 50;
    } else if (response.includes('infinity') && !response.includes('beyond')) {
        fillPercentage = 75;
    } else if (response.includes('beyond') || response.includes('∞<sup>∞</sup>')) {
        fillPercentage = 100;
    }
    
    // Animate the love meter
    loveMeterFill.style.width = `${fillPercentage}%`;
    setTimeout(() => {
        loveMeterMarker.classList.add('active');
    }, 500);
    
    // Create heart explosion animation
    createHeartExplosion(element, fillPercentage);
    
    // Show the response
    const loveResponse = document.getElementById('love-response');
    const nextBtn = document.getElementById('next-btn-4');
    
    // Clear previous response
    loveResponse.textContent = response;
    loveResponse.classList.remove('active');
    
    // Animate the response
    setTimeout(() => {
        loveResponse.classList.add('active');
    }, 300);
    
    // Show the next button
    setTimeout(() => {
        nextBtn.classList.remove('hidden');
    }, 1500);
    
    // Create more floating hearts on click
    const floatingHeartsContainer = document.querySelector('.floating-hearts-container');
    createFloatingHeartsBackground(floatingHeartsContainer, 5);
}

// Create heart explosion animation
function createHeartExplosion(element, intensity) {
    const explosionContainer = document.querySelector('.explosion-container');
    const rect = element.getBoundingClientRect();
    const containerRect = explosionContainer.getBoundingClientRect();
    
    // Calculate the center point relative to the explosion container
    const centerX = rect.left + rect.width / 2 - containerRect.left;
    const centerY = rect.top + rect.height / 2 - containerRect.top;
    
    // Clear previous hearts
    explosionContainer.innerHTML = '';
    
    // Number of hearts based on intensity
    const heartCount = Math.floor(intensity / 10) + 10;
    
    // Create hearts
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'explosion-heart';
        heart.innerHTML = '❤️';
        
        // Random position around the center
        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;
        
        // Random direction for animation
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 150;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const rotation = -180 + Math.random() * 360;
        
        // Set CSS variables for the animation
        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);
        heart.style.setProperty('--r', `${rotation}deg`);
        
        // Random delay
        heart.style.animationDelay = `${Math.random() * 0.5}s`;
        
        explosionContainer.appendChild(heart);
    }
}

// Function for inline growing heart click handler
function growHeart() {
    const growingHeart = document.getElementById('growing-heart');
    const heartSizeCounter = document.getElementById('heart-size-counter');
    const heartMessage = document.getElementById('heart-message');
    const surpriseContainer = document.getElementById('surprise-image-container');
    const nextBtn = document.getElementById('next-btn-heart');
    const heartContainer = document.querySelector('.growing-heart-container');
    
    // Get current click count from counter text
    let counterText = heartSizeCounter.textContent;
    let clickCount = parseInt(counterText.split('/')[0].trim());
    const maxClicks = 10;
    
    // If already at max clicks, do nothing
    if (clickCount >= maxClicks) return;
    
    // Increment click count
    clickCount++;
    
    // Calculate new size (starting from 3rem, increase by 0.5rem per click)
    let currentSize = 3 + (0.5 * clickCount);
    
    // Update heart size
    growingHeart.style.fontSize = currentSize + 'rem';
    
    // Update counter
    heartSizeCounter.textContent = clickCount + ' / ' + maxClicks;
    
    // Create heart particles
    createHeartParticles(growingHeart);
    
    // Show messages based on progress
    updateHeartMessage(heartMessage, clickCount, maxClicks);
    
    // If reached max clicks, show surprise
    if (clickCount >= maxClicks) {
        // Pop animation
        growingHeart.style.animation = 'pop-in 0.5s forwards';
        
        // Show surprise after a delay
        setTimeout(() => {
            // Hide the heart container completely
            heartContainer.style.display = 'none';
            
            // Show surprise image
            surpriseContainer.style.display = 'block';
            setTimeout(() => {
                surpriseContainer.classList.add('visible');
            }, 50);
            
            // Show next button
            nextBtn.classList.remove('hidden');
            
            // Create a burst of hearts
            createHeartBurst(document.querySelector('.content'));
        }, 1000);
    }
}

// Setup hidden surprises and reply section
function setupHiddenSurprises() {
    const flowerBtn = document.getElementById('flower-btn');
    const hugAnimation = document.getElementById('hug-animation');
    const sendReply = document.getElementById('send-reply');
    const replyConfirmation = document.getElementById('reply-confirmation');
    
    if (flowerBtn) {
        flowerBtn.addEventListener('click', function() {
            hugAnimation.classList.remove('hidden');
            createHeartConfetti();
        });
    }
    
    if (sendReply) {
        sendReply.addEventListener('click', function() {
            // In a real app, you might send this to your email
            // For now, just show the confirmation
            replyConfirmation.classList.remove('hidden');
            createHeartConfetti();
        });
    }
}

// Setup photo cards animation
function setupPhotoCards() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach((card, index) => {
        // Add animated class with staggered delay
        setTimeout(() => {
            card.classList.add('animated');
        }, 150 * index);
        
        // Add click event for flipping
        card.addEventListener('click', function() {
            const innerCard = this.querySelector('.photo-card-inner');
            
            // Toggle the flipped class
            if (innerCard.classList.contains('flipped')) {
                innerCard.classList.remove('flipped');
            } else {
                innerCard.classList.add('flipped');
                
                // Create mini hearts when flipping to show the memory
                createMiniHearts(this);
            }
        });
    });
}

// Function to update YouTube video ID
function updateYouTubeVideoId(videoId) {
    // This function can be called to update the YouTube video ID
    window.youtubeVideoId = videoId;
}

// Function to animate love items with a staggered effect
function animateLoveItems() {
    const loveItems = document.querySelectorAll('.love-item');
    
    loveItems.forEach((item, index) => {
        // Add animated class with staggered delay
        setTimeout(() => {
            item.classList.add('animated');
        }, 150 * index);
    });
}

// Function to setup interactive effects for love items
function setupLoveItemsInteraction() {
    const loveItems = document.querySelectorAll('.love-item');
    
    loveItems.forEach(item => {
        // Add click effect for card flip
        item.addEventListener('click', function() {
            const innerCard = this.querySelector('.love-item-inner');
            
            // Toggle the flipped class
            if (innerCard.classList.contains('flipped')) {
                innerCard.classList.remove('flipped');
                
                // Create mini hearts that fly out when flipping back
                createMiniHearts(this);
            } else {
                innerCard.classList.add('flipped');
            }
        });
    });
    
    // Setup photo cards flip functionality
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        card.addEventListener('click', function() {
            const innerCard = this.querySelector('.photo-card-inner');
            
            // Toggle the flipped class
            if (innerCard.classList.contains('flipped')) {
                innerCard.classList.remove('flipped');
            } else {
                innerCard.classList.add('flipped');
                
                // Create mini hearts when flipping to show the memory
                createMiniHearts(this);
            }
        });
    });
    
    // Add the pulse animation CSS
    document.head.insertAdjacentHTML('beforeend', `
    <style>
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    .pulse-animation .love-item-inner {
        animation: pulse 0.7s ease;
    }
    .mini-heart {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #ff66b2;
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
        opacity: 0.8;
    }
    </style>
    `);
}

// Function to create mini hearts that fly out when a love item is clicked
function createMiniHearts(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'mini-heart';
        document.body.appendChild(heart);
        
        // Position at the center of the clicked element
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const destinationX = centerX + Math.cos(angle) * distance;
        const destinationY = centerY + Math.sin(angle) * distance;
        
        // Animate the heart
        heart.animate([
            { transform: 'scale(0.5)', opacity: 0.8 },
            { transform: 'scale(1.5)', opacity: 0, left: destinationX + 'px', top: destinationY + 'px' }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => heart.remove();
    }
}
