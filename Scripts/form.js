const scriptURL = 'https://script.google.com/macros/s/AKfycbx904EuHgamp0TeaFw6fsVHW5PrF-3whxGOEwlD-JBf92cXzubafOPXnFic8jzoxTMo3w/exec'
const form = document.forms['contact-form']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            document.querySelector('.notification').style.display = 'block';
            setTimeout(function () {
                document.querySelector('.notification').style.display = 'none';
            }, 3000);
            form.reset();
        })
        .catch(error => {console.error('Error!', error.message)})
})