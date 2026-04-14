// Resume Builder Module
const Resume = {
    // Initialize resume builder
    init() {
        this.loadData();
        this.setupEventListeners();
        this.updatePreview();
    },

    // Setup event listeners
    setupEventListeners() {
        // Input fields
        const inputs = [
            'resumeName',
            'resumeEmail',
            'resumePhone',
            'resumeSummary',
            'resumeEducation',
            'resumeSkills',
            'resumeExperience'
        ];

        inputs.forEach(id => {
            const element = document.getElementById(id);
            element.addEventListener('input', () => {
                this.saveData();
                this.updatePreview();
            });
        });

        // Download button
        document.getElementById('downloadResume').addEventListener('click', () => this.download());
    },

    // Load data from storage
    loadData() {
        const data = Storage.getResume();
        
        document.getElementById('resumeName').value = data.name || '';
        document.getElementById('resumeEmail').value = data.email || '';
        document.getElementById('resumePhone').value = data.phone || '';
        document.getElementById('resumeSummary').value = data.summary || '';
        document.getElementById('resumeEducation').value = data.education || '';
        document.getElementById('resumeSkills').value = data.skills || '';
        document.getElementById('resumeExperience').value = data.experience || '';
    },

    // Save data to storage
    saveData() {
        const data = {
            name: document.getElementById('resumeName').value,
            email: document.getElementById('resumeEmail').value,
            phone: document.getElementById('resumePhone').value,
            summary: document.getElementById('resumeSummary').value,
            education: document.getElementById('resumeEducation').value,
            skills: document.getElementById('resumeSkills').value,
            experience: document.getElementById('resumeExperience').value
        };

        Storage.saveResume(data);
    },

    // Update preview
    updatePreview() {
        const data = Storage.getResume();

        // Update name and contact
        document.getElementById('previewName').textContent = 
            data.name || 'Your Name';
        
        let contact = [];
        if (data.email) contact.push(data.email);
        if (data.phone) contact.push(data.phone);
        document.getElementById('previewContact').textContent = 
            contact.join(' | ') || 'email@example.com | +1234567890';

        // Update summary
        document.getElementById('previewSummary').textContent = 
            data.summary || 'Your professional summary will appear here...';

        // Update education
        document.getElementById('previewEducation').textContent = 
            data.education || 'Your education details...';

        // Update skills (format as comma-separated if needed)
        const skills = data.skills ? 
            data.skills.split(',').map(s => s.trim()).join(', ') : 
            'Your skills...';
        document.getElementById('previewSkills').textContent = skills;

        // Update experience (preserve line breaks, escape HTML first)
        const experience = data.experience || 'Your experience...';
        document.getElementById('previewExperience').innerHTML =
            escapeHtml(experience).replace(/\n/g, '<br>');
    },

    // Download resume as PDF (simplified version)
    download() {
        // Create a printable version
        const resumeContent = document.getElementById('resumePreviewContent');
        const data = Storage.getResume();

        if (!data.name || !data.email) {
            alert('Please fill in at least your name and email before downloading');
            return;
        }

        // Create a new window for printing
        const printWindow = window.open('', '', 'width=800,height=600');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Resume - ${data.name}</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        font-family: 'Outfit', Arial, sans-serif;
                        padding: 2cm;
                        line-height: 1.6;
                        color: #333;
                    }
                    .resume-header {
                        text-align: center;
                        padding-bottom: 1cm;
                        border-bottom: 2px solid #FF6B4A;
                        margin-bottom: 1cm;
                    }
                    .resume-header h1 {
                        font-size: 2.5em;
                        margin-bottom: 0.3em;
                        color: #1A2B4A;
                    }
                    .resume-section {
                        margin-bottom: 1.5cm;
                    }
                    .resume-section h2 {
                        font-size: 1.5em;
                        color: #FF6B4A;
                        margin-bottom: 0.5em;
                        padding-bottom: 0.2em;
                        border-bottom: 1px solid #E8DCD0;
                    }
                    .resume-section p {
                        margin-bottom: 0.5em;
                    }
                    @media print {
                        body {
                            padding: 1cm;
                        }
                    }
                </style>
            </head>
            <body>
                ${resumeContent.innerHTML}
            </body>
            </html>
        `);

        printWindow.document.close();
        
        // Wait for content to load, then print
        setTimeout(() => {
            printWindow.print();
        }, 250);

        // Add achievement if first time
        const hasDownloaded = localStorage.getItem('decisionos_resume_downloaded');
        if (!hasDownloaded) {
            localStorage.setItem('decisionos_resume_downloaded', 'true');
            Storage.addAchievement({
                icon: '📄',
                title: 'Resume Ready',
                description: 'Downloaded your first resume'
            });
        }
    }
};
