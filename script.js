// Modal Functions
function showLogin() {
    document.getElementById('authModal').style.display = 'block';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

function showSignup() {
    document.getElementById('authModal').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    
    // Enable degree field for doctor
    const degreeField = document.querySelector('#signupForm input[placeholder*="Degree"]');
    const userType = document.querySelector('#signupForm select');
    userType.onchange = function() {
        if (this.value === 'Sign up as Doctor') {
            degreeField.disabled = false;
        } else {
            degreeField.disabled = true;
        }
    };
}

function showAbout() {
    alert('medAI - Your AI Medical Assistant\n\nFeatures:\n• AI Chatbot\n• Doctor Search\n• Reviews\n• Professional Medical Advice');
}

function closeModal() {
    document.getElementById('authModal').style.display = 'none';
}

// Chat Functions - REPLACE openChat() function
function openChat() {
    window.open('chat.html', 'medAIChat', 'width=800,height=600,resizable=yes,scrollbars=yes');
}

// Chat Window Close (chat.html ke liye)
function closeChatWindow() {
    window.close();
}

// AI Chat Logic (chat.html me kaam karega)
function sendMessage() {
    const input = document.getElementById('messageInput');
    const messages = document.getElementById('chatMessages');
    const messageText = input.value.trim();
    
    if (!messageText) return;
    
    // User message add karo
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.innerHTML = `
        <div class="message-content">
            ${messageText}
        </div>
    `;
    messages.appendChild(userMsg);
    
    // Input clear
    input.value = '';
    
    // Scroll bottom
    messages.scrollTop = messages.scrollHeight;
    
    // AI Response (3 seconds delay)
    setTimeout(() => {
        const responses = {
            'headache': '😵 **Headache**: Take paracetamol 500mg. Rest in dark room. Drink water. If persists >2 days, consult doctor.',
            'fever': '🌡️ **Fever**: Take paracetamol. Drink lots of fluids. Rest. If >101°F or >3 days, see doctor immediately.',
            'cough': '🤧 **Cough**: Honey + warm water. Steam inhalation. Avoid cold drinks. If blood or >2 weeks, consult doctor.',
            'stomach pain': '🤰 **Stomach Pain**: Avoid spicy food. Drink warm water. ORS if diarrhea. Consult if severe.',
            'cold': '🤒 **Cold**: Steam, warm fluids, rest. Use saline drops. Usually 3-7 days.',
            'default': '✅ Thanks for sharing! I recommend consulting a doctor for proper diagnosis. Stay healthy! 💙'
        };
        
        let response = responses['default'];
        const lowerMsg = messageText.toLowerCase();
        
        for (let key in responses) {
            if (lowerMsg.includes(key)) {
                response = responses[key];
                break;
            }
        }
        
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot-message';
        botMsg.innerHTML = `
            <div class="message-content">
                <i class="fas fa-robot"></i>
                <span>${response}</span>
            </div>
        `;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
    }, 1500);
}

// Enter key se send
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('messageInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Doctor Search
function searchDoctors() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    loadDoctors();
}

const doctors = [
    {
        name: "Dr. Rahul Sharma",
        specialty: "Cardiologist",
        location: "Max Hospital, Delhi - 15km",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
    },
    {
        name: "Dr. Priya Patel",
        specialty: "Neurologist",
        location: "Apollo Hospital, Mumbai - 8km", 
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
    },
    {
        name: "Dr. Amit Kumar",
        specialty: "Orthopedic Surgeon",
        location: "Fortis Hospital, Bangalore - 12km",
        rating: 4.7,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
        name: "Dr. Neha Gupta",
        specialty: "Dermatologist",
        location: "Medanta, Gurgaon - 5km",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
];

function loadDoctors() {
    const container = document.getElementById('doctorsList');
    container.innerHTML = '';
    
    doctors.forEach(doctor => {
        const card = document.createElement('div');
        card.className = 'doctor-card';
        card.innerHTML = `
            <img src="${doctor.img}" alt="${doctor.name}" class="doctor-img">
            <div class="doctor-name">${doctor.name}</div>
            <div class="doctor-specialty">${doctor.specialty}</div>
            <div class="doctor-location">${doctor.location}</div>
            <div class="rating">
                ${'★'.repeat(Math.floor(doctor.rating))} 
                <span style="color: #ccc;">★</span>
                (${doctor.rating})
            </div>
            <button class="btn-primary" onclick="bookAppointment('${doctor.name}')">Book Now</button>
        `;
        container.appendChild(card);
    });
}

// Reviews Data
const reviews = [
    {
        reviewer: "Anjali S.",
        doctor: "Dr. Rahul Sharma",
        rating: 5,
        text: "Excellent cardiologist! Very thorough and caring. Explained everything clearly.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
    },
    {
        reviewer: "Rajesh K.",
        doctor: "Dr. Priya Patel",
        rating: 4,
        text: "Good neurologist but wait time was long. Treatment was effective though.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
    },
    {
        reviewer: "Priya M.",
        doctor: "Dr. Amit Kumar",
        rating: 5,
        text: "Best orthopedic surgeon! Fixed my knee pain completely. Highly recommended.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    }
];

function showReviews() {
    window.location.href = 'review.html';
}

function loadReviews() {
    const container = document.getElementById('reviewsList');
    container.innerHTML = '';
    
    reviews.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="reviewer-info">
                <img src="${review.avatar}" alt="${review.reviewer}" class="reviewer-avatar">
                <div>
                    <div class="reviewer-name">${review.reviewer}</div>
                    <div style="color: #667eea; font-size: 0.9rem;">${review.doctor}</div>
                </div>
                <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
            </div>
            <p class="review-text">${review.text}</p>
        `;
        container.appendChild(card);
    });
}

// Utility Functions
function bookAppointment(doctorName) {
    alert(`Booking appointment with ${doctorName}\n\n✅ Slot confirmed!\n📅 Tomorrow 10:00 AM`);
}

// Initialize pages
if (document.getElementById('doctorsList')) {
    loadDoctors();
}

if (document.getElementById('reviewsList')) {
    loadReviews();
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    if (event.target == modal) {
        closeModal();
    }
}
