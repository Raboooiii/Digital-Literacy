document.addEventListener('DOMContentLoaded', function() {
    // Accessibility Features
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');
    const fontReset = document.getElementById('font-reset');
    const languageSelector = document.getElementById('language-selector');
    const voiceCommandBtn = document.getElementById('voice-command-btn');
    
    // Font Size Adjustment
    let currentFontSize = 16;
    
    fontIncrease.addEventListener('click', function() {
        if (currentFontSize < 24) {
            currentFontSize += 2;
            document.body.style.fontSize = currentFontSize + 'px';
            document.body.classList.add('large-text');
        }
    });
    
    fontDecrease.addEventListener('click', function() {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            document.body.style.fontSize = currentFontSize + 'px';
            if (currentFontSize <= 18) {
                document.body.classList.remove('large-text');
            }
        }
    });
    
    fontReset.addEventListener('click', function() {
        currentFontSize = 16;
        document.body.style.fontSize = '';
        document.body.classList.remove('large-text');
    });
    
    // Language Selection (simulated)
    languageSelector.addEventListener('change', function() {
        const selectedLanguage = this.value;
        alert(`Language changed to ${this.options[this.selectedIndex].text}. This is a demo - actual multilingual support would require translation files.`);
    });
    
    // Voice Command (simulated)
    voiceCommandBtn.addEventListener('click', function() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.start();
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript.toLowerCase();
                alert(`You said: "${transcript}". This is a demo - actual voice commands would trigger specific actions.`);
            };
            
            recognition.onerror = function(event) {
                alert('Error occurred in recognition: ' + event.error);
            };
        } else {
            alert('Speech recognition not supported in your browser. Try Chrome or Edge.');
        }
    });
    
    // Tutorial Modal
    const tutorialBtns = document.querySelectorAll('.tutorial-btn');
    const tutorialModal = document.getElementById('tutorial-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const tutorialVideo = document.getElementById('tutorial-video');
    const tutorialStepsList = document.getElementById('tutorial-steps-list');
    
    // Tutorial data
    const tutorials = {
        whatsapp: {
            title: 'WhatsApp Tutorial',
            videoSrc: 'assets/videos/whatsapp-guide.mp4',
            steps: [
                'Download WhatsApp from your app store',
                'Open the app and agree to the terms',
                'Verify your phone number via SMS',
                'Set up your profile name and photo',
                'Start chatting by tapping the chat icon',
                'Make calls using the phone icon',
                'Create groups for family/friends'
            ]
        },
        paytm: {
            title: 'Paytm Tutorial',
            videoSrc: 'assets/videos/paytm-guide.mp4',
            steps: [
                'Download Paytm from your app store',
                'Sign up with your mobile number',
                'Set up a secure password',
                'Link your bank account or card',
                'Add money to your Paytm wallet',
                'Pay bills under the "Payments" section',
                'Scan QR codes to make payments'
            ]
        },
        maps: {
            title: 'Google Maps Tutorial',
            videoSrc: 'assets/videos/maps-guide.mp4',
            steps: [
                'Download Google Maps from your app store',
                'Allow location access when prompted',
                'Search for places using the search bar',
                'Get directions by tapping "Directions"',
                'Choose your transportation method',
                'Follow the turn-by-turn navigation',
                'Save favorite places for quick access'
            ]
        }
    };
    
    // Open tutorial modal
    tutorialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tutorialId = this.getAttribute('data-tutorial');
            const tutorial = tutorials[tutorialId];
            
            modalTitle.textContent = tutorial.title;
            tutorialVideo.src = tutorial.videoSrc;
            
            // Load steps
            tutorialStepsList.innerHTML = '';
            tutorial.steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                tutorialStepsList.appendChild(li);
            });
            
            tutorialModal.classList.add('active');
            tutorialVideo.load();
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        tutorialModal.classList.remove('active');
        tutorialVideo.pause();
    });
    
    // Close modal when clicking outside
    tutorialModal.addEventListener('click', function(e) {
        if (e.target === tutorialModal) {
            tutorialModal.classList.remove('active');
            tutorialVideo.pause();
        }
    });
    
    // DigiBuddy Chatbot
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendMessageBtn = document.getElementById('send-message');
    const voiceInputBtn = document.getElementById('voice-input');
    const quickQuestions = document.querySelectorAll('.quick-question');
    const chatbotMinimize = document.querySelector('.chatbot-minimize');
    
    // Chatbot responses
    const chatbotResponses = {
        'hello': 'Hello there! How can I help you with digital tools today?',
        'hi': 'Hi! I\'m DigiBuddy. Ask me anything about using smartphones and apps!',
        'how are you': 'I\'m just a chatbot, but I\'m always happy to help you learn!',
        'whatsapp': 'For WhatsApp: You can send messages, make calls, and share photos. Would you like step-by-step instructions?',
        'paytm': 'For Paytm: You can pay bills, transfer money, and shop online. Would you like a tutorial?',
        'google maps': 'For Google Maps: You can find directions, check traffic, and explore places. Would you like to learn how to use it?',
        'video call': 'To video call on WhatsApp: 1) Open a chat 2) Tap the video icon 3) Wait for the person to answer',
        'send money': 'To send money with Paytm: 1) Go to "Passbook" 2) Select "Send Money" 3) Enter amount and recipient 4) Confirm',
        'directions': 'To get directions on Maps: 1) Search for a place 2) Tap "Directions" 3) Choose your transport 4) Follow the route',
        'default': 'I\'m not sure I understand. Could you try asking about WhatsApp, Paytm, or Google Maps?'
    };
    
    // Add message to chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const messageText = document.createElement('p');
        messageText.textContent = text;
        
        messageDiv.appendChild(messageText);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Process user input
    function processUserInput() {
        const text = userInput.value.trim().toLowerCase();
        if (text === '') return;
        
        addMessage(text, true);
        userInput.value = '';
        
        // Simulate thinking delay
        setTimeout(() => {
            let response = chatbotResponses.default;
            
            // Check for matching responses
            for (const key in chatbotResponses) {
                if (text.includes(key)) {
                    response = chatbotResponses[key];
                    break;
                }
            }
            
            addMessage(response);
        }, 800);
    }
    
    // Send message on button click
    sendMessageBtn.addEventListener('click', processUserInput);
    
    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processUserInput();
        }
    });
    
    // Quick questions
    quickQuestions.forEach(question => {
        question.addEventListener('click', function() {
            userInput.value = this.textContent;
            processUserInput();
        });
    });
    
    // Voice input
    voiceInputBtn.addEventListener('click', function() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.start();
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                userInput.value = transcript;
                processUserInput();
            };
            
            recognition.onerror = function(event) {
                addMessage("Sorry, I didn't catch that. Could you try typing instead?");
            };
        } else {
            addMessage("Voice input isn't supported in your browser. Please type your question.");
        }
    });
    
    // Minimize/maximize chatbot
    chatbotMinimize.addEventListener('click', function() {
        const messages = document.querySelector('.chatbot-messages');
        const quickQs = document.querySelector('.quick-questions');
        
        if (messages.style.display === 'none') {
            messages.style.display = 'block';
            quickQs.style.display = 'block';
            this.innerHTML = '<i class="fas fa-minus"></i>';
        } else {
            messages.style.display = 'none';
            quickQs.style.display = 'none';
            this.innerHTML = '<i class="fas fa-plus"></i>';
        }
    });
    
    // Feedback Form
    const feedbackForm = document.getElementById('feedback-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real app, you would send this data to a server
        const formData = {
            name: this.name.value,
            email: this.email.value,
            type: this['feedback-type'].value,
            message: this.message.value,
            rating: this.rating.value
        };
        
        console.log('Feedback submitted:', formData);
        
        // Show thank you message
        feedbackForm.style.display = 'none';
        thankYouMessage.style.display = 'block';
        
        // Reset form after delay
        setTimeout(() => {
            feedbackForm.reset();
            feedbackForm.style.display = 'block';
            thankYouMessage.style.display = 'none';
        }, 5000);
    });
    
    // Floating Help Button
    const floatingHelpBtn = document.getElementById('floating-help-btn');
    
    floatingHelpBtn.addEventListener('click', function() {
        // Scroll to chatbot section
        document.getElementById('digibuddy').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Pulse animation
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 1000);
    });
    
    // Add pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        .pulse {
            animation: pulse 0.5s ease;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Highlight current section in nav
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}); 