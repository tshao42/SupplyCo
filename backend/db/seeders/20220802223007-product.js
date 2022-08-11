'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: "FUJIFILM INSTAX Mini 90 Neo Classic Instant Camera (Brown)",
      price: 169.95,
      info: "The Instax Mini 90 Neo Classic combines a premium build quality with a stylish, retro camera design that offers a full range of camera functions. Featuring a variety of new shooting modes, the Instax Mini 90 now includes double exposure and macro modes for users who want to express their photographic creativity with beautiful image quality."
    },
    {
      name: "FUJIFILM INSTAX MINI 40 Instant Film Camera",
      price: 99.95,
      info: "Make a statement with your style with the INSTAX MINI 40 instant camera. The INSTAX MINI 40 is pumped with attitude for today’s new generation of image makers and shot takers. Combining “fast to action” features with classic design cues and the use of INSTAX MINI instant film, it’ll keep you one shot ahead of the rest. The INSTAX MINI 40 is ready to hit the streets running thanks to its built-in selfie mode. Pull out the lens for an extra click, line yourself up in the mirror and capture your style in a one-of-a-kind selfie. With the power of automatic exposure, the camera automatically calculates the brightness of the environment you’re in, so what you see is what you get, every shot, every time. All this packaged up in a timeless and epic silhouette. We’ve even edged the design with premium silver accents, and added a deluxe black texture that is sensational to touch. We’ve gone all out to propel the INSTAX MINI 40 into a league of its own."
    },
    {
      name: "FUJIFILM INSTAX MINI 11 Instant Film Camera (Ice White)",
      price: 76.95,
      info: "Meet the INSTAX Mini 11 Instant Camera: the successor to the INSTAX Mini 9 Instant Camera. With its new Automatic Exposure function, there is no need to adjust a dial anymore to take photos based on your lighting. Just snap and shoot. Take the perfect selfie with the Mini 11’s Selfie Mode that allows you to get up close and personal with its built-in macro mode and selfie mirror. The camera also includes 2 fun shutter button accessories that can be attached to the shutter button to customize the camera’s look. The Mini 11 will be available in 5 colors: Sky Blue, Lilac Purple, Ice White, Charcoal Gray and Blush Pink. Expressing yourself has never been easier with the Mini 11."
    },
    {
      name: "Polaroid Now Instant Film Camera Everything Box (Black)",
      price: 146.95,
      info: "Polaroid’s new point-and-shoot analog instant camera has all you need to catch every life moment in an original Polaroid photograph. Now with autofocus, it’s simple to capture moments as you see them, so you can relive them forever in sharp, vivid color. Frame two moments in one with double exposure, or get yourself in the picture with self-timer and an accurate flash to make everyone look like they should. Available in 7 colors. Development time: 10-15 minutes. Not compatible with vintage Polaroid cameras."
    },
    {
      name: "Lomography Lomo'Instant Wide Black Camera and Lenses",
      price: 199.00,
        info: "The most versatile instant camera with 3 clever shooting modes.3 Shooting Modes To Cover Every Kind Of Instant. An Ultra- Advanced Lens System. The Largest Aperture Setting in the Instant Photography World and------Sh-o-o-o-t L-o-o-o-o-o-ng Exposures, Shoot Unlimited Multiple Exposures"
    },
    {
      name: "Mint Camera InstantFlex TL70 2.0 Instant Film Camera",
      price: 399.00,
      info: "InstantFlex TL70 is the world's first twin lens instant camera with wide range of apertures and the closest focusing distance. lt combines classic aesthetics and modern functionalities by including 6 groundbreaking features for you to explore. TL70 allows you to take pictures in all lighting conditions with a built in electric flash, opening up a world of creative possibilities. lt is compatible with all Fujifilm Instax Mini films. Apertures: f/5.6, f/8, f/16, f/22, f/bokeh Lens: 3 elements, aspherical lenses, f=61mm Focusing distance: 48cm to infinity (manual focus) Shutter speed: 1/500 to 1 sec (A mode), maximum 10 secs (B mode - slow shutter) Flash: Built-in electric flash with Automatic Light Emission Control Exposure control: EV Battery: 3 AA Batteries (included) Film: Fuji instax mini films Adapters: Tripod mount and neck strap holder Dimension: 141mm x 102mm x 80.2mm Weight: 525g (camera only) Box set contents: TL70 Camera, Lens Cap, 3AA Batteries, The World of InstantFlex and User Guide"
    },
    {
      name: "Kodak PRINTOMATIC 5MP Instant Digital Camera (Gray)",
      price: 49.99,
      info: "Forget computers. Forget cumbersome printers. The Kodak printomatic Camera prints smudge-proof, water- and tear-resistant photos up to 10 MP automatically. Just point, shoot and print. Perfect to take on the go, whenever you want to share prints, The Kodak printomatic is the easiest, funniest way to share photos with friends. Your prints are even adhesive-backed, so you can get creative and use the photos to decorate, just as you would any sticker. The Camera speed even allows you to continue shooting while your photo is printing. The camera's zero Ink technology means you don't need to worry about messy print cartridges, film or toner. Enjoy a built-in flash and two picture modes, both color and black and white. Add a neck strap for easy handling and use the Micro SD slot for additional memory."
    },
    {
      name: "Polaroid GO Instant Film Camera (White)",
      price: 86.42,
      info: "Oh, the places you’ll go! And the times you’ll share and treasure, all captured with your Polaroid Go. Pocket-sized and built to go go go wherever adventure takes you. Get to know a more grownup instant camera featuring artful double exposure, selfie mirror, and a self-timer for the days you step inside the frame."
    },
    {
      name: "Polaroid Now Instant Film Camera (Yellow)",
      price: 102.30,
      info: "Polaroid’s new point-and-shoot analog instant camera has all you need to catch every life moment in an original Polaroid photograph. Now with autofocus, it’s simple to capture moments as you see them, so you can relive them forever in sharp, vivid color. Frame two moments in one with double exposure, or get yourself in the picture with self-timer and an accurate flash to make everyone look like they should. Available in 7 colors."
    },
    {
      name: "FUJIFILM INSTAX SQUARE SQ1 Instant Film Camera (Glacier Blue)",
      price: 119.95,
      info: "The Instax Square SQ1 is the latest instant camera within the Instax square lineup from Fujifilm. It is the perfect tool for users who want to be creative and use instant photos to express themselves and their everyday moments on a square film format. The 1: 1 square format Instax square SQ1 captures the beauty in each and every moment, so that you can cherish those memories for a lifetime. With square format, there's no need to waste a precious moment deciding whether to capture it in portrait or landscape - just pick up the camera and snap. And at 1.5x the size of Instax Mini prints, there's plenty of room to set the scene."
    },
    {
      name: "Mint Camera SLR670-X ZERO Instant Camera",
      price: 999.00,
      info: "ZERO – in keeping with the original idea of Dr Edwin Land, the mastermind behind the SX-70, goes right back to the drawing board. Compared to the original blueprint, the most questionable aberration is ditching the ground glass focusing in favor of the split-circle that you see in most of today's SX-70s. Dr Land insisted that the ground glass was superior to the split-circle, because it didn't interrupt the photographer. It allows you to concentrate on configuring the picture as a whole, facilitating your visual mind for better composition."
    },
    {
      name: "FUJIFILM INSTAX MINI Instant Film (100 Exposures)",
      price: 69.90,
      info: "This film features vivid color reproduction with natural skin tones when used under daylight (5500K) or electronic flash lighting conditions. A refined grain structure provides high image sharpness and clarity as well as a versatile ISO 800 film speed for use with a wide variety of subjects. Each sheet of film produces a 2.4 x 1.8\" glossy image area that is surrounded by a simple white border.Quick, instant developing is possible when working in temperatures between 41-104°F."
    },
    {
      name: "FUJIFILM INSTAX SQUARE Instant Film (20 Exposures)",
      price: 18.83,
      info: "This twin pack of Fujifilm instax mini Instant Film contains 20 sheets of instant color film that is compatible for use with the Fujifilm instax mini series of cameras. This film features vivid color reproduction with natural skin tones when used under daylight (5500K) or electronic flash lighting conditions. A refined grain structure provides high image sharpness and clarity as well as a versatile ISO 800 film speed for use with a wide variety of subjects. Each sheet of film produces a 2.4 x 1.8\" glossy image area that is surrounded by a simple white border.Quick, instant developing is possible when working in temperatures between 41-104°F."
    },
    {
      name: "Polaroid Color 600 Instant Film (8 Exposures)",
      price: 19.99,
      info: "Just like the Polaroid cameras from the '80s and '90s, our 600 film is a favorite for many. 600 film is the most common film for vintage cameras because it contains a small battery in every pack. Got a new camera? Don't sweat it. 600 film works with our i-Type models too. You get 8 instant photos in every pack."
    },
    {
      name: "Polaroid Black & White 600 Instant Film (8 Exposures)",
      price: 19.99,
      info: "Just like the Polaroid cameras from the '80s and '90s, our 600 film is a favorite for many. 600 film is the most common film for vintage cameras because it contains a small battery in every pack. Got a new camera? Don't sweat it. 600 film works with our i-Type models too. You get 8 instant photos in every pack."
    },
    {
      name: "Polaroid Black & White i-Type Instant Film (8 Exposures)",
      price: 16.99,
      info: "Got a camera? Need film. Our i-Type cameras have their own film: it's battery-free (unlike the standard film for vintage cameras), so it's easier on the wallet. Compatible with the OneStep+ and the Now cameras, plus the Polaroid Lab. There are 8 instant photos in every pack."
    },
    {
      name: "Polaroid Color i-Type Instant Film (8 Exposures)",
      price: 16.98,
      info: "Got a camera? Need film. Our i-Type cameras have their own film: it's battery-free (unlike the standard film for vintage cameras), so it's easier on the wallet. Compatible with the OneStep+ and the Now cameras, plus the Polaroid Lab. There are 8 instant photos in every pack."
    },
    {
      name: "FUJIFILM INSTAX Wide Instant Film (20 Exposures)",
      price: 18.65,
      info: "Hi-Speed ISO 800 film, with superb grain quality, Instax film ensures vibrant colour and natural skin tones. Develops instantly, press the shutter, capture a moment, and watch the photo slide out and the image develop in front of your eyes. Easy-To-Load cartridge, every cartridge is designed and labelled for easy loading and filled with 10 prints each."
    },
    {
      name: "OP/TECH USA Cam Strap-QD (Red)",
      price: 11.35,
      info: "A plain strap that you might find handy for (any) camera."
    },
    {
      name: "Moment MTW Fanny Sling 2020 (Black, Ripstop Nylon)",
      price: 69.99,
      info: "Slightly overpriced but professional bag."
    },
    {
      name: "Polaroid OneStep 2 i‑Type Instant Camera",
      price: 89.99,
      info: "A polaroid camera that was added here because we think it is quite interesting."
    }
  ], {});
    },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
