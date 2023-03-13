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

        const maxLength = 9;
        
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

// chart

const options = {
    series: [
      {
        name: "cambio",
        data: [
          {
            x: new Date("2018-02-12").getTime(),
            y: 5.18,
          },
          {
            x: new Date("2018-02-13").getTime(),
            y: 5.3,
          },
          {
            x: new Date("2018-02-14").getTime(),
            y: 5.18,
          },
          {
            x: new Date("2018-02-15").getTime(),
            y: 5.11,
          },
          {
            x: new Date("2018-02-16").getTime(),
            y: 5.18,
          },
          {
            x: new Date("2018-02-17").getTime(),
            y: 5.25,
          },
          {
            x: new Date("2018-02-18").getTime(),
            y: 5.18,
          },
          {
            x: new Date("2018-02-19").getTime(),
            y: 5.2,
          },
        ],
      },
    ],
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    yaxis: {
      min: 5,
      tickAmount: 4,
      labels: {
        formatter: (value) => {
          return value.toFixed(1).replace('.', ',')
        },
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    colors: ["#7C3AED"],
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return `<div class="tooltip">
      <span>${String(series[seriesIndex][dataPointIndex]).replace('.', ',')}</span>
      <span>${new Date(
        w.globals.seriesX[seriesIndex][dataPointIndex]
      ).toLocaleDateString("pt-BR", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })}</span>
      </div>`
      },
    },
  }
  
  const chart = new ApexCharts(document.querySelector("#chart"), options)
  chart.render()