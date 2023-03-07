const currency = document.querySelector('#currency')
const resultScreen = document.querySelector('.result')
const inverterCurrencyBtn = document.querySelector('.middle')
const countryLeftSide = document.querySelector('.left .country')
const countryRightSide = document.querySelector('.right .country')

window.addEventListener('load', () => {
    if(currency.value == '') {
        resultScreen.innerHTML = 'R$ 0,00'
    }
})

async function getValueDollar() {
    const url = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
    const getInfo = await url.json()
    const getValueDollarToday = getInfo.USDBRL.bid

    return getValueDollarToday
}

async function formatingValueDollar() {
    const callGetValueDollarFunction = await getValueDollar()
    
    const valueDollarWithTwoDecimals = parseFloat(callGetValueDollarFunction).toFixed(2)
    const valueDollarFormatted = parseFloat(valueDollarWithTwoDecimals)

    return valueDollarFormatted
}

async function calculate() {
    const valueDollarToday = await formatingValueDollar()

    currency.addEventListener('input', calculateDollarToReal)
    function calculateDollarToReal() {
        const inputValue = currency.value
        const resultInReal = (valueDollarToday * inputValue).toFixed(2)
        const resultInRealFormatted = parseFloat(resultInReal).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        })

        const maxLength = 10;
        
        if (currency.value.length > maxLength) {
            currency.value = currency.value.slice(0, maxLength); // Extrai os primeiros maxLength caracteres do valor do campo
        }

        resultScreen.innerHTML = resultInRealFormatted
    }


    inverterCurrencyBtn.addEventListener('click', inverterCurrency)
    function inverterCurrency() {
        currency.classList.toggle('brl')
        currency.value = ''
        resultScreen.innerHTML = ''

        const brazilCountry = `
        <img src="./assets/brazil-flag.svg" alt="Ícone da bandeira do Brasil">
        <span class="country-currency">BRL</span>
        `
        const usaCountry = `
        <img src="./assets/usa-flag.svg" alt="Ícone da bandeira dos Estados Unidos da Ámerica">
        <span class="country-currency">USD</span>
        `

        if(currency.classList.contains('brl')) {
            countryLeftSide.innerHTML = brazilCountry
            countryRightSide.innerHTML = usaCountry

            if(currency.value == '') {
                resultScreen.innerHTML = '$ 0.00'
            }

            currency.addEventListener('input', calculateRealToDollar)
            function calculateRealToDollar() {
                const inputValue = currency.value
                const resultInDollar = (inputValue / valueDollarToday).toFixed(2)
                const resultInDollarFormatted = parseFloat(resultInDollar).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })
        
                resultScreen.innerHTML = resultInDollarFormatted
            }
            
        } else {
            countryLeftSide.innerHTML = usaCountry
            countryRightSide.innerHTML = brazilCountry

            if(currency.value == '') {
                resultScreen.innerHTML = 'R$ 0,00'
            }

            currency.addEventListener('input', () => {
                calculateDollarToReal()
            })
        }
    }
}

calculate()
