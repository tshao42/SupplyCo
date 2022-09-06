const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

//===============TESTING ROUTES==================
// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));


// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
// // GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });


const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const productsRouter = require('./products.js');
const ordersRouter = require('./orders.js')
const reviewsRouter = require('./reviews.js')
const mapsRouter = require('./maps.js')
const productimagesRouter = require('./productimages')
const collectionRouter = require('./collections.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/products', productsRouter);

router.use('/orders', ordersRouter);

router.use('/reviews', reviewsRouter );

router.use('/map', mapsRouter)

router.use('/productimages', productimagesRouter )

router.use('/collections', collectionRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});



module.exports = router;
