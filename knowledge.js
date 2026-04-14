// DecisionOS Knowledge Base
// Contains all decision flows and career/study/money data

const KNOWLEDGE_BASE = {
    // Career Decision Flow
    career: {
        title: "Career Guidance",
        icon: "💼",
        flow: [
            {
                id: "interests",
                question: "What interests you the most?",
                options: [
                    { value: "technology", label: "Technology & Computers" },
                    { value: "creative", label: "Creative & Design" },
                    { value: "business", label: "Business & Management" },
                    { value: "science", label: "Science & Research" },
                    { value: "helping", label: "Helping People" },
                    { value: "unsure", label: "I'm not sure" }
                ]
            },
            {
                id: "skills",
                question: "Which skills do you have or want to develop?",
                options: [
                    { value: "coding", label: "Programming & Coding" },
                    { value: "design", label: "Design & Creativity" },
                    { value: "communication", label: "Communication & Writing" },
                    { value: "analytical", label: "Problem Solving & Analysis" },
                    { value: "leadership", label: "Leadership & Management" }
                ]
            },
            {
                id: "time",
                question: "How much time can you dedicate to learning?",
                options: [
                    { value: "fulltime", label: "Full-time (6+ hours/day)" },
                    { value: "parttime", label: "Part-time (3-5 hours/day)" },
                    { value: "minimal", label: "Minimal (1-2 hours/day)" }
                ]
            }
        ],
        results: {
            "technology-coding": {
                careers: ["Software Developer", "Web Developer", "Data Analyst", "AI/ML Engineer"],
                salary: "$60,000 - $120,000+",
                roadmap: [
                    "Month 1-2: Learn programming basics (Python/JavaScript)",
                    "Month 3-4: Build small projects (calculator, todo app)",
                    "Month 5-6: Learn frameworks (React, Node.js)",
                    "Month 7-9: Build portfolio projects",
                    "Month 10-12: Apply for internships/jobs, contribute to open source"
                ],
                resources: ["freeCodeCamp.org", "The Odin Project", "CS50 by Harvard", "Codecademy"]
            },
            "creative-design": {
                careers: ["UI/UX Designer", "Graphic Designer", "Product Designer", "Brand Designer"],
                salary: "$45,000 - $100,000+",
                roadmap: [
                    "Month 1-2: Learn design fundamentals (color, typography, layout)",
                    "Month 3-4: Master design tools (Figma, Adobe XD)",
                    "Month 5-6: Study UX principles and user research",
                    "Month 7-9: Build design portfolio with 3-5 projects",
                    "Month 10-12: Network, apply to jobs, freelance on side"
                ],
                resources: ["Figma tutorials", "Design Course on YouTube", "Refactoring UI", "Daily UI Challenge"]
            },
            "business-leadership": {
                careers: ["Business Analyst", "Project Manager", "Marketing Manager", "Entrepreneur"],
                salary: "$50,000 - $110,000+",
                roadmap: [
                    "Month 1-3: Learn business fundamentals (marketing, finance, operations)",
                    "Month 4-6: Develop leadership and communication skills",
                    "Month 7-9: Work on real projects or start small business",
                    "Month 10-12: Network, get certifications (PMP, Scrum), apply to roles"
                ],
                resources: ["Coursera Business Courses", "HubSpot Academy", "LinkedIn Learning", "Seth Godin's Blog"]
            },
            "science-analytical": {
                careers: ["Data Scientist", "Research Analyst", "Laboratory Technician", "Statistician"],
                salary: "$55,000 - $130,000+",
                roadmap: [
                    "Month 1-3: Strengthen math and statistics foundation",
                    "Month 4-6: Learn data analysis tools (Python, R, Excel)",
                    "Month 7-9: Work on data projects and case studies",
                    "Month 10-12: Build portfolio, get certifications, apply to positions"
                ],
                resources: ["Kaggle", "DataCamp", "Google Data Analytics Certificate", "StatQuest on YouTube"]
            },
            "default": {
                careers: ["Start by exploring different fields", "Take online courses", "Do internships"],
                salary: "Varies by field",
                roadmap: [
                    "Month 1: Take career assessment tests (16Personalities, StrengthsFinder)",
                    "Month 2: Research 5 different careers that interest you",
                    "Month 3: Talk to professionals in those fields (LinkedIn)",
                    "Month 4-6: Take introductory courses in top 2 choices",
                    "Month 7-12: Commit to one path and follow its specific roadmap"
                ],
                resources: ["O*NET Career Explorer", "MyPlan.com", "CareerOneStop", "LinkedIn Career Pages"]
            }
        }
    },

    // Study Decision Flow
    study: {
        title: "Study Strategy",
        icon: "📚",
        flow: [
            {
                id: "subject",
                question: "What subject do you need help with?",
                options: [
                    { value: "math", label: "Math & Science" },
                    { value: "languages", label: "Languages & Literature" },
                    { value: "programming", label: "Programming & Tech" },
                    { value: "general", label: "General/Multiple Subjects" }
                ]
            },
            {
                id: "timeAvailable",
                question: "How much time can you study per day?",
                options: [
                    { value: "1-2", label: "1-2 hours" },
                    { value: "3-4", label: "3-4 hours" },
                    { value: "5+", label: "5+ hours" }
                ]
            },
            {
                id: "difficulty",
                question: "What's your current level?",
                options: [
                    { value: "beginner", label: "Beginner - Just starting" },
                    { value: "intermediate", label: "Intermediate - Some knowledge" },
                    { value: "advanced", label: "Advanced - Deep knowledge" }
                ]
            }
        ],
        plans: {
            "math-1-2-beginner": {
                schedule: [
                    "7:00-7:30 AM: Review basics, watch Khan Academy",
                    "7:30-8:00 AM: Practice 10-15 problems",
                    "Evening: Review notes for 15 minutes"
                ],
                tips: [
                    "Focus on fundamentals first",
                    "Use visual aids and diagrams",
                    "Practice daily, even if just 15 minutes",
                    "Watch YouTube explanations for difficult concepts"
                ],
                resources: ["Khan Academy", "Brilliant.org", "PatrickJMT (YouTube)", "Paul's Online Math Notes"]
            },
            "programming-3-4-intermediate": {
                schedule: [
                    "Hour 1: Review previous concepts + learn new topic",
                    "Hour 2: Code along with tutorial",
                    "Hour 3: Build small project applying new concept",
                    "Hour 4: Debug and refine project"
                ],
                tips: [
                    "Build projects, don't just watch tutorials",
                    "Comment your code to understand it later",
                    "Use debugging tools extensively",
                    "Join coding communities (Reddit, Discord)"
                ],
                resources: ["freeCodeCamp", "The Odin Project", "LeetCode", "GitHub for project ideas"]
            },
            "general-5+-advanced": {
                schedule: [
                    "Hour 1-2: Deep focused study on hardest subject",
                    "Hour 3: Active recall practice (flashcards, quizzes)",
                    "Hour 4: Second subject study session",
                    "Hour 5: Review and consolidation + Spaced repetition"
                ],
                tips: [
                    "Use Pomodoro technique (25 min focus + 5 min break)",
                    "Teach concepts to others or yourself",
                    "Create mind maps for complex topics",
                    "Schedule regular review sessions"
                ],
                resources: ["Anki for spaced repetition", "Notion for organization", "Coursera/edX", "Study Together communities"]
            },
            "default": {
                schedule: [
                    "Session 1: Study new material (50 minutes)",
                    "Break: 10 minutes rest",
                    "Session 2: Practice problems (50 minutes)",
                    "Review: 15 minutes summary of what you learned"
                ],
                tips: [
                    "Remove distractions before starting",
                    "Have all materials ready before studying",
                    "Take notes by hand when possible",
                    "Test yourself regularly"
                ],
                resources: ["Quizlet", "Khan Academy", "YouTube Channels", "Study Discord Servers"]
            }
        }
    },

    // Focus/Productivity Flow
    focus: {
        title: "Focus Improvement",
        icon: "😴",
        flow: [
            {
                id: "distractions",
                question: "What distracts you the most?",
                options: [
                    { value: "phone", label: "Phone & Social Media" },
                    { value: "environment", label: "Noisy Environment" },
                    { value: "thoughts", label: "Wandering Thoughts" },
                    { value: "tired", label: "Feeling Tired/Sleepy" }
                ]
            },
            {
                id: "studyHours",
                question: "When do you usually study?",
                options: [
                    { value: "morning", label: "Morning (6 AM - 12 PM)" },
                    { value: "afternoon", label: "Afternoon (12 PM - 6 PM)" },
                    { value: "evening", label: "Evening (6 PM - 12 AM)" },
                    { value: "night", label: "Night (12 AM - 6 AM)" }
                ]
            }
        ],
        solutions: {
            "phone-morning": {
                routine: [
                    "6:00 AM: Wake up, no phone for first 30 minutes",
                    "6:30 AM: Cold shower + breakfast",
                    "7:00 AM: Deep focus session (phone in another room)",
                    "8:30 AM: Short break, check important messages only",
                    "9:00 AM: Second focus session"
                ],
                tools: ["Forest app (phone blocking)", "Freedom app", "Do Not Disturb mode", "Physical alarm clock"],
                habits: [
                    "Charge phone outside bedroom",
                    "Use website blockers during study time",
                    "Set specific times for social media (e.g., 12 PM, 6 PM)",
                    "Delete distracting apps during exam periods"
                ]
            },
            "environment-afternoon": {
                routine: [
                    "Find quiet location (library, empty classroom, home office)",
                    "Use noise-canceling headphones or earplugs",
                    "Play white noise or lo-fi music (no lyrics)",
                    "Put 'Do Not Disturb' sign on door",
                    "Inform family/roommates of your study schedule"
                ],
                tools: ["Noisli for ambient sounds", "Coffitivity", "Brain.fm", "Noise-canceling headphones"],
                habits: [
                    "Scout out 3 quiet study spots",
                    "Study at library during peak distraction times at home",
                    "Use visual cues (closed door, headphones) to signal focus time",
                    "Create dedicated study space at home"
                ]
            },
            "thoughts-evening": {
                routine: [
                    "Before studying: 5-minute meditation or breathing exercise",
                    "Write down all worries/tasks on paper (brain dump)",
                    "Use Pomodoro: 25 minutes complete focus + 5 minute break",
                    "During breaks: gentle movement, no phone",
                    "If mind wanders: acknowledge, write it down, return to task"
                ],
                tools: ["Headspace or Calm app", "Forest app", "Physical timer", "Notebook for brain dumps"],
                habits: [
                    "Practice mindfulness 5 minutes daily",
                    "Exercise regularly to reduce mental clutter",
                    "Get enough sleep (7-9 hours)",
                    "Journal before bed to clear mind"
                ]
            },
            "tired-night": {
                routine: [
                    "Consider switching to morning study (night studying = less efficient)",
                    "If night study necessary: take 20-minute power nap before",
                    "Use bright lighting during study",
                    "Stay hydrated, eat light snacks",
                    "Take standing breaks every 30 minutes"
                ],
                tools: ["Bright desk lamp", "Blue light glasses", "Healthy snacks", "Standing desk option"],
                habits: [
                    "Fix sleep schedule (same time every night)",
                    "Avoid caffeine after 2 PM",
                    "Exercise during day for better sleep",
                    "Gradually shift study time to morning/afternoon"
                ]
            },
            "default": {
                routine: [
                    "Pomodoro Technique: 25 min work + 5 min break (repeat 4x)",
                    "After 4 Pomodoros: take 15-30 minute longer break",
                    "Remove all distractions before starting",
                    "Set clear goal for each session",
                    "Track your focus sessions (builds momentum)"
                ],
                tools: ["Focus Timer app", "Website blockers", "Ambient music", "Progress tracker"],
                habits: [
                    "Start with small sessions (15 min) and build up",
                    "Same time/place creates study trigger",
                    "Reward yourself after completed sessions",
                    "Review and adjust strategy weekly"
                ]
            }
        }
    },

    // Money/Earning Flow
    money: {
        title: "Earning Money",
        icon: "💰",
        flow: [
            {
                id: "skills",
                question: "What skills do you have?",
                options: [
                    { value: "tech", label: "Tech Skills (coding, design, etc.)" },
                    { value: "creative", label: "Creative Skills (writing, art, video)" },
                    { value: "academic", label: "Academic/Tutoring Skills" },
                    { value: "none", label: "No specific skills yet" }
                ]
            },
            {
                id: "internet",
                question: "Do you have reliable internet access?",
                options: [
                    { value: "yes", label: "Yes, good internet" },
                    { value: "limited", label: "Limited/Slow internet" },
                    { value: "no", label: "No regular internet" }
                ]
            },
            {
                id: "timeCommit",
                question: "How much time can you commit?",
                options: [
                    { value: "parttime", label: "Part-time (10-20 hours/week)" },
                    { value: "fulltime", label: "Full-time (40+ hours/week)" },
                    { value: "flexible", label: "Flexible/Side hustle" }
                ]
            }
        ],
        opportunities: {
            "tech-yes-parttime": {
                ideas: [
                    "Freelance Web Development (Upwork, Fiverr) - $20-100+/hour",
                    "Build WordPress websites for local businesses - $500-2000/project",
                    "Freelance Graphic Design - $25-75/hour",
                    "Create and sell website templates - $20-100/template",
                    "Offer social media management - $300-1000/month per client"
                ],
                roadmap: [
                    "Week 1: Create portfolio with 2-3 sample projects",
                    "Week 2: Set up profiles on Upwork, Fiverr, Freelancer",
                    "Week 3: Apply to 10-15 beginner-friendly jobs",
                    "Week 4: Deliver first project, get review",
                    "Month 2-3: Build reputation with more projects",
                    "Month 4+: Increase rates, target better clients"
                ],
                platforms: ["Upwork", "Fiverr", "Freelancer.com", "Toptal", "We Work Remotely"]
            },
            "creative-yes-flexible": {
                ideas: [
                    "Content Writing ($0.03-0.30 per word) - blogs, articles",
                    "YouTube Channel (ad revenue + sponsorships)",
                    "Sell digital art on Etsy, Redbubble - passive income",
                    "Video Editing for YouTubers - $50-500/video",
                    "Social Media Content Creation - $200-800/month"
                ],
                roadmap: [
                    "Week 1-2: Choose niche, create 5 samples",
                    "Week 3-4: Build online portfolio/channel",
                    "Month 2: Start applying/posting content consistently",
                    "Month 3-6: Grow audience/clients, refine skills",
                    "Month 7+: Monetize, diversify income streams"
                ],
                platforms: ["Medium", "Etsy", "Redbubble", "YouTube", "Patreon", "Substack"]
            },
            "academic-limited-parttime": {
                ideas: [
                    "Online Tutoring (Zoom/Google Meet) - $15-50/hour",
                    "Create and sell study guides/notes - $5-20 per guide",
                    "Teach English online to international students - $15-25/hour",
                    "Help with homework/assignments (Chegg, Course Hero)",
                    "Local tutoring (in-person) - $20-60/hour"
                ],
                roadmap: [
                    "Week 1: Choose subjects you're strongest in",
                    "Week 2: Create teaching materials and lesson plans",
                    "Week 3: Register on tutoring platforms or advertise locally",
                    "Week 4: Get first 2-3 students",
                    "Month 2+: Build reputation, get referrals, increase rates"
                ],
                platforms: ["Tutor.com", "Chegg Tutors", "Wyzant", "VIPKid", "Local Facebook groups"]
            },
            "none-no-flexible": {
                ideas: [
                    "Learn a skill first (see Coding flow)",
                    "Local gigs: babysitting, dog walking, lawn care - $10-25/hour",
                    "Sell handmade items at local markets",
                    "Offer services: car washing, cleaning, organization",
                    "Part-time job at local business (gain experience + income)"
                ],
                roadmap: [
                    "Month 1: Choose skill to learn OR start local service",
                    "Month 2-3: Practice skill OR build local reputation",
                    "Month 4-6: Start charging for skill OR expand services",
                    "Month 7+: Scale up, learn more valuable skills"
                ],
                platforms: ["Craigslist (careful!)", "Local Facebook Marketplace", "Nextdoor", "TaskRabbit", "Local job boards"]
            },
            "default": {
                ideas: [
                    "Start with what you know",
                    "Learn in-demand skill online (free)",
                    "Offer services to friends/family first (portfolio)",
                    "Gradually transition to paid work",
                    "Always deliver quality to get good reviews"
                ],
                roadmap: [
                    "Step 1: Assess your current skills honestly",
                    "Step 2: Research market demand for those skills",
                    "Step 3: Learn/improve skill for 30 days",
                    "Step 4: Create portfolio/samples",
                    "Step 5: Start with low rates to build reputation",
                    "Step 6: Gradually increase rates as you improve"
                ],
                platforms: ["Start local, then online", "Use social media to market", "Word of mouth is powerful"]
            }
        }
    },

    // Stress/Mental Health Flow
    stress: {
        title: "Mental Wellness",
        icon: "🧠",
        support: {
            immediate: [
                "Take 5 deep breaths right now (4 seconds in, 6 seconds out)",
                "Step outside for 5 minutes if possible",
                "Drink a glass of water",
                "Do 10 jumping jacks or gentle stretching"
            ],
            shortTerm: [
                "Break tasks into tiny steps (just one thing at a time)",
                "Talk to someone you trust about how you're feeling",
                "Write down what's stressing you (externalizing helps)",
                "Take a 20-minute walk outside",
                "Listen to calming music or nature sounds"
            ],
            longTerm: [
                "Establish regular sleep schedule (7-9 hours)",
                "Exercise 20-30 minutes daily (proven stress reducer)",
                "Practice mindfulness/meditation 5-10 min daily",
                "Reduce caffeine and sugar intake",
                "Connect with friends regularly (even brief check-ins)",
                "Set boundaries with work/study (scheduled breaks)",
                "Consider talking to school counselor or therapist"
            ],
            resources: [
                "Headspace app (free trial) for meditation",
                "7 Cups - free emotional support",
                "Crisis Text Line: Text HOME to 741741",
                "National Suicide Prevention Lifeline: 988",
                "YouTube: The Honest Guys (guided meditation)"
            ],
            reminders: [
                "It's okay to not be okay sometimes",
                "Asking for help is strength, not weakness",
                "You don't have to have everything figured out",
                "Progress over perfection",
                "Your mental health matters more than any grade or achievement"
            ]
        }
    },

    // Coding/Programming Flow
    coding: {
        title: "Learn to Code",
        icon: "🧑‍💻",
        flow: [
            {
                id: "goal",
                question: "What do you want to build?",
                options: [
                    { value: "websites", label: "Websites & Web Apps" },
                    { value: "apps", label: "Mobile Apps" },
                    { value: "games", label: "Games" },
                    { value: "ai", label: "AI & Data Science" },
                    { value: "general", label: "Just want to learn coding" }
                ]
            },
            {
                id: "experience",
                question: "What's your experience level?",
                options: [
                    { value: "zero", label: "Complete Beginner (never coded)" },
                    { value: "basics", label: "Know basics (some HTML/CSS/JS)" },
                    { value: "intermediate", label: "Can build simple projects" }
                ]
            }
        ],
        paths: {
            "websites-zero": {
                language: "HTML, CSS, JavaScript",
                roadmap: [
                    "Week 1-2: HTML basics (structure, tags, forms)",
                    "Week 3-4: CSS basics (styling, layout, flexbox)",
                    "Week 5-8: JavaScript fundamentals (variables, functions, DOM)",
                    "Week 9-12: Build 3-5 projects (portfolio site, todo app, calculator)",
                    "Month 4-6: Learn React or Vue framework",
                    "Month 7+: Build full projects, contribute to open source"
                ],
                resources: [
                    "freeCodeCamp.org (free, comprehensive)",
                    "The Odin Project (project-based)",
                    "MDN Web Docs (reference)",
                    "Web Dev Simplified (YouTube)",
                    "Traversy Media (YouTube)"
                ],
                firstProject: "Personal portfolio website",
                tips: [
                    "Code along with tutorials, don't just watch",
                    "Build projects as soon as you learn basics",
                    "Use DevTools to inspect websites you like",
                    "Join communities: r/learnprogramming, Discord servers",
                    "Don't get stuck in tutorial hell - build things!"
                ]
            },
            "apps-basics": {
                language: "React Native or Flutter",
                roadmap: [
                    "Month 1: Strengthen JavaScript fundamentals",
                    "Month 2: Learn React.js thoroughly",
                    "Month 3: Start React Native (uses React knowledge)",
                    "Month 4-5: Build 2-3 simple mobile apps",
                    "Month 6+: Learn deployment, advanced features"
                ],
                resources: [
                    "React Native docs",
                    "Expo (easier way to build RN apps)",
                    "Academind (YouTube channel)",
                    "React Native School",
                    "William Candillon (advanced tutorials)"
                ],
                firstProject: "Weather app or Todo app",
                tips: [
                    "Start with web dev (React) before mobile",
                    "Use Expo for easier development",
                    "Test on real device, not just simulator",
                    "Focus on one platform (iOS or Android) first",
                    "Learn backend basics for full-stack apps"
                ]
            },
            "games-zero": {
                language: "Python (Pygame) or JavaScript (Phaser)",
                roadmap: [
                    "Month 1-2: Learn programming basics (Python or JS)",
                    "Month 3-4: Learn game development library (Pygame/Phaser)",
                    "Month 5-6: Build simple games (Pong, Snake, Platformer)",
                    "Month 7-12: More complex games, learn Unity/Godot for 3D"
                ],
                resources: [
                    "Python Crash Course (book, has game section)",
                    "Clear Code (YouTube - Pygame)",
                    "Brackeys (YouTube - Unity)",
                    "Godot Docs (free, beginner-friendly engine)",
                    "itch.io (publish and play indie games)"
                ],
                firstProject: "Snake game or Pong clone",
                tips: [
                    "Start 2D before 3D",
                    "Keep scope small (finish small games first)",
                    "Game dev is coding + art + design (lots to learn)",
                    "Join game jams to practice and network",
                    "Study existing games' mechanics"
                ]
            },
            "ai-intermediate": {
                language: "Python",
                roadmap: [
                    "Month 1-2: Python fundamentals + NumPy, Pandas",
                    "Month 3-4: Statistics and linear algebra basics",
                    "Month 5-6: Machine learning fundamentals (scikit-learn)",
                    "Month 7-9: Deep learning (TensorFlow, PyTorch)",
                    "Month 10-12: Specialize (NLP, Computer Vision, etc.)",
                    "Year 2: Advanced topics, research, real-world projects"
                ],
                resources: [
                    "Andrew Ng's ML Course (Coursera)",
                    "Fast.ai (practical deep learning)",
                    "Kaggle (datasets + competitions)",
                    "3Blue1Brown (math intuition)",
                    "Sentdex (YouTube - Python ML)"
                ],
                firstProject: "Predict house prices or classify images (MNIST)",
                tips: [
                    "Math is important but don't let it stop you from starting",
                    "Work on Kaggle competitions to learn",
                    "Read research papers gradually",
                    "Strong Python foundation is crucial",
                    "AI requires patience - models take time to train"
                ]
            },
            "general-zero": {
                language: "Python (most beginner-friendly)",
                roadmap: [
                    "Week 1-2: Variables, data types, basic operations",
                    "Week 3-4: Control flow (if/else, loops)",
                    "Week 5-6: Functions and modules",
                    "Week 7-8: Data structures (lists, dictionaries)",
                    "Month 3-4: Object-oriented programming basics",
                    "Month 5-6: Build projects, explore interests (web, data, etc.)"
                ],
                resources: [
                    "Python.org tutorials (official)",
                    "Automate the Boring Stuff (free book)",
                    "Corey Schafer (YouTube - clear explanations)",
                    "Codecademy Python course",
                    "Python Crash Course (book)"
                ],
                firstProject: "Number guessing game or simple calculator",
                tips: [
                    "Practice every single day, even 20 minutes",
                    "Type out code yourself, don't copy-paste",
                    "Struggle is part of learning - embrace errors",
                    "Google is your friend (and Stack Overflow)",
                    "After basics, pick a specific goal (web, data, games)"
                ]
            }
        }
    }
};

