script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Pesquisa em Tempo Real (Real-time Search)
    const searchInput = document.getElementById('searchInput');
    const tableSections = document.querySelectorAll('.table-section');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();

        tableSections.forEach(section => {
            const tableName = section.querySelector('.card-header').textContent.toLowerCase();
            const rows = section.querySelectorAll('tbody tr');
            let sectionMatch = tableName.includes(term);
            let visibleRowsCount = 0;

            rows.forEach(row => {
                const rowText = row.textContent.toLowerCase();
                if (rowText.includes(term) || sectionMatch) {
                    row.style.display = '';
                    visibleRowsCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            if (visibleRowsCount > 0 || sectionMatch) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    });

    // 2. Light / Dark Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        
        const icon = themeToggleBtn.querySelector('i');
        if (newTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // 3. Panzoom.js Inicialização para o Modal do DER
    const derModal = document.getElementById('derModal');
    let panzoomInstance = null;

    derModal.addEventListener('shown.bs.modal', () => {
        const elem = document.getElementById('derImage');
        if (!panzoomInstance) {
            panzoomInstance = Panzoom(elem, {
                maxScale: 5,
                minScale: 0.5,
                increment: 0.2,
                contain: 'outside'
            });

            elem.addEventListener('wheel', panzoomInstance.zoomWithWheel);

            document.getElementById('zoomIn').addEventListener('click', () => panzoomInstance.zoomIn());
            document.getElementById('zoomOut').addEventListener('click', () => panzoomInstance.zoomOut());
            document.getElementById('zoomReset').addEventListener('click', () => panzoomInstance.reset());
        }
    });
});