document.addEventListener('DOMContentLoaded', function() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    const modeInput = document.getElementById('modeInput');
    const existingClientSection = document.getElementById('existingClientSection');
    const newClientSection = document.getElementById('newClientSection');
    const orderForm = document.getElementById('orderForm');

    modeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');

            modeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList. add('active');

            modeInput.value = mode;

            if (mode === 'existing') {
                existingClientSection.classList.add('active');
                newClientSection.classList.remove('active');

                enableExistingClientFields();
                disableNewClientFields();
            } else {
                existingClientSection.classList.remove('active');
                newClientSection. classList.add('active');

                disableExistingClientFields();
                enableNewClientFields();
            }
        });
    });

    function enableExistingClientFields() {
        const clientSelect = document.querySelector('#existingClientSection select');
        if (clientSelect) {
            clientSelect.removeAttribute('disabled');
            clientSelect.setAttribute('required', 'required');
            clientSelect.setAttribute('name', 'client'); // Przywróć atrybut name
        }
    }

    function disableExistingClientFields() {
        const clientSelect = document.querySelector('#existingClientSection select');
        if (clientSelect) {
            clientSelect.setAttribute('disabled', 'disabled');
            clientSelect. removeAttribute('required');
            clientSelect.removeAttribute('name'); // Usuń atrybut name, żeby nie był wysyłany
        }
    }

    function enableNewClientFields() {
        const newClientInputs = newClientSection.querySelectorAll('input, select, textarea');
        newClientInputs. forEach(input => {
            input.removeAttribute('disabled');
            const originalName = input.getAttribute('data-name');
            if (originalName) {
                input.setAttribute('name', originalName);
            }
        });
    }

    function disableNewClientFields() {
        const newClientInputs = newClientSection.querySelectorAll('input, select, textarea');
        newClientInputs.forEach(input => {
            input.setAttribute('disabled', 'disabled');
            const currentName = input.getAttribute('name');
            if (currentName) {
                input.setAttribute('data-name', currentName);
                input.removeAttribute('name'); // Usuń name, żeby nie był wysyłany
            }
        });
    }

    // Initialize with existing client mode
    enableExistingClientFields();
    disableNewClientFields();

    // Phone number formatting (Polish format:  9 digits)
    const phoneInput = document.querySelector('input[data-name="phone_number"], input[name="phone_number"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 9) {
                value = value.slice(0, 9);
            }
            e. target.value = value;
        });
    }

    // Postal code formatting (Polish format: XX-XXX)
    const postalCodeInput = document.querySelector('input[data-name="postal_code"], input[name="postal_code"]');
    if (postalCodeInput) {
        postalCodeInput.addEventListener('input', function(e) {
            let value = e. target.value.replace(/[^\d-]/g, '');

            // Remove existing dashes
            value = value.replace(/-/g, '');

            // Add dash after 2 digits
            if (value. length > 2) {
                value = value.slice(0, 2) + '-' + value.slice(2, 5);
            }

            e.target.value = value;
        });
    }

    // Form validation before submit
    orderForm.addEventListener('submit', function(e) {
        const mode = modeInput.value;

        if (mode === 'existing') {
            const clientSelect = document.querySelector('#existingClientSection select');
            if (!clientSelect || !clientSelect.value) {
                e.preventDefault();
                alert('Proszę wybrać klienta z listy.');
                return false;
            }
        } else if (mode === 'new') {
            // Make sure client select is disabled and won't be submitted
            const clientSelect = document.querySelector('#existingClientSection select');
            if (clientSelect) {
                clientSelect.removeAttribute('name');
            }

            // Validate new client fields
            const requiredNewClientFields = [
                newClientSection.querySelector('input[name="name"]'),
                newClientSection. querySelector('input[name="surname"]'),
                newClientSection.querySelector('input[name="phone_number"]'),
                newClientSection.querySelector('input[name="email"]')
            ];

            let isValid = true;

            requiredNewClientFields.forEach(field => {
                if (field && !field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                }
            });

            if (!isValid) {
                e. preventDefault();
                alert('Proszę wypełnić wszystkie wymagane pola klienta.');
                return false;
            }
        }
    });

    // Real-time validation feedback
    const allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this. hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e9ecef';
            }
        });

        input.addEventListener('input', function() {
            if (this. style.borderColor === 'rgb(220, 53, 69)') {
                if (this.value.trim()) {
                    this.style.borderColor = '#e9ecef';
                }
            }
        });
    });

    // Email validation
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && ! emailPattern.test(this. value)) {
                this.style.borderColor = '#dc3545';

                // Add error message if not exists
                if (! this.nextElementSibling || !this.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.classList.add('error-message');
                    errorMsg.textContent = 'Proszę podać poprawny adres email';
                    this.parentNode.insertBefore(errorMsg, this.nextSibling);
                }
            } else {
                this.style.borderColor = '#e9ecef';
                // Remove error message if exists
                if (this. nextElementSibling && this. nextElementSibling.classList. contains('error-message')) {
                    this.nextElementSibling.remove();
                }
            }
        });
    }

    // Animate form sections on load
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '0';
            section.style. transform = 'translateY(20px)';
            section.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
});