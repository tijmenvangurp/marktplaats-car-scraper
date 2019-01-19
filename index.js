const scrapeIt = require("scrape-it")
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');


let cars = [
    "https://www.marktplaats.nl/a/auto-s/peugeot/m1359760299-peugeot-108-1-0evti-active.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr", "https://www.marktplaats.nl/a/auto-s/alfa-romeo/m1357267299-alfa-romeo-mito-0-9-twinair-distinctive-bj-2012-6-bak-lmv.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/peugeot/m1359929180-peugeot-108-1-0-e-vti-access-peugeot-dealer-oh-nap-6-mnd-g.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/opel/m1359976550-opel-corsa-1-0-turbo-edition-airco-cruise-2x-pdc-multimedia.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr", "https://www.marktplaats.nl/a/auto-s/volkswagen/m1363368064-volkswagen-polo-1-0-mpi-44kw-3d-bmt-2015-blauw.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr", "https://www.marktplaats.nl/a/auto-s/alfa-romeo/m1357389979-alfa-romeo-mito-0-9-twinair-business-executive-full-option.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/nissan/m1360963658-nissan-note-1-2-key-less-clima-navigatie-verstralers.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/citroen/m1364833527-citroen-ds3-1-2-vti-chic.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/citroen/m1363003761-citroen-c3-1-0-vti-2013-i-nap-i-airco-i-led-i-bluetooth-i.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/peugeot/m1361941217-peugeot-208-1-0-vti-access-1e-eigenaar-58-000km-n-a-p.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/peugeot/m1358764847-peugeot-208-1-2-vti-active.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr", "https://www.marktplaats.nl/a/auto-s/peugeot/m1357247544-peugeot-208-1-0-vti-50kw-access-bj-2014.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr", "https://www.marktplaats.nl/a/auto-s/toyota/m1362732270-toyota-yaris-1-0-vvt-i-comfort-5deurs-centraal-elec-nwtype-6.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/fiat/m1357152684-fiat-punto-0-9-twinair-easy-85pk-5-d-ecc-lm-velgen-6-versn.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/fiat/m1356842589-fiat-punto-0-9-twinair-pop-zeer-nette-auto-lage-kilometer.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/fiat/m1365650271-fiat-punto-evo-0-9-twinair-easy-bj-2013.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/renault/m1364157919-renault-clio-0-9-tce-expression-airco-5deurs.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/volkswagen/m1362147750-volkswagen-golf-1-4-55kw-higline-veel-optie-s-60-auto-op-si.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/suzuki/m1360115161-suzuki-swift-1-3-exclusive-airco-key-less-entry-start-99dk.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/suzuki/m1356239877-suzuki-swift-1-3-bandit.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/kia/m1360405552-kia-rio-1-2-comfort-pack-airco-elek-ramen.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/kia/m1363365939-kia-rio-1-2-cvvt-plus-pack-airco-led-mooie-auto-bj-2012.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/hyundai/m1357057868-hyundai-i20-1-2i-airco-elecramen-bj-2013.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/mitsubishi/m1363621060-mitsubishi-space-star-1-0-mpi-bj2013-zwart-airco-elek-pakket.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/lancia/m1362427575-lancia-ypsilon-0-9-twinair-85pk-start-stop-2013-zwart.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/lancia/m1365546824-lancia-ypsilon-0-9-twinair-elefantino-bj-2014.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/lancia/m1364275993-lancia-ypsilon-0-9-twinair-gold.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/ford/m1357943153-ford-focus-1-0-ecoboost-lease-trend-navigatie-bluetooth.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/ford/m1363395494-ford-focus-1-0-ecoboost-100pk-econetic-titanium-zeer-mooie-f.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/ford/m1356515634-ford-fiesta-1-0-style-80-pk-navigatie-n-a-p-inruil-mogelijk.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr","https://www.marktplaats.nl/a/auto-s/ford/m1359057886-ford-fiesta-1-0-benzine-facelift-5drs-2013-airco-nap-garan.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr"
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
    'url'
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
        newObject['url'] = car;
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
                if (row.hasOwnProperty('Opties')) {
                    let filteredArray = row.Opties.filter(function(e){return e}); 
                    row.Opties = filteredArray.join(' , ');
                }
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