// Declare all Data 
const services = [
    { id: 'nat-emergency', 
    icon: 'assets/emergency.png', 
    name: 'National Emergency Number', 
    localName: 'National Emergency', 
    number: '999', 
    category: 'All' },

    { id: 'police', 
    icon: 'assets/police.png', 
    name: 'Police Helpline Number', 
    localName: 'Police', 
    number: '999', 
    category: 'Police' },

    { id: 'fire', 
    icon: 'assets/emergency.png', 
    name: 'Fire Service Number', 
    localName: 'Fire Service', 
    number: '999', 
    category: 'Fire' },

    { id: 'ambulance', 
    icon: 'assets/ambulance.png', 
    name: 'Ambulance Service', 
    localName: 'Ambulance', 
    number: '102', 
    category: 'Health' },

    { id: 'women-child', 
    icon: 'assets/emergency.png', 
    name: 'Women & Child Helpline', 
    localName: 'Women & Child Helpline', 
    number: '109', 
    category: 'Help' },

    { id: 'anti-corruption', 
    icon: 'assets/emergency.png', 
    name: 'Anti-Corruption Helpline', 
    localName: 'Anti-Corruption', 
    number: '106', category: 'Govt.' },

    { id: 'electricity', 
    icon: 'assets/emergency.png', 
    name: 'Electricity Helpline', 
    localName: 'Electricity Outage', 
    number: '16216', 
    category: 'Electricity' },

    { id: 'brac', 
    icon: 'assets/emergency.png', 
    name: 'Brac Helpline', 
    localName: 'Brac', 
    number: '16445', 
    category: 'NGO' },

    { id: 'railway', 
    icon: 'assets/emergency.png', 
    name: 'Bangladesh Railway Helpline', 
    localName: 'Bangladesh Railway', 
    number: '163', 
    category: 'Travel' }
  ];
  
  // variables declare
  let coins = 100;
  let copyCount = 0;
  let heartCount = 0;
  
  //  DOM 
  const cardsEl = document.getElementById('cards');
  const coinEl = document.getElementById('coinCount');
  const copyEl = document.getElementById('copyCount');
  const heartEl = document.getElementById('heartCount');
  const historyList = document.getElementById('historyList');
  const historyEmpty = document.getElementById('historyEmpty');
  const clearBtn = document.getElementById('clearHistory');
  
  //  Helpers 
  const fmtTime = () => new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  const updatePills = () => {
    coinEl.textContent = coins;
    copyEl.textContent = copyCount + " copy";
    heartEl.textContent = heartCount;
  };
  
  //  Render Cards 
  function renderCards() {
    cardsEl.innerHTML = services.map(s => `
      <article class="card bg-white border border-gray-200 rounded-lg p-4 shadow relative" data-id="${s.id}">
        
        <!-- Service Icon -->
        <div class="flex items-center gap-3 mb-2">
          <img src="${s.icon}" alt="${s.name}" class="h-10 w-10 rounded-md">
          <button class="fav ml-auto">
            <img src="assets/heart.png" alt="Favorite" class="h-5 w-5">
          </button>
        </div>
  
        <!-- Service Info -->
        <div class="name font-bold text-lg">${s.name}</div>
        <div class="local text-gray-600 text-sm">${s.localName}</div>
        <div class="number font-semibold text-xl mt-1">${s.number}</div>
  
        <!-- Category -->
        <span class="badge inline-block mt-2 px-2 py-0.5 text-xs bg-gray-100 border border-gray-200 rounded-full">
          ${s.category}
        </span>
  
        <!-- Actions -->
        <div class="actions flex gap-2 mt-4">
          <button class="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded copy-btn" 
                  data-number="${s.number}" data-name="${s.name}">
            <img src="assets/copy.png" alt="Copy" class="h-4 w-4"> Copy
          </button>
  
          <button class="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded bg-green-500 text-white call-btn"
                  data-number="${s.number}" data-name="${s.name}">
            <img src="assets/call.png" alt="Call" class="h-4 w-4"> Call
          </button>
        </div>
      </article>
    `).join('');
  }
  
  renderCards();
  
    // Event Delegation 
  cardsEl.addEventListener('click', async (e) => {
    const favBtn = e.target.closest('.fav');
    const copyBtn = e.target.closest('.copy-btn');
    const callBtn = e.target.closest('.call-btn');
  
    if(favBtn) {
      const isActive = favBtn.classList.toggle('text-pink-600/50');
      heartCount += isActive ? 1 : -1;
      if(heartCount < 0) heartCount = 0;
      updatePills();
    }
  
    if(copyBtn) {
      const card = copyBtn.closest('article');
      const number = card.querySelector('.text-lg').textContent;
      copyCount++;
      updatePills();
      try { await navigator.clipboard.writeText(number); } catch {}
      alert(`Copied ${number} to clipboard.`);
    }
  
    if(callBtn) {
      const card = callBtn.closest('article');
      const number = card.querySelector('.text-lg').textContent;
      const name = card.querySelector('.font-bold').textContent;
      if(coins < 20){ alert('Not enough coins (need 20)'); return; }
      coins -= 20;
      updatePills();
      alert(`Calling ${name} at ${number}...`);
      addToHistory({name, number, time: fmtTime()});
    }
  });
  
  function addToHistory(entry) {
    if(historyEmpty) historyEmpty.remove();
    const li = document.createElement('li');
    li.className = 'history-item border border-gray-200 rounded-lg p-2 bg-gray-50 flex justify-between';
    li.innerHTML = `
      <div>
        <div class="font-bold">${entry.name}</div>
        <div class="text-xs text-gray-600 flex gap-2"><span>📱 ${entry.number}</span><span>🕒 ${entry.time}</span></div>
      </div>
    `;
    historyList.prepend(li);
  }
  
  clearBtn.addEventListener('click', () => {
    historyList.innerHTML = '';
    const empty = document.createElement('li');
    empty.id = 'historyEmpty';
    empty.className = 'text-center text-gray-500';
    empty.textContent = 'No calls yet.';
    historyList.append(empty);
  });
  
  updatePills();
  