document.querySelectorAll('.order-row').forEach(row => {
    row.addEventListener('click', function() {
        window.location.href = this.dataset.url;
    });
});