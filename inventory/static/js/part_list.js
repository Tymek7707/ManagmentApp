document.addEventListener('DOMContentLoaded', function() {
    const lowStockRows = document.querySelectorAll('.part-row.low-stock');
    lowStockRows.forEach(row => {
        row.style.animation = 'pulse 2s infinite';
    });

    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const partName = this.closest('tr, .part-card').querySelector('.part-name, .part-card-name').textContent;
            if (! confirm(`Czy na pewno chcesz usunąć część:  ${partName. trim()}?`)) {
                e.preventDefault();
            }
        });
    });

    const cards = document.querySelectorAll('.part-card, .stat-card');
    const observer = new IntersectionObserver((entries) => {
        entries. forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry. target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform:  scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(style);