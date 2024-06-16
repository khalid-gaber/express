function handleChange (e: Event) {
    if ((e.target as HTMLInputElement).name === 'tags'){
        (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.split(',').map( e => e.trim()).join();
    } else {
        (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.trim();
    }
}


// const schema = joi.object({
//     item: joi.string().alphanum(),
//     trader: joi.string().pattern(new RegExp('/^[A-Z]\w+\s[A-Z]\w+$/g')),
//     stock: joi.number().integer().min(0),
//     price: joi.number().min(1),
//     tags: [joi.string().alphanum()]
// })

function handleSubmit(this: HTMLFormElement, e: Event) {
    e.preventDefault();
    let isValid = true;
    let formFragment: DocumentFragment | HTMLFormElement  = document.createDocumentFragment() ;
    formFragment = this?.cloneNode(true) as HTMLFormElement;

    //adding form events to the new form 
    formFragment.addEventListener('submit', handleSubmit);
    formFragment.addEventListener('change', handleChange);

    for (let i=0; i<this.length; i++) {
        switch((this[i] as HTMLInputElement).name) {
            case 'item': {
                //stting to the default form 
                formFragment['item'].parentElement.classList.remove('success', 'error');
                formFragment['item'].parentElement.querySelector('.input-container>span').innerHTML = 'valid';

                //validating forms input
                if((this[i] as HTMLInputElement).value) {
                    formFragment['item'].parentElement.classList.add('success')
                } else {
                    isValid = false;
                    formFragment['item'].parentElement.classList.add('error');
                    formFragment['item'].parentElement.querySelector('.input-container>span').innerHTML = 'invalid: this field is required';
                }
                break;
            }
            case 'trader': {
                //stting to the default form 
                formFragment['trader'].parentElement.classList.remove('success', 'error');
                formFragment['trader'].parentElement.querySelector('.input-container>span').innerHTML = 'valid';

                //validating forms input
                if((this[i] as HTMLInputElement).value) {
                    if(/^[A-Z]\w+\s[A-Z]\w+$/g.test((this[i] as HTMLInputElement).value)){
                        formFragment['trader'].parentElement.classList.add('success')
                    } else {
                        isValid = false;
                        formFragment['trader'].parentElement.classList.add('error');
                        formFragment['trader'].parentElement.querySelector('.input-container>span').innerHTML = 'invalid: please enter a valid first and last name';    
                    }
                } else {
                    isValid = false;
                    formFragment['trader'].parentElement.classList.add('error');
                    formFragment['trader'].parentElement.querySelector('.input-container>span').innerHTML = 'invalid: this field is required';
                }
                break;
            }
            case 'stock': {
                //stting to the default form 
                formFragment['stock'].parentElement.classList.remove('success', 'error');
                formFragment['stock'].parentElement.querySelector('.input-container>span').innerHTML = 'valid';

                //validating forms input
                if(!(this[i] as HTMLInputElement).value || +(this[i] as HTMLInputElement).value > 0) {
                    formFragment['stock'].parentElement.classList.add('success');
                } else {
                    isValid = false;
                    formFragment['stock'].parentElement.classList.add('error');
                    formFragment['stock'].parentElement.querySelector('.input-container>span').innerHTML = 'invalid: enter a positive integer number';
                }
                break;
            }
            case 'price': {
                //stting to the default form 
                formFragment['price'].parentElement.classList.remove('success', 'error');
                formFragment['price'].parentElement.querySelector('.input-container>span').innerHTML = 'valid';

                //validating forms input
                if(!(+(this[i] as HTMLInputElement).value < 1) || !this['stock'].value) {
                    formFragment['price'].parentElement.classList.add('success')
                } else {
                    isValid = false;
                    formFragment['price'].parentElement.classList.add('error');
                    formFragment['price'].parentElement.querySelector('.input-container>span').innerHTML = 'invalid: when you fill the stock, then the price be required';
                }
                break;
            }
            case 'tags': {
                //stting to the default form 
                formFragment['tags'].parentElement.classList.remove('success', 'error');
                formFragment['tags'].parentElement.querySelector('.input-container>span').innerHTML = 'valid';

                //validating forms input
                if((this[i] as HTMLInputElement).value) {
                    formFragment['tags'].parentElement.classList.add('success')
                } else {
                    isValid = false;
                    formFragment['tags'].parentElement.classList.add('error');
                    formFragment['tags'].parentElement.querySelector('.input-container>span').innerHTML = 'invalid: please enter at least one tag';
                }
                break;
            }
        }
    }

    if(isValid){
        document.querySelector('form.form')?.parentElement?.replaceChild(formFragment, document.querySelector('form.form') as HTMLFormElement);
        formFragment.submit();
    } else {
        document.querySelector('form.form')?.parentElement?.replaceChild(formFragment, document.querySelector('form.form') as HTMLFormElement);
    }
}

document.querySelector<HTMLFormElement>('form.form')?.addEventListener('change', handleChange)

document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('form.form')?.addEventListener('submit', handleSubmit)
})

// document.querySelector('form.form')?.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     // console.log(document.querySelector<HTMLInputElement>('#product')?.name);
//     let data = {
//         item: (e.target as HTMLFormElement)['item'].value,
//         trader: (e.target as HTMLFormElement)['trader'].value,
//         stock: (e.target as HTMLFormElement)['stock'].value,
//         price: (e.target as HTMLFormElement)['price'].value,
//         tags: (e.target as HTMLFormElement)['tags'].value,
//     }

//     // const {value, error} = schema.validate(data)
// })



