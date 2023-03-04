const currencyUSD = document.querySelector('#currency')
const resultScreen = document.querySelector('.result')

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

window.addEventListener('load', () => {
    if(currencyUSD.value == '') {
        resultScreen.innerHTML = 'R$ 0,00'
    }
})

async function calculate() {
    const valueDollarToday = await formatingValueDollar()

    currencyUSD.addEventListener('input', () => {
        const inputValue = currencyUSD.value
        const resultInReal = (valueDollarToday * inputValue).toFixed(2)
        const resultInRealFormatted = parseFloat(resultInReal).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})

        resultScreen.innerHTML = resultInRealFormatted
    })
}

calculate()
