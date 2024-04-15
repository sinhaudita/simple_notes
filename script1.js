// Create a div called container to encapsulate all notes


// Function to create a new note
function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
    <div class="tools">  
      <button class="edit"><i class="fas fa-edit"></i></button>  
      <button class="delete"><i class="fas fa-trash-alt"></i></button>  
    </div>  
    <div class="main ${text ? '' : 'hidden'}"></div>  
    <textarea class="${text ? 'hidden' : ''}">${text}</textarea>  
  `;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');
  textArea.value = text;
  main.innerHTML = marked(text);

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  });

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener('input', (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLS();
  });

  container.appendChild(note); // Append the note to the container

}
const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);   

// Update Local Storage function
function updateLS() {
  const notesText = document.querySelectorAll('textarea');
  const notes = [];
  notesText.forEach((note) => notes.push(note.value));
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Retrieve notes from Local Storage
const storedNotes = localStorage.getItem('notes');
const notes = storedNotes ? JSON.parse(storedNotes) : [];

// Display existing notes
if (notes && Array.isArray(notes)) {
  notes.forEach((note) => addNewNote(note));
}

// Event listener for adding new notes
const addBtn = document.getElementById('add');
addBtn.addEventListener('click', () => addNewNote());
