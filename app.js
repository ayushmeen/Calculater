const output = document.getElementById('output');
    const clickSound = document.getElementById('clickSound');
    const historyList = document.getElementById('history-entries');

    function clickS() {
      clickSound.currentTime = 0;
      clickSound.play();
    }

    function appendValue(val) {
      if (output.textContent === "0" || output.textContent === "Error") {
        output.textContent = "";
      }
      if (val === ',' || val === '.') val = '.';
      output.textContent += val;
    }

    function clearDisplay() {
      output.textContent = "0";
    }

    function toggleSign() {
      let current = output.textContent;
      if (current.startsWith("-")) {
        output.textContent = current.slice(1);
      } else {
        output.textContent = "-" + current;
      }
    }

    function calculate() {
      try {
        const expression = output.textContent.replace('%', '/100');
        const result = eval(expression);
        addToHistory(output.textContent, result);
        output.textContent = result;
        animateResult();
      } catch {
        output.textContent = "Error";
      }
    }

    function animateResult() {
      output.classList.add('bounce');
      setTimeout(() => output.classList.remove('bounce'), 400);
    }

    function addToHistory(expression, result) {
      const entry = document.createElement("div");
      entry.className = "history-entry";
      entry.textContent = `${expression} = ${result}`;
      historyList.prepend(entry);
    }

    function copyResult() {
      navigator.clipboard.writeText(output.textContent);
      alert("Copied: " + output.textContent);
    }

    function toggleTheme() {
      document.body.classList.toggle('light');
      const btn = document.querySelector('.theme-toggle');
      btn.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      const allowed = "0123456789/*-+.%";
      if (allowed.includes(e.key)) {
        appendValue(e.key);
      } else if (e.key === "Enter") {
        calculate();
      } else if (e.key === "Backspace") {
        output.textContent = output.textContent.slice(0, -1) || "0";
      }
    });
