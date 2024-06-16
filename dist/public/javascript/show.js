"use strict";
function btnLoading(btn) {
    var _a;
    btn.innerHTML = '.....';
    (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove('rotate-90');
}
function btnReset(btn) {
    var _a;
    btn.innerHTML = '>>';
    (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('rotate-90');
}
function fetchMore(event, size) {
    const len = document.querySelectorAll('table tr').length;
    if (len - 1 < +size) {
        btnLoading(event.target);
        setTimeout(() => {
            fetch(`/products/${len - 1}`)
                .then(res => res.json())
                .then(json => handleProducts(json));
        }, 1000);
        function handleProducts(products) {
            var _a;
            btnReset(event.target);
            let tableFrag = document.createDocumentFragment();
            products.forEach((p, i) => {
                let tr = document.createElement('tr');
                tr.classList.add('odd:bg-fuchsia-300/80');
                tr.innerHTML = `
                <td>${i + len}</td>
                <td>${p.item}</td>
                <td>${p.price}</td>
                <td>${p.trader}</td>`;
                tableFrag.appendChild(tr);
            });
            (_a = document.querySelector('table tbody')) === null || _a === void 0 ? void 0 : _a.appendChild(tableFrag);
            if (products.length + len - 1 >= +size) {
                (event.target.parentElement).classList.add('hidden');
            }
        }
    }
}
