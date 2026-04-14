// Pomodoro Focus Timer Module
const FocusTimer = {
    timeRemaining: 25 * 60, // seconds
    totalTime: 25 * 60,
    isRunning: false,
    interval: null,
    mode: 'focus', // 'focus' or 'break'

    // Initialize timer
    init() {
        this.setupEventListeners();
        this.updateDisplay();
        this.updateStats();
    },

    // Setup event listeners
    setupEventListeners() {
        // Mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                this.setMode(mode);
            });
        });

        // Control buttons
        document.getElementById('timerStart').addEventListener('click', () => this.start());
        document.getElementById('timerPause').addEventListener('click', () => this.pause());
        document.getElementById('timerReset').addEventListener('click', () => this.reset());
    },

    // Set timer mode
    setMode(mode) {
        if (this.isRunning) {
            alert('Please pause the timer before changing mode');
            return;
        }

        this.mode = mode;
        
        // Update active button
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === mode) {
                btn.classList.add('active');
            }
        });

        // Set time based on mode
        if (mode === 'focus') {
            this.timeRemaining = 25 * 60;
            this.totalTime = 25 * 60;
        } else {
            this.timeRemaining = 5 * 60;
            this.totalTime = 5 * 60;
        }

        this.updateDisplay();
    },

    // Start timer
    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        
        // Update button visibility
        document.getElementById('timerStart').classList.add('hidden');
        document.getElementById('timerPause').classList.remove('hidden');

        // Start interval
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);

        // Request notification permission if not granted
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    },

    // Pause timer
    pause() {
        if (!this.isRunning) return;

        this.isRunning = false;
        clearInterval(this.interval);

        // Update button visibility
        document.getElementById('timerStart').classList.remove('hidden');
        document.getElementById('timerPause').classList.add('hidden');
    },

    // Reset timer
    reset() {
        this.pause();
        this.timeRemaining = this.totalTime;
        this.updateDisplay();
    },

    // Tick (called every second)
    tick() {
        this.timeRemaining--;

        if (this.timeRemaining <= 0) {
            this.complete();
            return;
        }

        this.updateDisplay();
    },

    // Timer completed
    complete() {
        this.pause();
        this.timeRemaining = 0;
        this.updateDisplay();

        // Play sound (if supported)
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFApGn+DyvmwhBjiS1+3MeSwGJHfH8d2RQAoUXrTp66hVFA==');
            audio.play().catch(() => {});
        } catch (e) {}

        // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('DecisionOS Timer', {
                body: this.mode === 'focus' ? 'Focus session complete! Time for a break.' : 'Break complete! Ready to focus?',
                icon: '👉'
            });
        }

        // Update stats if focus session
        if (this.mode === 'focus') {
            Storage.addTimerSession(25);
            this.updateStats();
            
            // Add achievement
            const stats = Storage.getTimerStats();
            if (stats.sessionsToday === 1) {
                Storage.addAchievement({
                    icon: '⏱️',
                    title: 'Focused Mind',
                    description: 'Completed your first Pomodoro session'
                });
            } else if (stats.sessionsToday === 10) {
                Storage.addAchievement({
                    icon: '🔥',
                    title: 'Focus Warrior',
                    description: 'Completed 10 focus sessions'
                });
            }
        }

        // Auto-switch to break mode or vice versa
        if (this.mode === 'focus') {
            setTimeout(() => {
                alert('Great work! Take a 5-minute break.');
                this.setMode('break');
            }, 1000);
        } else {
            setTimeout(() => {
                alert('Break is over. Ready for another focus session?');
                this.setMode('focus');
            }, 1000);
        }
    },

    // Update display
    updateDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;

        document.getElementById('timerMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('timerSeconds').textContent = String(seconds).padStart(2, '0');

        // Update progress circle
        const progress = ((this.totalTime - this.timeRemaining) / this.totalTime) * 565;
        const progressCircle = document.getElementById('timerProgress');
        progressCircle.style.strokeDashoffset = progress;
    },

    // Update stats display
    updateStats() {
        const stats = Storage.getTimerStats();
        
        document.getElementById('sessionsToday').textContent = stats.sessionsToday;
        
        const hours = Math.floor(stats.totalFocusMinutes / 60);
        const minutes = stats.totalFocusMinutes % 60;
        document.getElementById('totalFocus').textContent = `${hours}h ${minutes}m`;

        // Update home screen stat
        document.getElementById('todayFocusTime').textContent = `${hours}h`;
    }
};
