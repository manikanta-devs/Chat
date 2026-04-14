// Notes System Module
const Notes = {
    currentNoteId: null,

    // Initialize notes
    init() {
        this.render();
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        // Add note button
        document.getElementById('addNoteBtn').addEventListener('click', () => this.openNoteModal());

        // Save note button
        document.getElementById('saveNoteBtn').addEventListener('click', () => this.saveNote());
    },

    // Open note modal
    openNoteModal(noteId = null) {
        const modal = document.getElementById('noteModal');
        const modalTitle = document.getElementById('noteModalTitle');

        if (noteId) {
            // Edit existing note
            const note = Storage.getNotes().find(n => n.id === noteId);
            if (note) {
                this.currentNoteId = noteId;
                modalTitle.textContent = 'Edit Note';
                document.getElementById('noteTitle').value = note.title;
                document.getElementById('noteContent').value = note.content;
            }
        } else {
            // New note
            this.currentNoteId = null;
            modalTitle.textContent = 'New Note';
            document.getElementById('noteTitle').value = '';
            document.getElementById('noteContent').value = '';
        }

        modal.classList.add('active');
    },

    // Save note
    saveNote() {
        const title = document.getElementById('noteTitle').value.trim();
        const content = document.getElementById('noteContent').value.trim();

        if (!title) {
            alert('Please enter a note title');
            return;
        }

        if (!content) {
            alert('Please enter note content');
            return;
        }

        if (this.currentNoteId) {
            // Update existing note
            Storage.updateNote(this.currentNoteId, { title, content });
        } else {
            // Create new note
            Storage.addNote({ title, content });

            // Add achievement if first note
            const notes = Storage.getNotes();
            if (notes.length === 1) {
                Storage.addAchievement({
                    icon: '📝',
                    title: 'Note Taker',
                    description: 'Created your first note'
                });
            }
        }

        this.render();
        document.getElementById('noteModal').classList.remove('active');
    },

    // Render notes
    render() {
        const notesList = document.getElementById('notesList');
        const notes = Storage.getNotes();

        if (notes.length === 0) {
            notesList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No notes yet. Create your first note!</p>';
            return;
        }

        notesList.innerHTML = notes.map(note => {
            const date = new Date(note.createdAt);
            const dateStr = date.toLocaleDateString();
            
            return `
                <div class="note-card" onclick="Notes.openNoteModal('${note.id}')">
                    <div class="note-header">
                        <div class="note-title">${note.title}</div>
                        <button class="note-delete" 
                                onclick="event.stopPropagation(); Notes.deleteNote('${note.id}')">
                            &times;
                        </button>
                    </div>
                    <div class="note-content">${note.content}</div>
                    <div class="note-date">${dateStr}</div>
                </div>
            `;
        }).join('');
    },

    // Delete note
    deleteNote(noteId) {
        if (confirm('Are you sure you want to delete this note?')) {
            Storage.deleteNote(noteId);
            this.render();
        }
    }
};
