const mockItem = function(adder) {
  return [
    {
      id: 1 + adder,
      name: "Double Coat - Beige",
      image: require("./assets/images/double_coat_beige.webp"),
      image_flip: require("./assets/images/double_coat_beige_alt.webp"),
      description:
        "Perfetta fusione di funzionalità e stile, Double Coat nasce come vera e propria rivoluzione nel guardaroba maschile. Grazie ad un pratico gilet interno removibile, consente infatti di affrontare con eleganza condizioni climatiche differenti. Realizzato in tessuto spigato di lana misto cashmere, con taschino superiore e ampie tasche con patta, è un capo estremamente versatile che non rinuncia alle linee sartoriali.",
      sku: "53391390NANU808",
      isOnSale: false,
      price: 998,
      availability: true
    },
    {
      id: 2 + adder,
      name: "Double Coat - Black",
      image: require("./assets/images/double_coat_blue.webp"),
      image_flip: require("./assets/images/double_coat_blue_alt.webp"),
      description:
        "Perfetta fusione di funzionalità e stile, Double Coat nasce come vera e propria rivoluzione nel guardaroba maschile. Grazie ad un pratico gilet interno removibile, consente infatti di affrontare con eleganza condizioni climatiche differenti. Realizzato in tessuto spigato di lana misto cashmere, con taschino superiore e ampie tasche con patta, è un capo estremamente versatile che non rinuncia alle linee sartoriali.",
      sku: "53391390NANU808",
      isOnSale: false,
      price: 898,
      availability: false
    },
    {
      id: 3 + adder,
      name: "Double Coat - Brown",
      image: require("./assets/images/double_coat_brown.webp"),
      image_flip: require("./assets/images/double_coat_brown_alt.webp"),
      description:
        "Perfetta fusione di funzionalità e stile, Double Coat nasce come vera e propria rivoluzione nel guardaroba maschile. Grazie ad un pratico gilet interno removibile, consente infatti di affrontare con eleganza condizioni climatiche differenti. Realizzato in tessuto spigato di lana misto cashmere, con taschino superiore e ampie tasche con patta, è un capo estremamente versatile che non rinuncia alle linee sartoriali.",
      sku: "53391390NANU808",
      isOnSale: true,
      price: 898,
      availability: true
    },
    {
      id: 4 + adder,
      name: "Double Coat - Grey",
      image: require("./assets/images/double_coat_grey.webp"),
      image_flip: require("./assets/images/double_coat_grey_alt.webp"),
      description:
        "Perfetta fusione di funzionalità e stile, Double Coat nasce come vera e propria rivoluzione nel guardaroba maschile. Grazie ad un pratico gilet interno removibile, consente infatti di affrontare con eleganza condizioni climatiche differenti. Realizzato in tessuto spigato di lana misto cashmere, con taschino superiore e ampie tasche con patta, è un capo estremamente versatile che non rinuncia alle linee sartoriali.",
      sku: "53391390NANU808",
      isOnSale: false,
      price: 1100,
      availability: false
    }
  ];
};

function generateSeed(generator, clonesMultiplier) {
  let arrayToAlter = [];
  for (let index = 0; index < clonesMultiplier; index++) {
    const generatedID = index * clonesMultiplier;
    arrayToAlter = arrayToAlter.concat(generator(generatedID));
  }
  return arrayToAlter;
}

export const mocks = generateSeed(mockItem, 4);
