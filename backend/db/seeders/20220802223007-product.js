'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: "FUJIFILM INSTAX Mini 90 Neo Classic Instant Camera (Brown)",
      price: 169.95,
      info: ""
    },
    {
      name: "FUJIFILM INSTAX MINI 40 Instant Film Camera",
      price: 99.95,
      info: ""
    },
    {
      name: "FUJIFILM INSTAX MINI 11 Instant Film Camera (Ice White)",
      price: 76.95,
        info: ""
    },
    {
      name: "Polaroid Now Instant Film Camera Everything Box (Black)",
      price: 146.95,
      info: ""
    },
    {
      name: "Lomography Lomo'Instant Wide Black Camera and Lenses",
      price: 199.00,
        info: ""
    },
    {
      name: "Mint Camera InstantFlex TL70 2.0 Instant Film Camera",
      price: 399.00,
      info: ""
    },
    {
      name: "Kodak PRINTOMATIC 5MP Instant Digital Camera (Gray)",
      price: 49.99,
      info: ""
    },
    {
      name: "Polaroid GO Instant Film Camera (White)",
      price: 86.42,
      info: ""
    },
    {
      name: "Polaroid Now Instant Film Camera (Yellow)",
      price: 102.30,
      info: ""
    },
    {
      name: "FUJIFILM INSTAX SQUARE SQ1 Instant Film Camera (Glacier Blue)",
      price: 119.95,
      info: ""
    },
    {
      name: "Mint Camera SLR670-X ZERO Instant Camera",
      price: 999.00,
      info: ""
    },
    {
      name: "FUJIFILM INSTAX MINI Instant Film (100 Exposures)",
      price: 69.90,
      info: ""
    },
    {
      name: "FUJIFILM INSTAX SQUARE Instant Film (20 Exposures)",
      price: 18.83,
      info: ""
    },
    {
      name: "Polaroid Color 600 Instant Film (8 Exposures)",
      price: 19.99,
      info: ""
    },
    {
      name: "Polaroid Black & White 600 Instant Film (8 Exposures)",
      price: 19.99,
      info: ""
    },
    {
      name: "Polaroid Black & White i-Type Instant Film (8 Exposures)",
      price: 16.99,
      info: ""
    },
    {
      name: "Polaroid Color i-Type Instant Film (8 Exposures)",
      price: 16.98,
      info: ""
    },
    {
      name: "FUJIFILM INSTAX Wide Instant Film (20 Exposures)",
      price: 18.65,
      info: ""
    },
    {
      name: "OP/TECH USA Cam Strap-QD (Red)",
      price: 11.35,
      info: ""
    },
    {
      name: "Moment MTW Fanny Sling 2020 (Black, Ripstop Nylon)",
      price: 69.99,
      info: ""
    }
  ], {});
    },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
