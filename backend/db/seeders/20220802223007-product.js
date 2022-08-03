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
    {
      name: "Leica D-Lux 7 Digital Camera (Black)",
      price: 1395.00,
        info: "17MP Four Thirds MOS Sensor \n DC Vario- Summilux 3.1x Zoom Lens \n 24 - 75mm(35mm Equivalent) \n 2.76m - Dot Electronic Viewfinder \n3.0\" 1.24m-Dot Touchscreen LCD Monitor \n UHD 4K30p Video Recording \n 11 - fps Shooting, Extended ISO 100 - 25600 \n 4K Photo Modes, Post Focus \n Built - In Bluetooth and Wi - Fi \n Included CF D Flash Unit"
    },
    {
      name: "Leica Q2 Monochrom Digital Camera",
      price: 6195.00,
      info: '47.3MP Full-Frame B&W CMOS Sensor \n No Color Array or Low Pass Filter \n Maestro II Image Processor \n Summilux 28mm f/ 1.7 ASPH.Lens \n 3.68MP OLED Electronic Viewfinder \n 3.0\" 1.04m-Dot Touchscreen LCD \n DCI 4K24p, UHD 4K30p, Full HD 120p Video \n ISO 100 - 100, 000, up to 10 - fps Shooting \n 35mm, 50mm, and 75mm Crop Modes \n Bluetooth LE and Wi - Fi'
    },
    {
      name: "Leica TL2 Mirrorless Camera (Silver)",
      price: 2495.00,
        info: "24.2MP APS-C CMOS Sensor \n Leica Maestro II Image Processor \n UHD 4K30 and Full HD 1080p60 Video \n Up to 20 fps Shooting and ISO 50000 \n 3.7\" 1.3m-Dot Touchscreen LCD Monitor \n 49 - Point Contrast- Detect AF System \n Electronic Shutter Function: 1 / 40000 Sec \n MyCamera Menu; Faster Touch Controls \n 32GB Memory and UHS - II SD Card Slot \n Integrated Wi - Fi and USB 3.0 Type - C Port"
    }
  ], {});
    },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
