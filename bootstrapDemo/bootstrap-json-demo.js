const loadBtn = document.getElementById("loadBtn");
const statusEl = document.getElementById("status");
const cardRow = document.getElementById("cardRow");
const alertPlaceholder = document.getElementById("alertPlaceholder");

loadBtn.addEventListener("click", handleLoad);

async function handleLoad() {
  setStatus("Fetching data…");
  clearAlerts();
  cardRow.innerHTML = "";
  loadBtn.disabled = true;

  try {
    const response = await fetch("json-example.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    setStatus("Data loaded successfully");
    renderCards(data);
  } catch (error) {
    setStatus("Idle");
    showAlert(`Failed to load JSON: ${error.message}`, "danger");
  } finally {
    loadBtn.disabled = false;
  }
}

function renderCards(data) {
  const apiUsers = data.apiResponse?.data ?? [];
  const features = data.configuration?.features ?? {};
  const cartItems = data.clientState?.cart?.items ?? [];

  const cardConfigs = [
    {
      title: "API Users",
      subtitle: `${apiUsers.length} total`,
      items: apiUsers.map((user) => `${user.name} — ${user.role}`),
      icon: "bi-people"
    },
    {
      title: "Feature Flags",
      subtitle: "Configuration",
      items: Object.entries(features).map(([key, value]) => `${key}: ${formatValue(value)}`),
      icon: "bi-sliders"
    },
    {
      title: "Cart Items",
      subtitle: `${cartItems.length} item(s)` ,
      items: cartItems.map((item) => `${item.qty} × ${item.sku} ($${item.price})`),
      icon: "bi-bag"
    }
  ];

  cardConfigs.forEach((config) => cardRow.appendChild(createCard(config)));

  if (!apiUsers.length && !Object.keys(features).length && !cartItems.length) {
    showAlert("JSON loaded but contained no displayable data.", "warning");
  }
}

function createCard({ title, subtitle, items, icon }) {
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4";

  const card = document.createElement("div");
  card.className = "card h-100 shadow-sm";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const heading = document.createElement("h5");
  heading.className = "card-title d-flex align-items-center gap-2";
  if (icon) {
    const iconElem = document.createElement("i");
    iconElem.className = `bi ${icon}`;
    heading.appendChild(iconElem);
  }
  heading.appendChild(document.createTextNode(title));

  const subtitleEl = document.createElement("h6");
  subtitleEl.className = "card-subtitle mb-3 text-muted";
  subtitleEl.textContent = subtitle;

  cardBody.appendChild(heading);
  cardBody.appendChild(subtitleEl);
  card.appendChild(cardBody);

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "text-muted mb-0 px-3 pb-3";
    empty.textContent = "No data available.";
    card.appendChild(empty);
  } else {
    const list = document.createElement("ul");
    list.className = "list-group list-group-flush";
    items.forEach((itemText) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = itemText;
      list.appendChild(li);
    });
    card.appendChild(list);
  }

  col.appendChild(card);
  return col;
}

function showAlert(message, type = "primary") {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `  ${message}`,
    '  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join("");
  alertPlaceholder.appendChild(wrapper.firstElementChild);
}

function clearAlerts() {
  alertPlaceholder.innerHTML = "";
}

function setStatus(text) {
  statusEl.textContent = text;
}

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (value && typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}
