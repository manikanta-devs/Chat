// Goal Tracker Module
const Goals = {
    // Initialize goals
    init() {
        this.render();
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        // Add goal button
        document.getElementById('addGoalBtn').addEventListener('click', () => this.openGoalModal());

        // Save goal button
        document.getElementById('saveGoalBtn').addEventListener('click', () => this.saveGoal());
    },

    // Open goal modal
    openGoalModal() {
        const modal = document.getElementById('goalModal');
        document.getElementById('goalTitle').value = '';
        document.getElementById('goalDescription').value = '';
        document.getElementById('goalDeadline').value = '';
        modal.classList.add('active');
    },

    // Save goal
    saveGoal() {
        const title = document.getElementById('goalTitle').value.trim();
        const description = document.getElementById('goalDescription').value.trim();
        const deadline = document.getElementById('goalDeadline').value;

        if (!title) {
            alert('Please enter a goal title');
            return;
        }

        const goal = {
            title,
            description,
            deadline,
            progress: 0
        };

        Storage.addGoal(goal);
        this.render();
        
        // Close modal
        document.getElementById('goalModal').classList.remove('active');

        // Update home stats
        this.updateHomeStats();

        // Add achievement if first goal
        const goals = Storage.getGoals();
        if (goals.length === 1) {
            Storage.addAchievement({
                icon: '🎯',
                title: 'Goal Setter',
                description: 'Set your first goal'
            });
        }
    },

    // Render goals
    render() {
        const goalsList = document.getElementById('goalsList');
        const goals = Storage.getGoals();

        if (goals.length === 0) {
            goalsList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No goals yet. Set your first goal!</p>';
            return;
        }

        goalsList.innerHTML = goals.map(goal => {
            const deadlineStr = goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'No deadline';
            const safeTitle = escapeHtml(goal.title);
            const safeDescription = escapeHtml(goal.description);

            return `
                <div class="goal-card">
                    <div class="goal-header">
                        <div class="goal-title">${safeTitle}</div>
                        <button class="goal-delete" onclick="Goals.deleteGoal('${goal.id}')">&times;</button>
                    </div>
                    ${goal.description ? `<div class="goal-description">${safeDescription}</div>` : ''}
                    <div class="goal-progress">
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${goal.progress}%"></div>
                        </div>
                        <div class="progress-text">
                            <span class="progress-percent">${goal.progress}%</span>
                            <span class="progress-deadline">${deadlineStr}</span>
                        </div>
                    </div>
                    <div class="goal-actions">
                        <button class="goal-btn" onclick="Goals.updateProgress('${goal.id}', 25)">+25%</button>
                        <button class="goal-btn" onclick="Goals.updateProgress('${goal.id}', 50)">+50%</button>
                        <button class="goal-btn" onclick="Goals.updateProgress('${goal.id}', 100)">Complete</button>
                    </div>
                </div>
            `;
        }).join('');

        this.updateHomeStats();
    },

    // Update goal progress
    updateProgress(goalId, amount) {
        const goal = Storage.getGoals().find(g => g.id === goalId);
        if (!goal) return;

        let newProgress = goal.progress + amount;
        if (newProgress > 100) newProgress = 100;

        Storage.updateGoal(goalId, { progress: newProgress });
        this.render();

        // Add achievement if goal completed
        if (newProgress === 100 && goal.progress < 100) {
            Storage.addAchievement({
                icon: '🏆',
                title: 'Goal Achieved',
                description: `Completed: ${goal.title}`
            });

            // Check if it's first completed goal
            const goals = Storage.getGoals();
            const completedGoals = goals.filter(g => g.progress === 100);
            if (completedGoals.length === 1) {
                setTimeout(() => {
                    Storage.addAchievement({
                        icon: '⭐',
                        title: 'First Victory',
                        description: 'Completed your first goal'
                    });
                }, 500);
            }
        }

        Storage.updateProductivityScore();
    },

    // Delete goal
    deleteGoal(goalId) {
        if (confirm('Are you sure you want to delete this goal?')) {
            Storage.deleteGoal(goalId);
            this.render();
        }
    },

    // Update home screen stats
    updateHomeStats() {
        const goals = Storage.getGoals();
        const activeGoals = goals.filter(g => g.progress < 100).length;
        document.getElementById('activeGoalsCount').textContent = activeGoals;
    }
};
