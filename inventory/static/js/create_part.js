document.addEventListener('DOMContentLoaded', function() {
    const partForm = document.getElementById('partForm');
    const quantityInput = document.querySelector('input[name="quantity"]');
    const priceInput = document.querySelector('input[name="price"]');
    const totalValueElement = document.getElementById('totalValue');

    function updateTotalValue() {
        if (quantityInput && priceInput && totalValueElement) {
            const quantity = parseFloat(quantityInput.value) || 0;
            const price = parseFloat(priceInput. value) || 0;
            const total = (quantity * price).toFixed(2);
            totalValueElement.textContent = `${total} zł`;
        }
    }

    if (quantityInput && priceInput) {
        quantityInput.addEventListener('input', updateTotalValue);
        priceInput.addEventListener('input', updateTotalValue);
    }


    partForm.addEventListener('submit', function(e) {
        const nameInput = document.querySelector('input[name="name"]');

        if (!nameInput.value.trim()) {
            e.preventDefault();
            alert('Nazwa części jest wymagana! ');
            nameInput.focus();
            return false;
        }

        if (quantityInput.value < 0) {
            e.preventDefault();
            alert('Ilość nie może być ujemna!');
            quantityInput.focus();
            return false;
        }

        if (priceInput.value < 0) {
            e.preventDefault();
            alert('Cena nie może być ujemna!');
            priceInput.focus();
            return false;
        }
    });

    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e9ecef';
            }
        });

        input.addEventListener('input', function() {
            if (this. style.borderColor === 'rgb(220, 53, 69)') {
                if (this.value.trim()) {
                    this.style. borderColor = '#e9ecef';
                }
            }
        });
    });

    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });

    if (priceInput) {
        priceInput.addEventListener('blur', function() {
            const value = parseFloat(this.value);
            if (!isNaN(value)) {
                this.value = value.toFixed(2);
            }
        });
    }
});