// Global state
let selectedDates = [];
let currentScreen = 'homeScreen';

// Navigation function
function navigateTo(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Emergency guidance data
const emergencyGuidance = {
    accident: [
        {
            title: "Ensure Safety",
            description: "Move yourself and the victim away from any immediate danger. Do not move the victim if they have a suspected spinal injury unless there is immediate danger."
        },
        {
            title: "Call Emergency Services",
            description: "Call 911 immediately. Provide clear location details and describe the situation."
        },
        {
            title: "Check for Breathing",
            description: "Look, listen, and feel for breathing. If not breathing, begin CPR if trained."
        },
        {
            title: "Control Bleeding",
            description: "Apply direct pressure to any bleeding wounds using a clean cloth."
        },
        {
            title: "Keep Victim Calm",
            description: "Reassure the victim and keep them still until help arrives."
        }
    ],
    heart: [
        {
            title: "Call 911 Immediately",
            description: "Call for emergency help right away. Do not drive yourself to the hospital."
        },
        {
            title: "Chew Aspirin",
            description: "If not allergic, chew one regular-strength aspirin slowly (unless directed otherwise by emergency services)."
        },
        {
            title: "Sit or Lie Down",
            description: "Rest in a comfortable position. Loosen any tight clothing."
        },
        {
            title: "Stay Calm",
            description: "Try to remain calm and breathe slowly. Anxiety can worsen symptoms."
        },
        {
            title: "Prepare for CPR",
            description: "If person becomes unconscious and stops breathing, begin CPR if trained."
        }
    ],
    bleeding: [
        {
            title: "Apply Direct Pressure",
            description: "Use a clean cloth or bandage and apply firm, continuous pressure for at least 10 minutes."
        },
        {
            title: "Elevate the Wound",
            description: "If possible, raise the injured area above the heart level to slow bleeding."
        },
        {
            title: "Add More Dressings",
            description: "If blood soaks through, add more cloth on top. Do not remove the original dressing."
        },
        {
            title: "Apply Pressure Points",
            description: "If bleeding continues, apply pressure to the artery supplying blood to the area."
        },
        {
            title: "Get Medical Help",
            description: "Call 911 for severe bleeding. Continue applying pressure until help arrives."
        }
    ],
    stroke: [
        {
            title: "Call 911 Immediately",
            description: "Time is critical. Call emergency services right away."
        },
        {
            title: "Note the Time",
            description: "Remember when symptoms first appeared. This information is crucial for treatment."
        },
        {
            title: "Keep Person Comfortable",
            description: "Have them lie down with head and shoulders slightly raised. Do not give food or water."
        },
        {
            title: "Monitor Breathing",
            description: "Check that the airway is clear and the person is breathing."
        },
        {
            title: "Stay with Them",
            description: "Remain calm and reassuring. Monitor for changes until help arrives."
        }
    ],
    choking: [
        {
            title: "Ask 'Are You Choking?'",
            description: "Determine if the person can cough or speak. If they can't, they need immediate help."
        },
        {
            title: "Perform Heimlich Maneuver",
            description: "Stand behind the person, make a fist above their navel, and give quick upward thrusts."
        },
        {
            title: "Continue Until Object Dislodges",
            description: "Repeat abdominal thrusts until the object is expelled or the person can breathe."
        },
        {
            title: "Call 911 if Unsuccessful",
            description: "If the object doesn't come out after several attempts, call emergency services."
        },
        {
            title: "Begin CPR if Unconscious",
            description: "If person becomes unconscious, lower them to the ground and start CPR."
        }
    ],
    burn: [
        {
            title: "Stop the Burning",
            description: "Remove the person from the heat source. Remove jewelry and tight clothing before swelling begins."
        },
        {
            title: "Cool the Burn",
            description: "Run cool (not cold) water over the burn for 10-20 minutes. Do not use ice."
        },
        {
            title: "Cover with Clean Cloth",
            description: "Use a sterile, non-stick bandage or clean cloth. Do not apply ointments to severe burns."
        },
        {
            title: "Do Not Break Blisters",
            description: "Leave blisters intact. Breaking them increases infection risk."
        },
        {
            title: "Seek Medical Help",
            description: "Call 911 for severe burns, burns on face/hands/feet/genitals, or burns larger than 3 inches."
        }
    ]
};

// Handle emergency selection
function handleEmergency(type) {
    const guidance = emergencyGuidance[type];
    if (!guidance) return;
    
    const stepsContainer = document.getElementById('stepsContainer');
    const guidanceSteps = document.getElementById('guidanceSteps');
    
    stepsContainer.innerHTML = '';
    
    guidance.forEach((step, index) => {
        const stepCard = document.createElement('div');
        stepCard.className = 'step-card';
        stepCard.innerHTML = `
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
                <h4>${step.title}</h4>
                <p>${step.description}</p>
            </div>
        `;
        stepsContainer.appendChild(stepCard);
    });
    
    guidanceSteps.classList.remove('hidden');
    
    // Scroll to guidance
    guidanceSteps.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Voice input simulation
function initVoiceInput() {
    const voiceBtn = document.getElementById('voiceBtn');
    const reminderVoiceBtn = document.getElementById('reminderVoiceBtn');
    const voiceChatBtn = document.getElementById('voiceChatBtn');
    
    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
                alert('Voice input simulated. In production, this would use Web Speech API.');
            }, 2000);
        });
    }
    
    if (reminderVoiceBtn) {
        reminderVoiceBtn.addEventListener('click', function() {
            alert('Voice input simulated. Say something like "Remind me to take Aspirin at 8 AM daily"');
        });
    }
    
    if (voiceChatBtn) {
        voiceChatBtn.addEventListener('click', function() {
            alert('Voice input simulated. In production, this would use Web Speech API.');
        });
    }
}

