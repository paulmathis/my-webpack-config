import { Router } from 'express';
const router = Router();

// router.get('/', (req, res, next) => {
//   res.json({ name: 'Bob' });
// });

router.get('/name', (req, res, next) => {
  res.json({ name: 'Bob' });
});

export default router;
