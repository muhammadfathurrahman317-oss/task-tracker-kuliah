// State & Filter
let tasks = JSON.parse(localStorage.getItem('tasks_kuliah')) || [];
let activeFilter = 'semua';

const taskForm = document.getElementById('task-form');
const inputTitle = document.getElementById('task-title');
const selectCourse = document.getElementById('task-course');
const inputDeadline = document.getElementById('task-deadline');
const errorMessage = document.getElementById('error-message');
const taskList = document.getElementById('task-list');
const taskCounter = document.getElementById('task-counter');
const emptyState = document.getElementById('empty-state');
const filterButtons = document.querySelectorAll('.filter-btn');

function saveToStorage() {
  localStorage.setItem('tasks_kuliah', JSON.stringify(tasks));
}

function render() {
  taskList.innerHTML = '';

  // 1. Filter status
  let filteredTasks = tasks.filter(task => {
    if (activeFilter === 'aktif') return !task.selesai;
    if (activeFilter === 'selesai') return task.selesai;
    return true;
  });

  // 2. Urutkan berdasarkan deadline terdekat (Fitur Bonus)
  filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  // 3. Tampilkan pesan kosong jika tidak ada tugas
  if (filteredTasks.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }

  // 4. Render elemen aman (textContent)
  filteredTasks.forEach(task => {
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

  // 5. Update counter tugas aktif
  const activeCount = tasks.filter(t => !t.selesai).length;
  taskCounter.textContent = `${activeCount} tugas aktif`;
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

  saveToStorage();
  render();

  inputTitle.value = '';
  inputDeadline.value = '';
});

taskList.addEventListener('click', function (e) {
  const item = e.target.closest('.task-item');
  if (!item) return;

  const taskId = item.dataset.id;

  if (e.target.classList.contains('btn-delete')) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveToStorage();
    render();
    return;
  }

  if (e.target.classList.contains('task-checkbox')) {
    const targetTask = tasks.find(t => t.id === taskId);
    if (targetTask) {
      targetTask.selesai = e.target.checked;
      saveToStorage();
      render();
    }
  }
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', function () {
    filterButtons.forEach(b => b.classList.remove('on'));
    this.classList.add('on');
    activeFilter = this.dataset.filter;
    render();
  });
});

render();