// Calendar functionality
function openCalendar() {
    const modal = document.getElementById('calendarModal');
    const calendar = document.getElementById('calendar');
    
    modal.classList.add('active');
    
    // Generate calendar
    calendar.innerHTML = '';
    
    // Day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day';
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = '700';
        dayHeader.style.color = 'var(--text-secondary)';
        dayHeader.style.cursor = 'default';
        calendar.appendChild(dayHeader);
    });
    
    // Generate dates for current month
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendar.appendChild(emptyCell);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement('div');
        dateCell.className = 'calendar-day';
        dateCell.textContent = day;
        
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Check if date is in the past
        const cellDate = new Date(year, month, day);
        if (cellDate < today) {
            dateCell.classList.add('disabled');
        } else {
            // Check if already selected
            if (selectedDates.includes(dateString)) {
                dateCell.classList.add('selected');
            }
            
            dateCell.addEventListener('click', function() {
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    selectedDates = selectedDates.filter(d => d !== dateString);
                } else {
                    this.classList.add('selected');
                    selectedDates.push(dateString);
                }
            });
        }
        
        calendar.appendChild(dateCell);
    }
}

function closeCalendar() {
    document.getElementById('calendarModal').classList.remove('active');
}

function confirmDates() {
    const selectedDatesContainer = document.getElementById('selectedDates');
    selectedDatesContainer.innerHTML = '';
    
    selectedDates.forEach(date => {
        const chip = document.createElement('span');
        chip.className = 'date-chip';
        chip.textContent = new Date(date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
        selectedDatesContainer.appendChild(chip);
    });
    
    closeCalendar();
}

// Chat functionality
function initChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                sendMessage(message);
                chatInput.value = '';
            }
        });
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendBtn.click();
            }
        });
    }
}

function sendMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-bubble">
            <p>${escapeHtml(message)}</p>
        </div>
    `;
    chatMessages.appendChild(userMessage);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = getAIResponse(message);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-bubble">
                <p>${aiResponse}</p>
            </div>
        `;
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('side effect') || lowerMessage.includes('lisinopril')) {
        return "Common side effects of Lisinopril include dizziness, headache, and a dry cough. More serious side effects can include high potassium levels and kidney problems. If you experience swelling of the face, lips, or tongue, seek immediate medical attention. Always take this medication as prescribed and report any unusual symptoms to your doctor.";
    }
    
    if (lowerMessage.includes('headache')) {
        return "For a headache, you can try: resting in a quiet, dark room; drinking water (dehydration can cause headaches); applying a cold compress to your forehead; taking over-the-counter pain relievers like acetaminophen or ibuprofen (if appropriate for you). If headaches are severe, frequent, or accompanied by other symptoms like vision changes, seek medical attention.";
    }
    
    if (lowerMessage.includes('911') || lowerMessage.includes('emergency')) {
        return "Call 911 immediately if someone experiences: chest pain or pressure, difficulty breathing, sudden severe headache, loss of consciousness, severe bleeding, signs of stroke (face drooping, arm weakness, speech difficulty), severe allergic reaction, or any life-threatening emergency. When in doubt, it's always better to call for help.";
    }
    
    if (lowerMessage.includes('vitamin d')) {
        return "Vitamin D3 is important for bone health, immune function, and overall well-being. The 2000 IU dosage you're taking is a common supplemental dose. It's best absorbed when taken with food containing some fat. Benefits may take several weeks to months to notice. Your doctor can check your vitamin D levels with a blood test if needed.";
    }
    
    return "I understand you have a health question. For specific medical advice, please consult with your healthcare provider. I can provide general health information, remind you about medications, or help you understand common symptoms. Is there something specific I can help you with?";
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Form handling
function initForms() {
    const reminderForm = document.getElementById('reminderForm');
    
    if (reminderForm) {
        reminderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reminderForm);
            
            // Show success message
            alert('Reminder saved successfully!');
            
            // Navigate back to dashboard
            navigateTo('dashboardScreen');
        });
    }
    
    // Reminder type tabs
    const typeTabs = document.querySelectorAll('.type-tab');
    typeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            typeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Medicine actions
function initMedicineActions() {
    // Taken buttons
    document.querySelectorAll('.taken-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.reminder-card');
            card.style.opacity = '0.5';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
            alert('Medication marked as taken!');
        });
    });
    
    // Snooze buttons
    document.querySelectorAll('.snooze-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Reminder snoozed for 15 minutes');
        });
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initVoiceInput();
    initChat();
    initForms();
    initMedicineActions();
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('calendarModal');
        if (e.target === modal) {
            closeCalendar();
        }
    });
    
    // Handle browser back button
    window.addEventListener('popstate', function() {
        navigateTo('homeScreen');
    });
    
    console.log('FirstAid AI initialized successfully!');
    console.log('Note: Voice features and AI chat are simulated. Add your API key for full functionality.');
});

// Export functions for use in HTML
window.navigateTo = navigateTo;
window.handleEmergency = handleEmergency;
window.openCalendar = openCalendar;
window.closeCalendar = closeCalendar;
window.confirmDates = confirmDates;
window.sendMessage = sendMessage;
