const sizeEl = document.getElementById('size');
    const genBtn = document.getElementById('gen');
    const grid = document.getElementById('grid');
    const picker = document.getElementById('picker');
    const confirmBtn = document.getElementById('confirm');
    const chip = document.getElementById('peep');
    const eraserBtn = document.getElementById('eraser');
    
    const clearBtn = document.getElementById('clear');



    let currentColor = '#000000';
    let erasing = false;
    let isDown = false;

    
    function clamp(n, min, max){ return Math.min(max, Math.max(min, n)); }


    function setDisabled(disabled){
      [confirmBtn, eraserBtn, clearBtn].forEach(b=> b.disabled = disabled);
    }



    function buildGrid(n){
      grid.innerHTML = '';
      grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
      grid.classList.add('pinkbg');
      const frag = document.createDocumentFragment();
      for(let i=0;i<n*n;i++){
        const div = document.createElement('div');
        div.className = 'cell bg'; 
        div.dataset.filled = '0';
        frag.appendChild(div);
      }
      grid.appendChild(frag);
    }




    function paintCell(cell){
      if(!cell || !cell.classList.contains('cell')) return;
      if(erasing){
        cell.style.background = '#fff';
        cell.dataset.filled = '0';
        cell.classList.add('bg');
      } else {
        cell.style.background = currentColor;
        cell.dataset.filled = '1';
        cell.classList.remove('bg');
      }
    }

    
    chip.addEventListener('click', () => picker.click());
    confirmBtn.addEventListener('click', () => {
      currentColor = picker.value;
      chip.style.background = currentColor;
    });



    eraserBtn.addEventListener('click', () => {
      erasing = !erasing;
      eraserBtn.style.outline = erasing ? '3px solid #000' : 'none';
    });



    clearBtn.addEventListener('click', () => {
      grid.querySelectorAll('.cell').forEach(c=>{ c.style.background = '#fff'; c.dataset.filled='0'; c.classList.add('bg');});
    });



    genBtn.addEventListener('click', () => {
      let n = parseInt(sizeEl.value,10);
      n = clamp(isNaN(n)?25:n, 10, 100);
      sizeEl.value = n;
      buildGrid(n);
      setDisabled(false);
    });

    
    grid.addEventListener('mousedown', e=>{ isDown = true; paintCell(e.target); });
    grid.addEventListener('mousemove', e=>{ if(isDown) paintCell(e.target); });
    window.addEventListener('mouseup', ()=> isDown = false);

    
    grid.addEventListener('touchstart', (e)=>{ e.preventDefault(); paintCell(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)); }, {passive:false});
    grid.addEventListener('touchmove', (e)=>{ e.preventDefault(); paintCell(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)); }, {passive:false});

    
    buildGrid(25);
    chip.style.background = currentColor;
    setDisabled(false);
  