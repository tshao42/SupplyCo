'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: "Leica M10-R Rangefinder Camera (Black Chrome)",
      price: 8995.00,
      info: "40MP Full-Frame CMOS Sensor \nLeica Maestro II Image Processor \nOptical 0.73x - Magnification Viewfinder \n3.0\" 1.04m-Dot Touchscreen LCD"
    },
    {
      name: "Leica M10 Monochrom Rangefinder Camera",
      price: 8995.00,
      info: "40MP Full-Frame CMOS Sensor \nLeica Maestro II Image Processor \nOptical 0.73x - Magnification Viewfinder \n3.0\" 1.04m-Dot Touchscreen LCD \nISO 100-50000, Up to 4.5-fps Shooting \nLong Exposure Times to 16 Min \nStills- Only Operation \nBuilt - In Wi - Fi, for Use with FOTOS App \nWeather - Resistant Brass Construction"
    },
    {
      name: "Leica D-Lux 7 Digital Camera (Black)",
      price: 1395.00,
        info: "17MP Four Thirds MOS Sensor \nDC Vario- Summilux 3.1x Zoom Lens \n24 - 75mm(35mm Equivalent) \n2.76m - Dot Electronic Viewfinder \n3.0\" 1.24m-Dot Touchscreen LCD Monitor \nUHD 4K30p Video Recording \n11 - fps Shooting, Extended ISO 100 - 25600 \n4K Photo Modes, Post Focus \nBuilt - In Bluetooth and Wi - Fi \nIncluded CF D Flash Unit"
    },
    {
      name: "Leica Q2 Monochrom Digital Camera",
      price: 6195.00,
      info: '47.3MP Full-Frame B&W CMOS Sensor \nNo Color Array or Low Pass Filter \nMaestro II Image Processor \nSummilux 28mm f/ 1.7 ASPH.Lens \n3.68MP OLED Electronic Viewfinder \n3.0\" 1.04m-Dot Touchscreen LCD \nDCI 4K24p, UHD 4K30p, Full HD 120p Video \nISO 100 - 100, 000, up to 10 - fps Shooting \n35mm, 50mm, and 75mm Crop Modes \nBluetooth LE and Wi - Fi'
    },
    {
      name: "Leica TL2 Mirrorless Camera (Silver)",
      price: 2495.00,
        info: "24.2MP APS-C CMOS Sensor \nLeica Maestro II Image Processor \nUHD 4K30 and Full HD 1080p60 Video \nUp to 20 fps Shooting and ISO 50000 \n3.7\" 1.3m-Dot Touchscreen LCD Monitor \n49 - Point Contrast- Detect AF System \nElectronic Shutter Function: 1 / 40000 Sec \nMyCamera Menu; Faster Touch Controls \n32GB Memory and UHS - II SD Card Slot \nIntegrated Wi - Fi and USB 3.0 Type - C Port"
    }
  ], {});
    },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
