'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: "Leica M10-R Rangefinder Camera (Black Chrome)",
      price: 8995.00,
      info: "40MP Full-Frame CMOS Sensor \n Leica Maestro II Image Processor \n Optical 0.73x - Magnification Viewfinder \n 3.0\" 1.04m-Dot Touchscreen LCD"
    },
    {
      name: "Leica M10 Monochrom Rangefinder Camera",
      price: 8995.00,
      info: "40MP Full-Frame CMOS Sensor \n Leica Maestro II Image Processor \n Optical 0.73x - Magnification Viewfinder \n 3.0\" 1.04m-Dot Touchscreen LCD \n ISO 100-50000, Up to 4.5-fps Shooting \n Long Exposure Times to 16 Min \n Stills- Only Operation \n Built - In Wi - Fi, for Use with FOTOS App \n Weather - Resistant Brass Construction"
    },
    // {
    //   name: ,
    //   price: ,
    //   info:
    // },
    // {
    //   name: ,
    //   price: ,
    //   info:
    // },
    // {
    //   name: ,
    //   price: ,
    //   info:
    // }
  ], {});
    },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
