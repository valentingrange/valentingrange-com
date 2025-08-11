const preview = document.getElementById('preview');
    document.querySelectorAll('.shrine').forEach(shrine => {
      shrine.addEventListener('click', () => {
        const name = shrine.getAttribute('data-name');
        const desc = shrine.getAttribute('data-desc');
        preview.innerHTML = `<strong>${name}</strong><br>${desc}`;
      });
    });