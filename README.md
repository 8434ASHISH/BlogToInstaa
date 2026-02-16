# FirstAid AI - Emergency & Care Companion

A modern, accessible, mobile-first healthcare AI web application that helps users during medical emergencies with step-by-step AI-guided first aid and supports daily care through medicine and appointment reminders.

## Features

### 🚨 Emergency Mode
- Voice-first emergency assistance
- Step-by-step first aid guidance for:
  - Accidents
  - Heart problems
  - Bleeding
  - Stroke
  - Choking
  - Burns
- One-tap 911 calling
- Calm, clear instructions for stressed situations

### 💚 Care Mode
- Medicine reminder cards with "Taken" and "Snooze" options
- Appointment reminders with location and timing
- Daily health goals and step tracking
- AI health assistant for questions

### 🤖 AI Assistant
- Chat with CareAI about symptoms and medications
- Voice input support (simulated, ready for Web Speech API)
- Suggested questions for quick help

### 📅 Reminder Management
- Voice input for adding reminders
- Multiple date selection with calendar
- Notification tone customization
- Inventory tracking
- Doctor linkage

### ⚙️ Settings
- Profile management
- Notification preferences
- Emergency contacts
- Accessibility options (voice commands, text size)

## File Structure

```
firstaid-ai/
├── index.html          # Main HTML file with all screens
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Setup Instructions

### Local Development

1. **Clone or download the files**
   ```bash
   # If using git
   git clone <your-repo-url>
   cd firstaid-ai
   ```

2. **Open in browser**
   - Simply open `index.html` in any modern web browser
   - No build process required!

### Deploy to GitHub Pages

1. **Create a new repository on GitHub**

2. **Push the files**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "main" branch as source
   - Click Save
   - Your app will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Deploy to Netlify

1. **Using Netlify Drop**
   - Go to [netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop your project folder
   - Your site is live instantly!

2. **Using Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

3. **Using Git Integration**
   - Connect your GitHub repository to Netlify
   - Netlify will auto-deploy on every push

## Adding AI Functionality

The app is structured to easily integrate with AI APIs. Here's how to add real AI functionality:

### Option 1: Anthropic Claude API

```javascript
// In script.js, replace the getAIResponse function:

async function getAIResponse(message) {
    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'YOUR_API_KEY_HERE',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1024,
                messages: [{
                    role: 'user',
                    content: message
                }],
                system: 'You are a helpful healthcare AI assistant. Provide clear, accurate health information while emphasizing that users should consult healthcare professionals for medical advice.'
            })
        });
        
        const data = await response.json();
        return data.content[0].text;
    } catch (error) {
        console.error('AI Error:', error);
        return 'I apologize, but I\'m having trouble connecting right now. Please try again.';
    }
}
```

### Option 2: Web Speech API (for voice input)

```javascript
// Add to script.js:

function initRealVoiceInput() {
    if (!('webkitSpeechRecognition' in window)) {
        console.log('Speech recognition not supported');
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    const voiceBtn = document.getElementById('voiceBtn');
    
    voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.classList.add('active');
    });
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // Process the voice input
        handleVoiceCommand(transcript);
        voiceBtn.classList.remove('active');
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        voiceBtn.classList.remove('active');
    };
}
```

## Customization

### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-blue: #3B82F6;
    --primary-green: #10B981;
    --emergency-red: #EF4444;
    /* ... more colors */
}
```

### Emergency Guidance
Add or modify emergency procedures in `script.js`:

```javascript
const emergencyGuidance = {
    newEmergencyType: [
        {
            title: "Step Title",
            description: "Step description..."
        }
        // ... more steps
    ]
};
```

### Add New Features
The modular structure makes it easy to add new screens:

1. Add a new screen div in `index.html`
2. Style it in `styles.css`
3. Add navigation logic in `script.js`

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- High contrast design
- Large, readable fonts
- Touch-friendly buttons (minimum 44x44px)
- Keyboard navigation support
- Screen reader friendly
- Voice input options

## Security Considerations

⚠️ **Important**: Never commit API keys to your repository!

Use environment variables or a backend service:

```javascript
// Good practice:
const API_KEY = process.env.ANTHROPIC_API_KEY;

// Or use a backend endpoint:
const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message })
});
```

## Performance Optimization

The app is already optimized for performance:
- Minimal dependencies (no frameworks)
- Efficient CSS with CSS variables
- Lazy loading considerations
- Mobile-first responsive design

## Future Enhancements

Potential features to add:
- [ ] Push notifications for medication reminders
- [ ] Integration with health tracking APIs
- [ ] Offline mode with Service Worker
- [ ] Multi-language support
- [ ] Wearable device integration
- [ ] Emergency contact auto-notification
- [ ] Health data export (PDF reports)
- [ ] Medication interaction checker

## Testing

Recommended testing checklist:
- [ ] Test all navigation flows
- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Test voice features (if implemented)
- [ ] Test form submissions
- [ ] Test emergency guidance for each category
- [ ] Test calendar date selection
- [ ] Test chat functionality

## Support

For issues or questions:
1. Check the browser console for errors
2. Ensure all files are in the same directory
3. Verify API keys are correctly configured (if using AI features)

## License

This project is provided as-is for educational and personal use.

## Credits

- Design inspired by modern healthcare applications
- Icons: Unicode emoji (universally supported)
- Fonts: Inter font family (Google Fonts)

## Deployment Checklist

Before deploying to production:
- [ ] Remove all console.log statements
- [ ] Add proper error handling
- [ ] Test on real devices
- [ ] Set up analytics (optional)
- [ ] Configure proper security headers
- [ ] Test with real users
- [ ] Ensure HIPAA compliance if handling real health data
- [ ] Add proper disclaimers

---

**Disclaimer**: This application is for educational purposes. Always seek professional medical advice for health concerns. In case of emergency, call 911 or your local emergency services immediately.
