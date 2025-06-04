function loadState() {
    const problems = JSON.parse(localStorage.getItem('problems') || '[]');
    const manifestations = JSON.parse(localStorage.getItem('manifestations') || '[]');
    return { problems, manifestations };
}

function saveState(state) {
    localStorage.setItem('problems', JSON.stringify(state.problems));
    localStorage.setItem('manifestations', JSON.stringify(state.manifestations));
}

function render() {
    const { problems, manifestations } = state;
    const problemList = document.getElementById('problem-list');
    const maniList = document.getElementById('manifestation-list');
    problemList.innerHTML = '';
    maniList.innerHTML = '';

    problems.forEach((p, idx) => {
        const li = document.createElement('li');
        li.textContent = p;
        const dissolveBtn = document.createElement('button');
        dissolveBtn.textContent = 'Dissolve';
        dissolveBtn.onclick = () => handleDissolve(idx);
        li.appendChild(dissolveBtn);
        problemList.appendChild(li);
    });

    manifestations.forEach((m, idx) => {
        const li = document.createElement('li');
        li.textContent = m;
        const sendBtn = document.createElement('button');
        sendBtn.textContent = 'Transmit';
        sendBtn.onclick = () => {
            state.manifestations.splice(idx, 1);
            saveState(state);
            render();
            alert('Manifestation transmitted to the universe!');
        };
        li.appendChild(sendBtn);
        maniList.appendChild(li);
    });
}

function handleDissolve(idx) {
    const prob = state.problems[idx];
    const intention = prompt('Visualize the problem dissolving.\n\nNow enter a positive intention to replace:\n', '');
    if (intention) {
        state.problems.splice(idx, 1);
        state.manifestations.push(intention);
        saveState(state);
        render();
    }
}

const state = loadState();

// event listeners

document.getElementById('add-problem').onclick = () => {
    const input = document.getElementById('problem-input');
    const val = input.value.trim();
    if (val) {
        state.problems.push(val);
        input.value = '';
        saveState(state);
        render();
    }
};

document.getElementById('add-pure').onclick = () => {
    const input = document.getElementById('pure-input');
    const val = input.value.trim();
    if (val) {
        state.manifestations.push(val);
        input.value = '';
        saveState(state);
        render();
        alert('Manifestation transmitted to the universe!');
    }
};

// mode switching
const problemBtn = document.getElementById('mode-problem');
const pureBtn = document.getElementById('mode-pure');

problemBtn.onclick = () => {
    problemBtn.classList.add('active');
    pureBtn.classList.remove('active');
    document.getElementById('problem-section').style.display = 'block';
    document.getElementById('pure-section').style.display = 'none';
};

pureBtn.onclick = () => {
    pureBtn.classList.add('active');
    problemBtn.classList.remove('active');
    document.getElementById('problem-section').style.display = 'none';
    document.getElementById('pure-section').style.display = 'block';
};

render();
