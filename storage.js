// LocalStorage Management Module
const Storage = {
    // Keys
    KEYS: {
        TASKS: 'decisionos_tasks',
        NOTES: 'decisionos_notes',
        GOALS: 'decisionos_goals',
        PROGRESS: 'decisionos_progress',
        STREAK: 'decisionos_streak',
        TIMER_STATS: 'decisionos_timer_stats',
        RESUME: 'decisionos_resume',
        THEME: 'decisionos_theme',
        LAST_VISIT: 'decisionos_last_visit'
    },

    // Generic get/set/remove
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error getting from storage:', e);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error setting to storage:', e);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from storage:', e);
            return false;
        }
    },

    // Tasks
    getTasks() {
        return this.get(this.KEYS.TASKS) || [];
    },

    saveTasks(tasks) {
        return this.set(this.KEYS.TASKS, tasks);
    },

    addTask(task) {
        const tasks = this.getTasks();
        task.id = Date.now().toString();
        task.createdAt = new Date().toISOString();
        task.completed = false;
        tasks.push(task);
        this.saveTasks(tasks);
        return task;
    },

    updateTask(taskId, updates) {
        const tasks = this.getTasks();
        const index = tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updates };
            this.saveTasks(tasks);
            return tasks[index];
        }
        return null;
    },

    deleteTask(taskId) {
        const tasks = this.getTasks();
        const filtered = tasks.filter(t => t.id !== taskId);
        this.saveTasks(filtered);
        return true;
    },

    // Notes
    getNotes() {
        return this.get(this.KEYS.NOTES) || [];
    },

    saveNotes(notes) {
        return this.set(this.KEYS.NOTES, notes);
    },

    addNote(note) {
        const notes = this.getNotes();
        note.id = Date.now().toString();
        note.createdAt = new Date().toISOString();
        note.updatedAt = new Date().toISOString();
        notes.unshift(note);
        this.saveNotes(notes);
        return note;
    },

    updateNote(noteId, updates) {
        const notes = this.getNotes();
        const index = notes.findIndex(n => n.id === noteId);
        if (index !== -1) {
            notes[index] = { ...notes[index], ...updates, updatedAt: new Date().toISOString() };
            this.saveNotes(notes);
            return notes[index];
        }
        return null;
    },

    deleteNote(noteId) {
        const notes = this.getNotes();
        const filtered = notes.filter(n => n.id !== noteId);
        this.saveNotes(filtered);
        return true;
    },

    // Goals
    getGoals() {
        return this.get(this.KEYS.GOALS) || [];
    },

    saveGoals(goals) {
        return this.set(this.KEYS.GOALS, goals);
    },

    addGoal(goal) {
        const goals = this.getGoals();
        goal.id = Date.now().toString();
        goal.createdAt = new Date().toISOString();
        goal.progress = goal.progress || 0;
        goals.push(goal);
        this.saveGoals(goals);
        return goal;
    },

    updateGoal(goalId, updates) {
        const goals = this.getGoals();
        const index = goals.findIndex(g => g.id === goalId);
        if (index !== -1) {
            goals[index] = { ...goals[index], ...updates };
            this.saveGoals(goals);
            return goals[index];
        }
        return null;
    },

    deleteGoal(goalId) {
        const goals = this.getGoals();
        const filtered = goals.filter(g => g.id !== goalId);
        this.saveGoals(filtered);
        return true;
    },

    // Progress tracking
    getProgress() {
        const defaultProgress = {
            dailyFocusTime: 0,
            weeklyFocusTime: Array(7).fill(0),
            tasksCompleted: 0,
            productivityScore: 0,
            achievements: [],
            lastUpdated: new Date().toISOString()
        };
        return this.get(this.KEYS.PROGRESS) || defaultProgress;
    },

    updateProgress(updates) {
        const progress = this.getProgress();
        const updated = { ...progress, ...updates, lastUpdated: new Date().toISOString() };
        this.set(this.KEYS.PROGRESS, updated);
        return updated;
    },

    addFocusTime(minutes) {
        const progress = this.getProgress();
        progress.dailyFocusTime += minutes;
        
        // Update weekly data (today is last index)
        const dayIndex = 6;
        progress.weeklyFocusTime[dayIndex] += minutes;
        
        this.updateProgress(progress);
        this.updateProductivityScore();
    },

    resetDailyProgress() {
        const progress = this.getProgress();
        
        // Shift weekly data
        progress.weeklyFocusTime.shift();
        progress.weeklyFocusTime.push(0);
        
        progress.dailyFocusTime = 0;
        progress.tasksCompleted = 0;
        
        this.updateProgress(progress);
    },

    updateProductivityScore() {
        const progress = this.getProgress();
        const tasks = this.getTasks();
        const goals = this.getGoals();
        
        // Calculate score based on multiple factors
        let score = 0;
        
        // Focus time (max 40 points)
        const focusScore = Math.min(progress.dailyFocusTime / 3, 40);
        score += focusScore;
        
        // Tasks completed (max 30 points)
        const completedTasks = tasks.filter(t => t.completed).length;
        const taskScore = Math.min(completedTasks * 5, 30);
        score += taskScore;
        
        // Active goals (max 20 points)
        const activeGoals = goals.length;
        const goalScore = Math.min(activeGoals * 5, 20);
        score += goalScore;
        
        // Streak bonus (max 10 points)
        const streak = this.getStreak();
        const streakScore = Math.min(streak, 10);
        score += streakScore;
        
        progress.productivityScore = Math.round(score);
        this.updateProgress(progress);
    },

    addAchievement(achievement) {
        const progress = this.getProgress();
        achievement.unlockedAt = new Date().toISOString();
        progress.achievements.unshift(achievement);
        
        // Keep only last 10 achievements
        if (progress.achievements.length > 10) {
            progress.achievements = progress.achievements.slice(0, 10);
        }
        
        this.updateProgress(progress);
    },

    // Streak management
    getStreak() {
        return this.get(this.KEYS.STREAK) || 0;
    },

    updateStreak() {
        const lastVisit = this.get(this.KEYS.LAST_VISIT);
        const today = new Date().toDateString();
        
        if (lastVisit) {
            const lastVisitDate = new Date(lastVisit).toDateString();
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            
            if (lastVisitDate === yesterday) {
                // Continue streak
                const currentStreak = this.getStreak();
                this.set(this.KEYS.STREAK, currentStreak + 1);
            } else if (lastVisitDate !== today) {
                // Reset streak
                this.set(this.KEYS.STREAK, 1);
            }
        } else {
            // First visit
            this.set(this.KEYS.STREAK, 1);
        }
        
        this.set(this.KEYS.LAST_VISIT, new Date().toISOString());
    },

    // Timer stats
    getTimerStats() {
        const defaultStats = {
            sessionsToday: 0,
            totalFocusMinutes: 0,
            lastSession: null
        };
        return this.get(this.KEYS.TIMER_STATS) || defaultStats;
    },

    updateTimerStats(updates) {
        const stats = this.getTimerStats();
        const updated = { ...stats, ...updates };
        this.set(this.KEYS.TIMER_STATS, updated);
        return updated;
    },

    addTimerSession(minutes) {
        const stats = this.getTimerStats();
        stats.sessionsToday += 1;
        stats.totalFocusMinutes += minutes;
        stats.lastSession = new Date().toISOString();
        this.updateTimerStats(stats);
        
        // Also update progress
        this.addFocusTime(minutes);
    },

    resetDailyTimer() {
        const stats = this.getTimerStats();
        stats.sessionsToday = 0;
        this.updateTimerStats(stats);
    },

    // Resume data
    getResume() {
        return this.get(this.KEYS.RESUME) || {
            name: '',
            email: '',
            phone: '',
            summary: '',
            education: '',
            skills: '',
            experience: ''
        };
    },

    saveResume(resumeData) {
        return this.set(this.KEYS.RESUME, resumeData);
    },

    // Theme
    getTheme() {
        return this.get(this.KEYS.THEME) || 'light';
    },

    setTheme(theme) {
        return this.set(this.KEYS.THEME, theme);
    },

    // Initialize/check if should reset daily data
    checkDailyReset() {
        const lastVisit = this.get(this.KEYS.LAST_VISIT);
        if (lastVisit) {
            const lastDate = new Date(lastVisit).toDateString();
            const today = new Date().toDateString();
            
            if (lastDate !== today) {
                this.resetDailyProgress();
                this.resetDailyTimer();
            }
        }
    },

    // Clear all data (for testing/reset)
    clearAll() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            Object.values(this.KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            location.reload();
        }
    }
};
