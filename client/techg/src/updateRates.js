import fs from 'fs'
import fetch from 'node-fetch'

async function updateRates() {
    try {
        const date = new Date().toDateString()
        const res = await fetch("https://v6.exchangerate-api.com/v6/e53888c0183250d22f07f553/latest/EUR")
        const data = await res.json()

        console.log(data)

        const rates = {
            LAST_UPDATED: date,
            EUR: 1,
            GBP: data.conversion_rates.GBP.toFixed(2),
            CHF: data.conversion_rates.CHF.toFixed(2),
            NOK: data.conversion_rates.NOK.toFixed(2),
            SEK: data.conversion_rates.SEK.toFixed(2),
            DKK: data.conversion_rates.DKK.toFixed(2),
            ISK: data.conversion_rates.ISK.toFixed(2),
            CZK: data.conversion_rates.CZK.toFixed(2),
            PLN: data.conversion_rates.PLN.toFixed(2),
            HUF: data.conversion_rates.HUF.toFixed(2),
            RON: data.conversion_rates.RON.toFixed(2),
            RON: data.conversion_rates.RON.toFixed(2),
            BGN: data.conversion_rates.BGN.toFixed(2),
            RSD: data.conversion_rates.RSD.toFixed(2),
            MKD: data.conversion_rates.MKD.toFixed(2),
            ALL: data.conversion_rates.ALL.toFixed(2),
            BAM: data.conversion_rates.BAM.toFixed(2),
            MDL: data.conversion_rates.MDL.toFixed(2),
            UAH: data.conversion_rates.UAH.toFixed(2),
            BYN: data.conversion_rates.BYN.toFixed(2),
            RUB: data.conversion_rates.RUB.toFixed(2),
            GIP: data.conversion_rates.GIP.toFixed(2),
            JEP: data.conversion_rates.JEP.toFixed(2),
            GGP: data.conversion_rates.GGP.toFixed(2),
        }

        fs.writeFileSync('./exchangeRates.json', JSON.stringify(rates, null, 2))
        console.log("EXCHANGE RATES UPDATED: ", rates)

    } catch (err) {
        console.log(err)
    }
}

updateRates()