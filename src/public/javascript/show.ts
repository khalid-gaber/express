

type products = {
    item: string,
    price: number,
    trader: string
}[]

function btnLoading(btn: HTMLElement) {
    btn.innerHTML = '.....';
    btn.parentElement?.classList.remove('rotate-90');
}

function btnReset(btn: HTMLElement) {
    btn.innerHTML = '>>';
    btn.parentElement?.classList.add('rotate-90');
}


function fetchMore(event: Event, size: string) {
    const len = document.querySelectorAll('table tr').length;
    if (len-1 < +size) {
        btnLoading(event.target as HTMLElement);
        setTimeout(() => {
            fetch(`/products/${len-1}`)
            .then(res => res.json())
            .then(json => handleProducts(json))    
        }, 1000);

        function handleProducts(products: products) {
            btnReset(event.target as HTMLElement);
            let tableFrag = document.createDocumentFragment();
            products.forEach((p, i)=>{
            let tr: any = document.createElement('tr');
            tr.classList.add('odd:bg-fuchsia-300/80');
                tr.innerHTML = `
                <td>${i+len}</td>
                <td>${p.item}</td>
                <td>${p.price}</td>
                <td>${p.trader}</td>`
                tableFrag.appendChild(tr)
            })
            document.querySelector('table tbody')?.appendChild(tableFrag);
            if (products.length+len-1 >= +size) {
            (((event.target as HTMLElement).parentElement) as HTMLElement).classList.add('hidden');
            }
        }
    } 
}

