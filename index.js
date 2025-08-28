// ---------- Data ----------
const services = [
    { id: 'nat-emergency', icon: '🛡️', name: 'National Emergency Number', localName: 'জাতীয় জরুরি সেবা', number: '999', category: 'All' },
    { id: 'police', icon: '👮', name: 'Police Helpline Number', localName: 'পুলিশ', number: '999', category: 'Police' },
    { id: 'fire', icon: '🚒', name: 'Fire Service Number', localName: 'ফায়ার সার্ভিস', number: '999', category: 'Fire' },
    { id: 'ambulance', icon: '🚑', name: 'Ambulance Service', localName: 'অ্যাম্বুলেন্স', number: '1994-9999999', category: 'Health' },
    { id: 'women-child', icon: '👩\u200d👧', name: 'Women & Child Helpline', localName: 'নারী ও শিশু', number: '109', category: 'Help' },
    { id: 'anti-corruption', icon: '🛡️', name: 'Anti-Corruption Helpline', localName: 'দুর্নীতি দমন', number: '106', category: 'Govt.' },
    { id: 'electricity', icon: '💡', name: 'Electricity Helpline', localName: 'বিদ্যুৎ', number: '16216', category: 'Electricity' },
    { id: 'brac', icon: '🏥', name: 'Brac Helpline', localName: 'ব্র্যাক', number: '16465', category: 'NGO' },
    { id: 'rail', icon: '🚆', name: 'Bangladesh Railway Helpline', localName: 'বাংলাদেশ রেলওয়ে', number: '163', category: 'Travel' }
  ];

  // ---------- State ----------
  let coins = 100;
  let copyCount = 0;
  let heartCount = 0;

  // ---------- DOM ----------
  const cardsEl = document.getElementById('cards');
  const coinEl = document.getElementById('coinCount');
  const copyEl = document.getElementById('copyCount');
  const heartEl = document.getElementById('heartCount');
  const historyList = document.getElementById('historyList');
  const historyEmpty = document.getElementById('historyEmpty');
  const clearBtn = document.getElementById('clearHistory');

  // ---------- Helpers ----------
  const fmtTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const updatePills = () => { coinEl.textContent = coins; copyEl.textContent = copyCount; heartEl.textContent = heartCount; };

  function renderCards() {
    const html = services.map(s => `
      <article class="card" data-id="${s.id}">
        <button class="fav" type="button" aria-label="Add to favorites" title="Add to favorites">💗</button>
        <div class="icon" aria-hidden="true">${s.icon}</div>
        <div class="name">${s.name}</div>
        <div class="local">${s.localName}</div>
        <div class="number">${s.number}</div>
        <span class="badge">${s.category}</span>
        <div class="actions">
          <button class="btn ghost copy-btn" type="button" data-number="${s.number}" data-name="${s.name}">📋 Copy</button>
          <button class="btn primary call-btn" type="button" data-number="${s.number}" data-name="${s.name}">📞 Call</button>
        </div>
      </article>
    `).join('');
    cardsEl.innerHTML = html;
  }

  renderCards();

  // Event Delegation for all card buttons
  cardsEl.addEventListener('click', async (e) => {
    const favBtn = e.target.closest('.fav');
    if (favBtn && favBtn.closest('.card')) {
      const isActive = favBtn.classList.toggle('active');
      favBtn.setAttribute('aria-pressed', String(isActive));
      heartCount += isActive ? 1 : -1;
      if (heartCount < 0) heartCount = 0;
      updatePills();
      return;
    }

    const copyBtn = e.target.closest('.copy-btn');
    if (copyBtn) {
      const number = copyBtn.dataset.number || '';
      const name = copyBtn.dataset.name || 'Service';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(number);
        } else {
          // Fallback for older browsers
          const ta = document.createElement('textarea');
          ta.value = number; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
        }
        copyCount++;
        updatePills();
        alert(`Copied ${name} number ( ${number} ) to clipboard.`);
      } catch (err) {
        alert('Copy failed. You can manually copy: ' + number);
      }
      return;
    }

    const callBtn = e.target.closest('.call-btn');
    if (callBtn) {
      const number = callBtn.dataset.number || '';
      const name = callBtn.dataset.name || 'Service';
      if (coins < 20) {
        alert('Not enough coins to make a call. You need 20 coins.');
        return;
      }
      coins -= 20; updatePills();
      alert(`Calling ${name} at ${number}...`);
      addToHistory({ name, number, time: fmtTime() });
    }
  });

  function addToHistory(entry) {
    if (historyEmpty) historyEmpty.remove();
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `
      <div>
        <div style="font-weight:800">${entry.name}</div>
        <div class="meta"><span>📱 ${entry.number}</span><span>🕒 ${entry.time}</span></div>
      </div>
      <div class="meta" aria-hidden="true">✅</div>
    `;
    historyList.prepend(li);
  }

  clearBtn.addEventListener('click', () => {
    historyList.innerHTML = '';
    const empty = document.createElement('li');
    empty.id = 'historyEmpty';
    empty.className = 'empty';
    empty.textContent = 'No calls yet.';
    historyList.append(empty);
  });

  // Initial values
  updatePills();