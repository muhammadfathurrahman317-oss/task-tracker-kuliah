let tasks = [
  { id: '1', judul: 'Lab 10 event delegation', matkul: 'Pemrograman Web', deadline: '2026-10-08', selesai: false },
  { id: '2', judul: 'ERD sistem perpustakaan', matkul: 'Basis Data', deadline: '2026-10-12', selesai: true }
];

const taskForm = document.getElementById('task-form');
const inputTitle = document.getElementById('task-title');
const selectCourse = document.getElementById('task-course');
const inputDeadline = document.getElementById('task-deadline');
const errorMessage = document.getElementById('error-message');
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
    titleSpan.textContent = task.judul;

    const metaSpan = document.createElement('span');
    metaSpan.className = 'task-meta';
    metaSpan.textContent = `${task.matkul} · deadline ${task.deadline}`;

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

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const judul = inputTitle.value.trim();
  const matkul = selectCourse.value;
  const deadline = inputDeadline.value;

  if (judul.length < 3) {
    errorMessage.textContent = 'Judul tugas minimal harus 3 karakter.';
    errorMessage.style.display = 'block';
    return;
  }
  if (!deadline) {
    errorMessage.textContent = 'Deadline wajib diisi.';
    errorMessage.style.display = 'block';
    return;
  }

  errorMessage.textContent = '';
  errorMessage.style.display = 'none';

  tasks.push({
    id: Date.now().toString(),
    judul: judul,
    matkul: matkul,
    deadline: deadline,
    selesai: false
  });

  render();

  inputTitle.value = '';
  inputDeadline.value = '';
});

// 03. Event Delegation di <ul>
taskList.addEventListener('click', function (e) {
  const item = e.target.closest('.task-item');
  if (!item) return;

  const taskId = item.dataset.id;

  // Tombol Hapus
  if (e.target.classList.contains('btn-delete')) {
    tasks = tasks.filter(t => t.id !== taskId);
    render();
    return;
  }

  // Checkbox Selesai
  if (e.target.classList.contains('task-checkbox')) {
    const targetTask = tasks.find(t => t.id === taskId);
    if (targetTask) {
      targetTask.selesai = e.target.checked;
      render();
    }
  }
});

render();
