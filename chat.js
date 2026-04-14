// Decision Chat Engine Module
const DecisionChat = {
    currentFlow: null,
    currentStep: 0,
    userAnswers: {},
    isProcessing: false,

    // Initialize chat for a specific flow
    init(flowType) {
        this.currentFlow = flowType;
        this.currentStep = 0;
        this.userAnswers = {};
        this.isProcessing = false;

        // Update UI
        const chatTitle = document.getElementById('chatTitle');
        const flowData = KNOWLEDGE_BASE[flowType];
        chatTitle.textContent = flowData.title;

        // Clear previous messages
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';

        // Show welcome message
        this.addBotMessage(`Great! Let's figure this out together. I'll ask you a few questions to understand your situation better.`);

        // Start asking questions
        setTimeout(() => this.askNextQuestion(), 800);
    },

    // Ask next question in the flow
    askNextQuestion() {
        const flowData = KNOWLEDGE_BASE[this.currentFlow];

        // Handle special flows without questions
        if (this.currentFlow === 'stress') {
            this.showStressSupport();
            return;
        }

        // Check if there are questions in this flow
        if (!flowData.flow || this.currentStep >= flowData.flow.length) {
            this.generateResult();
            return;
        }

        const question = flowData.flow[this.currentStep];
        this.addBotMessage(question.question);

        // Show options
        setTimeout(() => {
            this.showOptions(question.options, question.id);
        }, 500);
    },

    // Add bot message to chat
    addBotMessage(text, hasTyping = true) {
        const chatMessages = document.getElementById('chatMessages');

        // Show typing indicator
        if (hasTyping) {
            const typing = document.createElement('div');
            typing.className = 'message bot typing-message';
            typing.innerHTML = `
                <div class="message-content">
                    <div class="typing-indicator">
                        <span class="typing-dot"></span>
                        <span class="typing-dot"></span>
                        <span class="typing-dot"></span>
                    </div>
                </div>
            `;
            chatMessages.appendChild(typing);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                typing.remove();
                this.addActualBotMessage(text);
            }, 1000);
        } else {
            this.addActualBotMessage(text);
        }
    },

    addActualBotMessage(text) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    },

    // Add user message to chat
    addUserMessage(text) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    },

    // Show option buttons
    showOptions(options, questionId) {
        const chatOptions = document.getElementById('chatOptions');
        chatOptions.innerHTML = '';

        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option.label;
            button.onclick = () => this.handleOptionClick(option.value, option.label, questionId);
            chatOptions.appendChild(button);
        });
    },

    // Handle option click
    handleOptionClick(value, label, questionId) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        // Store answer
        this.userAnswers[questionId] = value;

        // Add user message
        this.addUserMessage(label);

        // Clear options
        const chatOptions = document.getElementById('chatOptions');
        chatOptions.innerHTML = '';

        // Move to next question
        this.currentStep++;
        setTimeout(() => {
            this.isProcessing = false;
            this.askNextQuestion();
        }, 800);
    },

    // Generate result based on answers
    generateResult() {
        const flowData = KNOWLEDGE_BASE[this.currentFlow];
        const resultKey = getResultKey(this.userAnswers, this.currentFlow);

        this.addBotMessage(`Perfect! Based on your answers, here's what I recommend:`);

        setTimeout(() => {
            if (this.currentFlow === 'career') {
                this.showCareerResult(flowData.results[resultKey]);
            } else if (this.currentFlow === 'study') {
                this.showStudyResult(flowData.plans[resultKey]);
            } else if (this.currentFlow === 'focus') {
                this.showFocusResult(flowData.solutions[resultKey]);
            } else if (this.currentFlow === 'money') {
                this.showMoneyResult(flowData.opportunities[resultKey]);
            } else if (this.currentFlow === 'coding') {
                this.showCodingResult(flowData.paths[resultKey]);
            }
        }, 1000);
    },

    // Show career result
    showCareerResult(result) {
        let message = `<strong>💼 Suggested Careers:</strong><br>`;
        result.careers.forEach(career => {
            message += `• ${career}<br>`;
        });
        message += `<br><strong>💰 Expected Salary Range:</strong> ${result.salary}<br><br>`;
        message += `<strong>🗺️ Your Roadmap:</strong>`;

        this.addBotMessage(message, false);

        setTimeout(() => {
            const roadmapHTML = result.roadmap.map(step => 
                `<div class="roadmap-step">${step}</div>`
            ).join('');

            const chatMessages = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-roadmap">${roadmapHTML}</div>
                </div>
            `;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                let resourcesMsg = `<strong>📚 Learning Resources:</strong><br>`;
                result.resources.forEach(resource => {
                    resourcesMsg += `• ${resource}<br>`;
                });
                this.addBotMessage(resourcesMsg, false);
            }, 800);
        }, 800);
    },

    // Show study result
    showStudyResult(plan) {
        let message = `<strong>📅 Your Study Schedule:</strong><br><br>`;
        plan.schedule.forEach(item => {
            message += `${item}<br><br>`;
        });

        this.addBotMessage(message, false);

        setTimeout(() => {
            let tipsMsg = `<strong>💡 Study Tips:</strong><br>`;
            plan.tips.forEach(tip => {
                tipsMsg += `• ${tip}<br>`;
            });
            this.addBotMessage(tipsMsg, false);

            setTimeout(() => {
                let resourcesMsg = `<strong>📚 Recommended Resources:</strong><br>`;
                plan.resources.forEach(resource => {
                    resourcesMsg += `• ${resource}<br>`;
                });
                this.addBotMessage(resourcesMsg, false);
            }, 800);
        }, 800);
    },

    // Show focus result
    showFocusResult(solution) {
        let message = `<strong>⏰ Your Focus Routine:</strong><br><br>`;
        solution.routine.forEach(item => {
            message += `${item}<br><br>`;
        });

        this.addBotMessage(message, false);

        setTimeout(() => {
            let toolsMsg = `<strong>🛠️ Helpful Tools:</strong><br>`;
            solution.tools.forEach(tool => {
                toolsMsg += `• ${tool}<br>`;
            });
            this.addBotMessage(toolsMsg, false);

            setTimeout(() => {
                let habitsMsg = `<strong>🎯 Build These Habits:</strong><br>`;
                solution.habits.forEach(habit => {
                    habitsMsg += `• ${habit}<br>`;
                });
                this.addBotMessage(habitsMsg, false);
            }, 800);
        }, 800);
    },

    // Show money result
    showMoneyResult(opportunity) {
        let message = `<strong>💰 Ways to Earn Money:</strong><br><br>`;
        opportunity.ideas.forEach(idea => {
            message += `• ${idea}<br><br>`;
        });

        this.addBotMessage(message, false);

        setTimeout(() => {
            let roadmapMsg = `<strong>🗺️ Your Action Plan:</strong><br>`;
            opportunity.roadmap.forEach(step => {
                roadmapMsg += `<br>${step}`;
            });
            this.addBotMessage(roadmapMsg, false);

            setTimeout(() => {
                let platformsMsg = `<strong>🌐 Platforms to Use:</strong><br>`;
                opportunity.platforms.forEach(platform => {
                    platformsMsg += `• ${platform}<br>`;
                });
                this.addBotMessage(platformsMsg, false);
            }, 800);
        }, 800);
    },

    // Show coding result
    showCodingResult(path) {
        let message = `<strong>💻 Your Learning Path:</strong><br>`;
        message += `<strong>Language:</strong> ${path.language}<br>`;
        message += `<strong>First Project:</strong> ${path.firstProject}<br><br>`;
        message += `<strong>📅 Roadmap:</strong>`;

        this.addBotMessage(message, false);

        setTimeout(() => {
            const roadmapHTML = path.roadmap.map(step => 
                `<div class="roadmap-step">${step}</div>`
            ).join('');

            const chatMessages = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-roadmap">${roadmapHTML}</div>
                </div>
            `;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                let resourcesMsg = `<strong>📚 Best Resources:</strong><br>`;
                path.resources.forEach(resource => {
                    resourcesMsg += `• ${resource}<br>`;
                });
                this.addBotMessage(resourcesMsg, false);

                setTimeout(() => {
                    let tipsMsg = `<strong>💡 Pro Tips:</strong><br>`;
                    path.tips.forEach(tip => {
                        tipsMsg += `• ${tip}<br>`;
                    });
                    this.addBotMessage(tipsMsg, false);
                }, 800);
            }, 800);
        }, 800);
    },

    // Show stress support (special case)
    showStressSupport() {
        const support = KNOWLEDGE_BASE.stress.support;

        this.addBotMessage(`I'm here to help. Let's start with something you can do right now:`);

        setTimeout(() => {
            let immediateMsg = `<strong>✨ Do This Right Now:</strong><br>`;
            support.immediate.forEach(action => {
                immediateMsg += `• ${action}<br>`;
            });
            this.addBotMessage(immediateMsg, false);

            setTimeout(() => {
                let shortTermMsg = `<strong>🌱 For Today/This Week:</strong><br>`;
                support.shortTerm.forEach(action => {
                    shortTermMsg += `• ${action}<br>`;
                });
                this.addBotMessage(shortTermMsg, false);

                setTimeout(() => {
                    let longTermMsg = `<strong>🌳 Build Long-term Resilience:</strong><br>`;
                    support.longTerm.forEach(action => {
                        longTermMsg += `• ${action}<br>`;
                    });
                    this.addBotMessage(longTermMsg, false);

                    setTimeout(() => {
                        let resourcesMsg = `<strong>🆘 Get Help:</strong><br>`;
                        support.resources.forEach(resource => {
                            resourcesMsg += `• ${resource}<br>`;
                        });
                        this.addBotMessage(resourcesMsg, false);

                        setTimeout(() => {
                            let remindersMsg = `<strong>💙 Remember:</strong><br>`;
                            support.reminders.forEach(reminder => {
                                remindersMsg += `• ${reminder}<br>`;
                            });
                            this.addBotMessage(remindersMsg, false);
                        }, 800);
                    }, 800);
                }, 800);
            }, 800);
        }, 1000);
    }
};
