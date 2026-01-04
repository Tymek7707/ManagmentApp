document.addEventListener('DOMContentLoaded', function() {
    // availableParts będzie przekazane z template przez data attribute
    const availablePartsElement = document.getElementById('availablePartsData');
    const availableParts = availablePartsElement ?  JSON.parse(availablePartsElement.textContent) : [];

    const tableBody = document.getElementById('partsTableBody');
    const addPartBtn = document.getElementById('addPartBtn');
    const orderForm = document.getElementById('orderForm');

    // Sprawdź czy elementy istnieją
    if (! tableBody || !addPartBtn || ! orderForm) {
        console.error('Nie znaleziono wymaganych elementów formularza');
        return;
    }

    /**
     * Dodaj nową część do tabeli
     */
    addPartBtn.addEventListener('click', function() {
        const newRow = createPartRow();
        tableBody.appendChild(newRow);
        updateTotal();
    });

    /**
     * Utwórz nowy wiersz w tabeli części
     * @param {number|null} selectedPartId - ID wybranej części (dla edycji)
     * @param {number} quantity - Ilość części
     * @returns {HTMLTableRowElement} - Nowy wiersz tabeli
     */
    function createPartRow(selectedPartId = null, quantity = 1) {
        const tr = document.createElement('tr');

        // Generuj opcje select
        let optionsHtml = '<option value="">-- Wybierz część --</option>';
        availableParts.forEach(part => {
            const selected = part. id === selectedPartId ? 'selected' : '';
            optionsHtml += `
                <option value="${part.id}" 
                        data-quantity="${part.quantity}" 
                        data-price="${part.price}" 
                        ${selected}>
                    ${part.name}
                </option>`;
        });

        // Struktura wiersza
        tr. innerHTML = `
            <td>
                <select class="form-control part-select" required>
                    ${optionsHtml}
                </select>
            </td>
            <td>
                <input type="number" class="form-control quantity-input" 
                       value="${quantity}" min="1" required>
            </td>
            <td class="available-quantity">-</td>
            <td class="unit-price">0.00 zł</td>
            <td class="total-price">0.00 zł</td>
            <td>
                <button type="button" class="btn btn-danger btn-sm remove-part" title="Usuń część">
                    🗑️
                </button>
            </td>
        `;

        // Podepnij event listeners
        attachRowEvents(tr);

        // Jeśli jest wybrana część, zaktualizuj dane
        if (selectedPartId) {
            updateRowData(tr);
        }

        return tr;
    }

    /**
     * Podepnij event listenery do wiersza
     * @param {HTMLTableRowElement} row - Wiersz tabeli
     */
    function attachRowEvents(row) {
        const select = row. querySelector('.part-select');
        const quantityInput = row.querySelector('.quantity-input');
        const removeBtn = row.querySelector('.remove-part');

        // Zmiana wybranej części
        select.addEventListener('change', function() {
            updateRowData(row);
            updateTotal();
        });

        // Zmiana ilości
        quantityInput.addEventListener('input', function() {
            updateRowData(row);
            updateTotal();
        });

        // Usunięcie wiersza
        removeBtn.addEventListener('click', function() {
            if (confirm('Czy na pewno chcesz usunąć tę część?')) {
                row.remove();
                updateTotal();
            }
        });
    }

    /**
     * Aktualizuj dane w wierszu (dostępność, ceny)
     * @param {HTMLTableRowElement} row - Wiersz tabeli
     */
    function updateRowData(row) {
        const select = row. querySelector('.part-select');
        const quantityInput = row.querySelector('.quantity-input');
        const option = select.selectedOptions[0];

        // Jeśli nie wybrano części
        if (!option || !option. value) {
            row.querySelector('.available-quantity').textContent = '-';
            row.querySelector('.unit-price').textContent = '-';
            row.querySelector('.total-price').textContent = '-';
            return;
        }

        // Pobierz dane z atrybutów option
        const available = parseInt(option.dataset.quantity) || 0;
        const price = parseFloat(option.dataset. price) || 0;
        const quantity = parseInt(quantityInput.value) || 0;
        const total = price * quantity;

        // Zaktualizuj widok
        row.querySelector('.available-quantity').textContent = available;
        row.querySelector('.unit-price').textContent = price.toFixed(2) + ' zł';
        row.querySelector('.total-price').textContent = total.toFixed(2) + ' zł';

        // Walidacja - sprawdź czy jest dostępna ilość
        if (quantity > available) {
            quantityInput.classList.add('is-invalid');
            row.classList.add('table-danger');
        } else {
            quantityInput.classList. remove('is-invalid');
            row.classList.remove('table-danger');
        }
    }

    /**
     * Aktualizuj sumę całkowitą
     */
    function updateTotal() {
        let total = 0;

        document.querySelectorAll('#partsTableBody tr').forEach(row => {
            const totalPriceText = row.querySelector('.total-price').textContent;
            const price = parseFloat(totalPriceText.replace(' zł', '').replace(',', '.')) || 0;
            total += price;
        });

        const grandTotalElement = document.getElementById('grandTotal');
        if (grandTotalElement) {
            grandTotalElement.textContent = total.toFixed(2) + ' zł';
        }
    }

    /**
     * Przy submicie formularza - zbierz dane do JSON
     */
    orderForm.addEventListener('submit', function(e) {
        const parts = [];
        let hasErrors = false;

        document.querySelectorAll('#partsTableBody tr').forEach(row => {
            const select = row.querySelector('.part-select');
            const quantityInput = row.querySelector('.quantity-input');

            // Sprawdź czy wybrano część
            if (!select.value) {
                alert('Wybierz część dla każdego wiersza lub usuń pusty wiersz');
                hasErrors = true;
                e.preventDefault();
                return;
            }

            const quantity = parseInt(quantityInput. value);
            const available = parseInt(select.selectedOptions[0]. dataset.quantity);

            // Sprawdź dostępność
            if (quantity > available) {
                alert(`Niewystarczająca ilość:  ${select.selectedOptions[0]. text}\nDostępne:  ${available}, wybrano: ${quantity}`);
                hasErrors = true;
                e. preventDefault();
                return;
            }

            // Dodaj do listy
            parts.push({
                part_id: select. value,
                quantity: quantity
            });
        });

        // Jeśli są błędy, przerwij wysyłanie
        if (hasErrors) {
            e.preventDefault();
            return false;
        }

        // Zapisz JSON do ukrytego pola
        const partsDataInput = document.getElementById('partsData');
        if (partsDataInput) {
            partsDataInput.value = JSON. stringify(parts);
            console.log('Wysyłane dane części:', parts);
        }
    });

    /**
     * Inicjalizacja - podepnij eventy do istniejących wierszy
     */
    function initializeExistingRows() {
        document.querySelectorAll('#partsTableBody tr').forEach(row => {
            attachRowEvents(row);
            updateRowData(row);
        });
        updateTotal();
    }

    // Uruchom inicjalizację
    initializeExistingRows();

    console.log('Order parts manager zainicjalizowany');
});