const locationUrl = location.href;
const title = document.getElementsByTagName('title')[0];
const inputs = document.querySelectorAll('input');
const h1 = document.querySelector('h1');
const mainTitle = h1 ? h1.textContent : "no main title";

const submits = document.querySelectorAll('[type="submit"]');

if(inputs){
    console.log("input tag");

    inputs.forEach(input => {
        // console.log(input.type, "type");
        // console.log(input.value, "value");
        console.log(input.name, "name");
        // console.log(input.id, "id");
    });

    submits.forEach(submit => {()=> handleSubmit(submit)});

    function handleSubmit(element){
        element.addEventListener('click', ()=>{
            console.log(element + ' is clicked');
        })
    }
}

console.log(mainTitle);