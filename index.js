const scrapeIt = require("scrape-it")
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');


let cars = [
    "https://www.marktplaats.nl/a/auto-s/peugeot/m1359760299-peugeot-108-1-0evti-active.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr", "https://www.marktplaats.nl/a/auto-s/alfa-romeo/m1357267299-alfa-romeo-mito-0-9-twinair-distinctive-bj-2012-6-bak-lmv.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr"
];

const fields = ['Merk & Model', 'Bouwjaar'];
const fieldsPredeFined = [
    'Merk & Model',
    'Bouwjaar',
    'Uitvoering',
    // 'Carrosserie',
    'Kenteken',
    'APK tot',
    'Brandstof',
    'Kilometerstand',
    'Transmissie',
    // 'Energielabel',
    'Verbruik',
    'Prijs',
    // 'Motorinhoud',
    // 'Garantie',
    'Topsnelheid',
    'Kosten p/m',
    // 'Vermogen',
    'Opties',
    // 'Kleur',
    'Aantal deuren',
    // 'Aantal stoelen',
    'Wegenbelasting',
    'Reparaties en onderhoud',
    'Banden',
    'Brandstof verbruik / maand',
    'Totale kosten per maand',
    // 'Per kilometer',
    'Per jaar',
    'APK vervaldatum',
    'Aantal eigenaren tot en met nu',
    // 'Eigenaar sinds',
    // 'Type laatste eigenaar',
    // 'Datum registratie Nederland',
    // 'Import auto',
    'Nieuwprijs vanaf',
    // 'Aantal cilinders',
    // 'Koppel',
    // 'Turbo',
    // 'Acceleratie 0-100',
    // 'LPG-g3',
    'Gemiddeld brandstof verbruik',
    // 'CO2-uitstoot',
    // 'Aandrijving',
    'Remmen voor',
    'Remmen achter',
    // 'Lengte',
    // 'Breedte',
    // 'Hoogte',
    // 'Wielbasis',
    // 'Tankinhoud',
    // 'Kofferbakinhoud min. - max.',
    // 'Leeg gewicht',
    // 'Max. toelaatbaar gewicht',
    // 'Gewicht aanhanger geremd',
    // 'Gewicht aanhanger ongeremd'
];

let table = [];


cars.forEach((car) => {
    scrapeIt(car, {
        title: ".header h1",
        price: ".header .price",
        dataTable: {
            selector: ".car-feature-table",
            listItem: '.spec',
            data: {
                key: '.key',
                value: '.value'
            }
        },
        priceTable: {
            selector: ".car-feature-table",
            listItem: '.row',
            data: {
                key: '.key',
                value: '.value'
            }
        },
        fields: {
            listItem: '.spec .key'
        }
    }).then(({
        data,
        response
    }) => {
        console.log(`Status Code: ${response.statusCode}`)
        let newObject = {};
        data.dataTable.forEach(rowObject => {
            if (rowObject.key === 'Opties:') {
                let options = rowObject.value.split('\n');
                let newOptions = [];
                options.forEach((option) => {
                    newOptions.push(option.replace(/\s+/g, ''));
                });
                if (!fields.includes('Opties')) {
                    fields.push('Opties');
                }
                newObject['Opties'] = newOptions;
            } else {
                if (!fields.includes(rowObject.key.replace(':', ''))) {
                    fields.push(rowObject.key.replace(':', ''));
                }
                newObject[rowObject.key.replace(':', '')] = rowObject.value.replace('€ ', '').replace(' km/l', '');
            }
        });

        data.priceTable.forEach(rowObject => {
            if (rowObject.key === 'Opties:') {
                let options = rowObject.value.split('\n');
                let newOptions = [];
                options.forEach((option) => {
                    newOptions.push(option.replace(/\s+/g, ''));
                });
                if (!fields.includes('Opties')) {
                    fields.push('Opties');
                }
                newObject['Opties'] = newOptions;
            } else {
                if (!rowObject.key.includes("\n")) {
                    if (!fields.includes(rowObject.key.replace(':', ''))) {
                        fields.push(rowObject.key.replace(':', ''));
                    }
                    newObject[rowObject.key.replace(':', '')] = rowObject.value.replace('€ ', '').replace(' km/l', '');
                }
            }
        });
        table.push(newObject);
        if (table.length == cars.length) {
            table.forEach((row)=>{
                let filteredArray = row.Opties.filter(function(e){return e}); 
                row.Opties = filteredArray.join(' , ');
            });
            const json2csvParser = new Json2csvParser({
                fields: fieldsPredeFined,
                delimiter: ';'
            });
            const csv = json2csvParser.parse(table);

            fs.writeFile('cars.csv', csv, function (err) {
                if (err) throw err;
                console.log('CSV generated');
            });
        }
    })
});