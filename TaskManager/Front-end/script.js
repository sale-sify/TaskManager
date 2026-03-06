const WEEK_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const state = {
  groups: ["Groupe A", "Groupe B", "Groupe C"],
  schedule: {}
};

const groupList = document.getElementById("groupList");
const scheduleContainer = document.getElementById("schedule");
const groupForm = document.getElementById("groupForm");
const groupInput = document.getElementById("groupInput");
const randomizeBtn = document.getElementById("randomizeBtn");
const copyBtn = document.getElementById("copyBtn");
const exportPdfBtn = document.getElementById("exportPdfBtn");
const rowTemplate = document.getElementById("dayRowTemplate");

function shuffle(list) {
  const clone = [...list];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function assignRandomWeek() {
  if (state.groups.length === 0) {
    WEEK_DAYS.forEach((day) => {
      state.schedule[day] = "Aucun groupe";
    });
    return;
  }

  const shuffled = shuffle(state.groups);
  WEEK_DAYS.forEach((day, index) => {
    state.schedule[day] = shuffled[index % shuffled.length];
  });
}

function renameGroup(index) {
  const previousName = state.groups[index];
  const renamed = window.prompt("Nouveau nom du groupe/parent :", previousName);

  if (renamed === null) {
    return;
  }

  const nextName = renamed.trim();
  if (!nextName || nextName === previousName) {
    return;
  }

  state.groups[index] = nextName;
  WEEK_DAYS.forEach((day) => {
    if (state.schedule[day] === previousName) {
      state.schedule[day] = nextName;
    }
  });

  render();
}

function renderGroups() {
  groupList.innerHTML = "";
  state.groups.forEach((name, index) => {
    const item = document.createElement("li");
    item.className = "chip";
    item.innerHTML = `<span>${name}</span>`;

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "✎";
    editBtn.className = "chip-edit";
    editBtn.setAttribute("aria-label", `Renommer ${name}`);
    editBtn.addEventListener("click", () => {
      renameGroup(index);
    });

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "×";
    removeBtn.setAttribute("aria-label", `Retirer ${name}`);
    removeBtn.addEventListener("click", () => {
      state.groups.splice(index, 1);
      assignRandomWeek();
      render();
    });

    item.appendChild(editBtn);
    item.appendChild(removeBtn);
    groupList.appendChild(item);
  });
}

function makeSelect(day) {
  const select = document.createElement("select");
  select.className = "group-select";

  const options = state.groups.length > 0 ? state.groups : ["Aucun groupe"];
  options.forEach((group) => {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = group;
    select.appendChild(option);
  });

  select.value = state.schedule[day] ?? options[0];
  select.addEventListener("change", (event) => {
    state.schedule[day] = event.target.value;
  });

  return select;
}

function renderSchedule() {
  scheduleContainer.innerHTML = "";
  WEEK_DAYS.forEach((day) => {
    const clone = rowTemplate.content.cloneNode(true);
    clone.querySelector(".day-name").textContent = day;
    clone.querySelector(".group-select").replaceWith(makeSelect(day));
    scheduleContainer.appendChild(clone);
  });
}

function copySchedule() {
  const text = WEEK_DAYS.map((day) => `${day}: ${state.schedule[day]}`).join("\n");
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "✅ Copié";
    window.setTimeout(() => {
      copyBtn.textContent = "Copier le planning";
    }, 1200);
  });
}

function drawThemeCard(doc, y, day, group) {
  doc.setFillColor(255, 246, 220);
  doc.roundedRect(20, y, 170, 20, 4, 4, "F");
  doc.setDrawColor(240, 204, 126);
  doc.roundedRect(20, y, 170, 20, 4, 4, "S");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(85, 53, 22);
  doc.text(day, 26, y + 8);
  doc.setFont("helvetica", "normal");
  doc.text(`Viennoiseries: ${group}`, 26, y + 15);
}

function exportSchedulePdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    window.alert("Librairie PDF indisponible. Vérifiez votre connexion internet.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  doc.setFillColor(246, 232, 255);
  doc.rect(0, 0, 210, 297, "F");

  doc.setFillColor(255, 215, 143);
  doc.circle(24, 20, 8, "F");
  doc.setFillColor(167, 223, 181);
  doc.circle(186, 20, 8, "F");

  doc.setTextColor(76, 43, 120);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Planning viennoiseries", 20, 32);
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.text("Creche - theme convivial parents & enfants", 20, 40);

  doc.setDrawColor(120, 89, 184);
  doc.line(20, 45, 190, 45);

  let y = 55;
  WEEK_DAYS.forEach((day) => {
    drawThemeCard(doc, y, day, state.schedule[day] || "Aucun groupe");
    y += 27;
  });

  doc.setTextColor(90, 83, 109);
  doc.setFontSize(10);
  doc.text("Merci aux familles pour leur participation !", 20, 210);

  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  doc.save(`planning-viennoiseries-${stamp}.pdf`);
}

function render() {
  renderGroups();
  renderSchedule();
}

groupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = groupInput.value.trim();
  if (!name) {
    return;
  }

  state.groups.push(name);
  groupInput.value = "";
  assignRandomWeek();
  render();
});

randomizeBtn.addEventListener("click", () => {
  assignRandomWeek();
  renderSchedule();
});

copyBtn.addEventListener("click", copySchedule);
exportPdfBtn.addEventListener("click", exportSchedulePdf);

assignRandomWeek();
render();