// Utility function to match user answers to knowledge base keys
function getResultKey(answers, flow) {
    const flowData = KNOWLEDGE_BASE[flow];

    // Build values in question order (matching how knowledge base keys are constructed)
    let values;
    if (flowData.flow) {
        values = flowData.flow.map(q => answers[q.id]).filter(v => v);
    } else {
        values = Object.values(answers).filter(v => v);
    }

    // Try exact match first
    const exactKey = values.join('-');
    if (flowData.results && flowData.results[exactKey]) {
        return exactKey;
    }
    if (flowData.plans && flowData.plans[exactKey]) {
        return exactKey;
    }
    if (flowData.solutions && flowData.solutions[exactKey]) {
        return exactKey;
    }
    if (flowData.opportunities && flowData.opportunities[exactKey]) {
        return exactKey;
    }
    if (flowData.paths && flowData.paths[exactKey]) {
        return exactKey;
    }

    // Try partial matches: check if all parts of a KB key are present in the answer values
    const allKeys = Object.keys(
        flowData.results ||
        flowData.plans ||
        flowData.solutions ||
        flowData.opportunities ||
        flowData.paths ||
        {}
    );

    for (const key of allKeys) {
        if (key === 'default') continue;
        const keyParts = key.split('-');
        if (keyParts.every(part => values.includes(part))) {
            return key;
        }
    }

    // Return default
    return 'default';
}
