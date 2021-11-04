const scrapeIt = require("scrape-it");
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

let cars = [
  "https://www.marktplaats.nl/v/auto-s/peugeot/m1768750194-peugeot-308-sw-1-2-e-thp-allure-panoramadak-navigatie?previousPage=lr",
];

const fields = ["Merk & Model", "Bouwjaar"];
const fieldsPredeFined = [
  "Merk & Model",
  "Bouwjaar",
  "Uitvoering",
  // 'Carrosserie',
  "Kenteken",
  "APK tot",
  "Brandstof",
  "Kilometerstand",
  "Transmissie",
  // 'Energielabel',
  "Verbruik",
  "Prijs",
  // 'Motorinhoud',
  // 'Garantie',
  "Topsnelheid",
  "Kosten p/m",
  // 'Vermogen',
  "Opties",
  // 'Kleur',
  "Aantal deuren",
  // 'Aantal stoelen',
  "Wegenbelasting",
  "Reparaties en onderhoud",
  "Banden",
  "Brandstof verbruik / maand",
  "Totale kosten per maand",
  // 'Per kilometer',
  "Per jaar",
  "APK vervaldatum",
  "Aantal eigenaren tot en met nu",
  // 'Eigenaar sinds',
  // 'Type laatste eigenaar',
  // 'Datum registratie Nederland',
  // 'Import auto',
  "Nieuwprijs vanaf",
  // 'Aantal cilinders',
  // 'Koppel',
  // 'Turbo',
  // 'Acceleratie 0-100',
  // 'LPG-g3',
  "Gemiddeld brandstof verbruik",
  // 'CO2-uitstoot',
  // 'Aandrijving',
  "Remmen voor",
  "Remmen achter",
  "url",
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
    title: ".Listing-title",
    price: ".Listing-price",
    dataTable: {
      selector: ".CarAttributes-root",
      listItem: ".CarAttributes-item",
      data: {
        key: "strong",
        value: "span",
      },
    },
    fields: {
      listItem: ".spec .key",
    },
  }).then(({ data, response }) => {
    console.log(`Status Code: ${response.statusCode}`);
    console.log(data);
    let newObject = {};
    newObject["url"] = car;
    data.dataTable.forEach((rowObject) => {
      if (rowObject.key === "Opties:") {
        let options = rowObject.value.split("\n");
        let newOptions = [];
        options.forEach((option) => {
          newOptions.push(option.replace(/\s+/g, ""));
        });
        if (!fields.includes("Opties")) {
          fields.push("Opties");
        }
        newObject["Opties"] = newOptions;
      } else {
        if (!fields.includes(rowObject.key.replace(":", ""))) {
          fields.push(rowObject.key.replace(":", ""));
        }
        newObject[rowObject.key.replace(":", "")] = rowObject.value
          .replace("€ ", "")
          .replace(" km/l", "");
      }
    });
    table.push(newObject);
    if (table.length == cars.length) {
      //   table.forEach((row) => {
      //     if (row.hasOwnProperty("Opties")) {
      //       let filteredArray = row.Opties.filter(function (e) {
      //         return e;
      //       });
      //       row.Opties = filteredArray.join(" , ");
      //     }
      //   });
      const json2csvParser = new Json2csvParser({
        fields: fieldsPredeFined,
        delimiter: ";",
      });
      const csv = json2csvParser.parse(table);

      fs.writeFile("cars.csv", csv, function (err) {
        if (err) throw err;
        console.log("CSV generated");
      });
    }
  });
});
