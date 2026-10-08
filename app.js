// State awal dengan contoh data dummy
let tasks = [
  { id: '1', judul: 'Lab 10 event delegation', matkul: 'Pemrograman Web', deadline: '2026-10-08', selesai: false },
  { id: '2', judul: 'ERD sistem perpustakaan', matkul: 'Basis Data', deadline: '2026-10-12', selesai: true }
];

const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');

function render() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.selesai ? 'completed' : ''}`;
    li.dataset.id = task.id;

    const leftDiv = document.createElement('div');
    leftDiv.className = 'task-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.selesai;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'task-info';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'task-title';
    titleSpan.textContent = task.judul; // Aman dari XSS

    const metaSpan = document.createElement('span');
    metaSpan.className = 'task-meta';
    metaSpan.textContent = `${task.matkul} · deadline ${task.deadline}`; // Aman dari XSS

    infoDiv.appendChild(titleSpan);
    infoDiv.appendChild(metaSpan);
    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(infoDiv);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.type = 'button';
    deleteBtn.textContent = '✕';

    li.appendChild(leftDiv);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

render();
