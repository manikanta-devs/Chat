// DecisionOS - Main Application Script
// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

const App = {
    currentView: 'homeView',

    // Initialize application
    init() {
        console.log('🚀 Initializing DecisionOS...');

        // Check for daily reset
        Storage.checkDailyReset();

        // Update streak
        Storage.updateStreak();

        // Load theme
        this.loadTheme();

        // Hide loading screen and show main content
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('mainContent').classList.remove('hidden');
        }, 2500);

        // Initialize modules
        setTimeout(() => {
            Planner.init();
            FocusTimer.init();
            Notes.init();
            Progress.init();
            Goals.init();
            Resume.init();
            this.updateHomeStats();
        }, 3000);

        // Setup event listeners
        this.setupEventListeners();

        console.log('✅ DecisionOS initialized successfully!');
    },

    // Setup all event listeners
    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const viewId = btn.dataset.view;
                this.switchView(viewId);
            });
        });

        // Decision buttons
        document.querySelectorAll('.decision-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const flow = btn.dataset.flow;
                this.startDecisionFlow(flow);
            });
        });

        // Back to home button
        document.getElementById('backToHome').addEventListener('click', () => {
            this.switchView('homeView');
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Update streak display
        this.updateStreakDisplay();
    },

    // Switch between views
    switchView(viewId) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show selected view
        document.getElementById(viewId).classList.add('active');

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === viewId) {
                btn.classList.add('active');
            }
        });

        this.currentView = viewId;

        // Update specific views when shown
        if (viewId === 'progressView') {
            Progress.update();
        } else if (viewId === 'goalsView') {
            Goals.render();
        } else if (viewId === 'homeView') {
            this.updateHomeStats();
        }
    },

    // Start decision flow
    startDecisionFlow(flowType) {
        this.switchView('chatView');
        DecisionChat.init(flowType);
    },

    // Toggle theme
    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        Storage.setTheme(newTheme);

        // Update icon
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';

        // Re-render chart if on progress view
        if (this.currentView === 'progressView') {
            Progress.renderWeeklyChart();
        }
    },

    // Load theme
    loadTheme() {
        const theme = Storage.getTheme();
        document.documentElement.setAttribute('data-theme', theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    },

    // Update home screen stats
    updateHomeStats() {
        // Update streak
        this.updateStreakDisplay();

        // Update focus time
        const timerStats = Storage.getTimerStats();
        const hours = Math.floor(timerStats.totalFocusMinutes / 60);
        document.getElementById('todayFocusTime').textContent = `${hours}h`;

        // Update tasks completed
        const tasks = Storage.getTasks();
        const completedTasks = tasks.filter(t => t.completed).length;
        document.getElementById('todayTasksCompleted').textContent = completedTasks;

        // Update active goals
        const goals = Storage.getGoals();
        const activeGoals = goals.filter(g => g.progress < 100).length;
        document.getElementById('activeGoalsCount').textContent = activeGoals;

        // Update productivity score
        Storage.updateProductivityScore();
    },

    // Update streak display
    updateStreakDisplay() {
        const streak = Storage.getStreak();
        document.getElementById('streakCount').textContent = streak;
    }
};

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered');
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}

// Handle visibility change to update stats
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        Storage.checkDailyReset();
        Storage.updateStreak();
        App.updateHomeStats();
        
        if (App.currentView === 'progressView') {
            Progress.update();
        }
    }
});

// Prevent accidental page close if timer is running
window.addEventListener('beforeunload', (e) => {
    if (FocusTimer.isRunning) {
        e.preventDefault();
        e.returnValue = 'Timer is still running. Are you sure you want to leave?';
        return e.returnValue;
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus on adding task
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        App.switchView('plannerView');
        setTimeout(() => {
            document.getElementById('addTaskBtn').click();
        }, 100);
    }

    // Ctrl/Cmd + N to add note
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        App.switchView('notesView');
        setTimeout(() => {
            document.getElementById('addNoteBtn').click();
        }, 100);
    }

    // Ctrl/Cmd + T to start timer
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        App.switchView('timerView');
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Request notification permission on first interaction
document.addEventListener('click', () => {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}, { once: true });

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('✅ Back online');
});

window.addEventListener('offline', () => {
    console.log('⚠️ You are offline - app will continue to work');
});

// Check if running as PWA
function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
}

if (isPWA()) {
    console.log('📱 Running as PWA');
}

// Utility: Format time
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
}

// Utility: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
}

// Add these utilities to global scope
window.formatTime = formatTime;
window.formatDate = formatDate;
