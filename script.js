// script.js
class SourDateApp {
    constructor() {
        this.currentUser = null;
        this.profiles = this.generateProfiles();
        this.chats = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderProfiles();
        this.updateActiveNav();
        this.loadTheme();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href');
                this.scrollToSection(target);
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            this.saveTheme();
        });

        // Search and filter
        document.getElementById('searchInput').addEventListener('input', () => this.filterProfiles());
        document.getElementById('filterHandicap').addEventListener('change', () => this.filterProfiles());

        // Chat
        document.getElementById('sendBtn').addEventListener('click', () => this.sendMessage());
        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    generateProfiles() {
        return [
            { id: 1, pseudo: 'Alex_LSF', age: 28, ville: 'Paris', handicap: 'lsf', photo: '👨', likes: 42, messages: 12 },
            { id: 2, pseudo: 'MarieSourde', age: 25, ville: 'Lyon', handicap: 'sourd-profonde', photo: '👩', likes: 67, messages: 23 },
            { id: 3, pseudo: 'Thomas_MH', age: 32, ville: 'Marseille', handicap: 'sourd-partiel', photo: '👨', likes: 29, messages: 8 },
            { id: 4, pseudo: 'LéaSignes', age: 27, ville: 'Bordeaux', handicap: 'lsf', photo: '👩', likes: 55, messages: 19 },
            { id: 5, pseudo: 'JulienSourd', age: 30, ville: 'Toulouse', handicap: 'sourd-profonde', photo: '👨', likes: 38, messages: 15 },
            { id: 6, pseudo 'Emma_Malent', age: 26, ville: 'Nantes', handicap: 'sourd-partiel', photo: '👩', likes: 72, messages: 31 }
        ];
    }

    renderProfiles() {
        const container = document.getElementById('profilesGrid');
        container.innerHTML = this.profiles.map(profile => `
            <div class="profile-card" onclick="app.likeProfile(${profile.id})">
                <div class="profile-avatar">${profile.photo}</div>
                <div class="profile-info">
                    <h3>${profile.pseudo}</h3>
                    <span class="profile-handicap">${this.getHandicapLabel(profile.handicap)}</span>
                    <p>${profile.age} ans - ${profile.ville}</p>
                </div>
                <div class="profile-stats">
                    <div class="stat">
                        <div class="stat-number">${profile.likes}</div>
                        <div>J'aime</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">${profile.messages}</div>
                        <div>Messages</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterProfiles() {
        const search = document.getElementById('searchInput').value.toLowerCase();
        const filter = document.getElementById('filterHandicap').value;

        const filtered = this.profiles.filter(profile => {
            const matchesSearch = profile.pseudo.toLowerCase().includes(search) || 
                                profile.ville.toLowerCase().includes(search);
            const matchesFilter = !filter || profile.handicap === filter;
            return matchesSearch && matchesFilter;
        });

        const container = document.getElementById('profilesGrid');
        container.innerHTML = filtered.map(profile => `
            <div class="profile-card" onclick="app.likeProfile(${profile.id})">
                <!-- même structure que renderProfiles -->
                <div class="profile-avatar">${profile.photo}</div>
                <div class="profile-info">
                    <h3>${profile.pseudo}</h3>
                    <span class="profile-handicap">${this.getHandicapLabel(profile.handicap)}</span>
                    <p>${profile.age} ans - ${profile.ville}</p>
                </div>
                <div class="profile-stats">
                    <div class="stat">
                        <div class="stat-number">${profile.likes}</div>
                        <div>J'aime</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">${profile.messages}</div>
                        <div>Messages</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getHandicapLabel(handicap) {
        const labels = {
            'sourd-profonde': '🧏 Sourdité profonde',
            'sourd-partiel': '👂 Malentendant',
            'lsf': '✋️ LSF'
        };
        return labels[handicap] || handicap;
    }

    likeProfile(id) {
        alert(`💕 Vous aimez ${this.profiles.find(p => p.id === id).pseudo} !`);
        // Ici vous pourriez ouvrir un chat ou envoyer une notification
    }

    scrollToSection(sectionId) {
        document.querySelector(sectionId).scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    // Auth modals
    static showLogin() {
        document.getElementById('authModal').style.display = 'block';
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
    }

    static showRegister() {
        document.getElementById('authModal').style.display = 'block';
        document.getElementById('registerForm').classList.remove('hidden');
        document.getElementById('loginForm').classList.add('hidden');
    }

    static closeModal() {
        document.getElementById('authModal').style.display = 'none';
    }

    static switchToRegister() {
        document.getElementById('registerForm').classList.remove('hidden');
        document.getElementById('loginForm').classList.add('hidden');
    }

    static switchToLogin() {
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
    }

    static login(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        alert(`✅ Bienvenue ${email.split('@')[0]} !`);
        SourDateApp.closeModal();
    }

    static register(e) {
        e.preventDefault();
        const pseudo = document.getElementById('regPseudo').value;
        alert(`🎉 Compte créé pour ${pseudo} !`);
        SourDateApp.closeModal();
    }

    sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        if (message) {
            const messages = document.getElementById('chatMessages');
            messages.innerHTML += `
                <div class="message sent">
                    <span>${message}</span>
                    <small>Maintenant</small>
                </div>
            `;
            messages.scrollTop = messages.scrollHeight;
            input.value = '';
        }
    }

    saveTheme() {
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    }

    loadTheme() {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.querySelector('.theme-btn i').className = 'fas fa-sun';
        }
    }

    updateActiveNav() {
        const sections = ['#accueil', '#profils', '#chat'];
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === entry.target.id);
                    });
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(document.querySelector(section));
        });
    }
}

// Initialisation
const app = new SourDateApp();

// Modals event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Close modal on outside click
    window.onclick = (event) => {
        const modal = document.getElementById('authModal');
        if (event.target === modal) {
            SourDateApp.closeModal();
        }
    }
});