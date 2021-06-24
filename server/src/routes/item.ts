/* eslint-disable no-console */
import { Router } from 'express';
import verifyToken from '../middleware/auth';
import _ from 'lodash';
import Item from '../models/Item';
import Store from '../models/Store';

const router = Router();

// @route GET api/item/:store
// @desc Get all item by store
// @access Private
router.get('/:storeId', verifyToken, async (req, res) => {
  try {
    const storeCondition = {
      _id: req.params.storeId,
    };

    const targetStore = await Store.findOne(storeCondition);

    const itemsOfStore = await Item.find({
      store: req.params.storeId,
    });
    return res.json({ success: true, itemsOfStore, targetStore });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/item/:store
// @desc Create item by store
// @access Private
router.post('/:store', verifyToken, async (req, res) => {
  const { name, price, isTopping } = req.body;

  if (!name)
    return res
      .status(400)
      .json({ success: false, message: 'Name is required' });
  if (!price)
    return res
      .status(400)
      .json({ success: false, message: 'Price is required' });

  try {
    const newItem = new Item({
      name,
      price,
      isTopping: isTopping || false,
      store: _.get(req, ['params', 'store']),
    });

    await newItem.save();

    return res.json({
      success: true,
      message: 'Congratulations! Create item successfuly.',
      newItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route DELETE api/item/:itemId/
// @desc Delete store
// @access Private
router.delete('/:itemId', verifyToken, async (req, res) => {
  try {
    const itemDeleteCondition = { _id: req.params.itemId };
    const deletedItem = await Item.findOneAndDelete(itemDeleteCondition);

    // User not authorised or post not found
    if (!deletedItem)
      return res.status(401).json({
        success: false,
        message: 'Store not found or user not authorised',
      });

    res.json({ success: true, deletedItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
