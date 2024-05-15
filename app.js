// url : "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json"

let dropdowns = document.querySelectorAll(".dropdown select");
let button = document.querySelector("button");
let currency_URL = "https://latest.currency-api.pages.dev/v1/currencies/usd.json";
let fromCountry = 'USD';
let toCountry = 'INR';

/* for(code in countryList){
    console.log(code, countryList[code]);
} */

for(let select of dropdowns){

    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = "selected";
        }
        else if(select.name === 'to' && currCode === 'INR'){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target, select.name);
    });
}

const updateFlag = (element, selectName) => {
    //console.log(element);
    let currCode = element.value;
    //console.log(currCode);

    if(selectName === 'from'){
        fromCountry = currCode;
        currency_URL = `https://latest.currency-api.pages.dev/v1/currencies/${fromCountry.toLowerCase()}.json`;
    }
    else if(selectName === 'to')
        toCountry = currCode;
    
    let countryCode = countryList[currCode];
    
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

    //console.log(fromCountry, toCountry);
}


button.addEventListener("click", async (event) => {
    event.preventDefault();
    //console.log(fromCountry, toCountry);
    let amount = document.querySelector("#textField").value;

    let resultAmount = (await getValues(toCountry)) * amount; // this await is very important

    let messege = document.querySelector(".msg");

    messege.innerText = `${amount} ${fromCountry} = ${resultAmount.toFixed(2)} ${toCountry}`;
});


async function getValues(toCountry){
    let response = await fetch(currency_URL);
    let data = await response.json();
    const values = Object.values(data);

    //console.log(values[1][toCountry.toLowerCase()]);
    return values[1][toCountry.toLowerCase()];
}