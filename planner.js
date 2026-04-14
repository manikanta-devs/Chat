// Smart Planner Module
const Planner = {
    // Initialize planner
    init() {
        this.renderTasks();
        this.renderSchedule();
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        // Add task button
        const addTaskBtn = document.getElementById('addTaskBtn');
        addTaskBtn.addEventListener('click', () => this.openTaskModal());

        // Save task button
        const saveTaskBtn = document.getElementById('saveTaskBtn');
        saveTaskBtn.addEventListener('click', () => this.saveTask());

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
            });
        });

        // Close modal on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
    },

    // Open task modal
    openTaskModal() {
        const modal = document.getElementById('taskModal');
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskTime').value = '';
        document.getElementById('taskPriority').value = 'medium';
        modal.classList.add('active');
    },

    // Save task
    saveTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const time = document.getElementById('taskTime').value;
        const priority = document.getElementById('taskPriority').value;

        if (!title) {
            alert('Please enter a task title');
            return;
        }

        const task = {
            title,
            time,
            priority,
            completed: false
        };

        Storage.addTask(task);
        this.renderTasks();
        
        // Close modal
        document.getElementById('taskModal').classList.remove('active');

        // Add achievement if first task
        const tasks = Storage.getTasks();
        if (tasks.length === 1) {
            Storage.addAchievement({
                icon: '✅',
                title: 'Task Master',
                description: 'Created your first task'
            });
        }
    },

    // Render tasks
    renderTasks() {
        const tasksList = document.getElementById('tasksList');
        const tasks = Storage.getTasks();

        if (tasks.length === 0) {
            tasksList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No tasks yet. Add one to get started!</p>';
            return;
        }

        tasksList.innerHTML = tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                     onclick="Planner.toggleTask('${task.id}')">
                </div>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    ${task.time ? `<div class="task-time">⏰ ${task.time}</div>` : ''}
                </div>
                <div class="task-priority ${task.priority}">${task.priority}</div>
                <button class="task-delete" onclick="Planner.deleteTask('${task.id}')">&times;</button>
            </div>
        `).join('');

        // Update stats
        this.updateStats();
    },

    // Toggle task completion
    toggleTask(taskId) {
        const task = Storage.getTasks().find(t => t.id === taskId);
        if (task) {
            const newCompleted = !task.completed;
            Storage.updateTask(taskId, { completed: newCompleted });
            this.renderTasks();

            // Update progress
            if (newCompleted) {
                const progress = Storage.getProgress();
                progress.tasksCompleted += 1;
                Storage.updateProgress(progress);
                Storage.updateProductivityScore();

                // Add achievement for milestones
                if (progress.tasksCompleted === 5) {
                    Storage.addAchievement({
                        icon: '🎯',
                        title: 'Getting Things Done',
                        description: 'Completed 5 tasks'
                    });
                } else if (progress.tasksCompleted === 25) {
                    Storage.addAchievement({
                        icon: '⭐',
                        title: 'Productivity Star',
                        description: 'Completed 25 tasks'
                    });
                }
            }
        }
    },

    // Delete task
    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            Storage.deleteTask(taskId);
            this.renderTasks();
        }
    },

    // Render schedule (suggested time blocks)
    renderSchedule() {
        const scheduleList = document.getElementById('scheduleList');
        const tasks = Storage.getTasks();
        const scheduledTasks = tasks.filter(t => t.time && !t.completed);

        if (scheduledTasks.length === 0) {
            scheduleList.innerHTML = `
                <p style="color: var(--text-muted); text-align: center; padding: 2rem;">
                    Add time to your tasks to see them here
                </p>
            `;
            return;
        }

        // Sort by time
        scheduledTasks.sort((a, b) => a.time.localeCompare(b.time));

        scheduleList.innerHTML = scheduledTasks.map(task => `
            <div class="schedule-item">
                <div class="task-time" style="font-weight: 600; color: var(--primary);">
                    ${task.time}
                </div>
                <div class="task-title">${task.title}</div>
            </div>
        `).join('');
    },

    // Update stats on home screen
    updateStats() {
        const tasks = Storage.getTasks();
        const completedToday = tasks.filter(t => t.completed).length;
        document.getElementById('todayTasksCompleted').textContent = completedToday;
    }
};
