// Progress Dashboard Module
const Progress = {
    // Initialize progress dashboard
    init() {
        this.renderWeeklyChart();
        this.renderProductivityScore();
        this.renderAchievements();
    },

    // Render weekly focus time chart
    renderWeeklyChart() {
        const canvas = document.getElementById('weeklyChart');
        const ctx = canvas.getContext('2d');
        const progress = Storage.getProgress();

        // Set canvas size
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = 400;

        const data = progress.weeklyFocusTime;
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        // Calculate dimensions
        const padding = 40;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        const barWidth = chartWidth / data.length - 10;
        const maxValue = Math.max(...data, 120); // minimum 120 minutes scale

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw bars
        ctx.fillStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary');
        
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + index * (chartWidth / data.length) + 5;
            const y = padding + chartHeight - barHeight;

            // Draw bar with rounded top
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, [8, 8, 0, 0]);
            ctx.fill();

            // Draw value on top
            if (value > 0) {
                ctx.fillStyle = getComputedStyle(document.documentElement)
                    .getPropertyValue('--text-primary');
                ctx.font = '24px Outfit';
                ctx.textAlign = 'center';
                ctx.fillText(`${value}m`, x + barWidth / 2, y - 10);
                ctx.fillStyle = getComputedStyle(document.documentElement)
                    .getPropertyValue('--primary');
            }

            // Draw label
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--text-muted');
            ctx.font = '24px Outfit';
            ctx.textAlign = 'center';
            ctx.fillText(labels[index], x + barWidth / 2, canvas.height - 10);
        });

        // Polyfill for roundRect if not available
        if (!ctx.roundRect) {
            ctx.roundRect = function(x, y, width, height, radii) {
                this.beginPath();
                this.moveTo(x + radii[0], y);
                this.lineTo(x + width - radii[1], y);
                this.arcTo(x + width, y, x + width, y + radii[1], radii[1]);
                this.lineTo(x + width, y + height);
                this.lineTo(x, y + height);
                this.lineTo(x, y + radii[0]);
                this.arcTo(x, y, x + radii[0], y, radii[0]);
                this.closePath();
            };
        }
    },

    // Render productivity score
    renderProductivityScore() {
        const progress = Storage.getProgress();
        const score = progress.productivityScore;

        document.getElementById('productivityScore').textContent = score;

        // Update circle progress
        const circumference = 283;
        const offset = circumference - (score / 100) * circumference;
        const progressCircle = document.getElementById('scoreProgress');
        progressCircle.style.strokeDashoffset = offset;
    },

    // Render achievements
    renderAchievements() {
        const achievementsList = document.getElementById('achievementsList');
        const progress = Storage.getProgress();
        const achievements = progress.achievements;

        if (achievements.length === 0) {
            achievementsList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 1rem;">Complete tasks and goals to unlock achievements!</p>';
            return;
        }

        achievementsList.innerHTML = achievements.map(achievement => {
            const date = new Date(achievement.unlockedAt);
            const dateStr = date.toLocaleDateString();

            return `
                <div class="achievement-item">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-text">
                        <div class="achievement-title">${achievement.title}</div>
                        <div class="achievement-desc">${achievement.description} • ${dateStr}</div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Update all displays
    update() {
        this.renderWeeklyChart();
        this.renderProductivityScore();
        this.renderAchievements();
    }
};
