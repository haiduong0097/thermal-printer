/* eslint-disable no-console */
import { Router } from 'express';
import _ from 'lodash';
import verifyToken from '../middleware/auth';
import Store from '../models/Store';

const router = Router();

// @route GET api/store
// @desc Get all store
// @access Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const stores = await Store.find().select('-__v');
    return res.json({ success: true, stores });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/store
// @desc Regist store
// @access Private
router.post('/', verifyToken, async (req, res) => {
  const {
    storeTypeBill,
    storeName,
    storeCode,
    storeAddress,
    storePhoneNumber,
    description,
    storeImageUrl,
  } = req.body;

  if (
    !storeTypeBill ||
    !storeName ||
    !storeCode ||
    !storeAddress ||
    !storePhoneNumber
  )
    return res
      .status(400)
      .json({ success: false, message: 'Required fields are not enough' });

  const storeCheckCondition = { storeCode };
  const storeCheck = await Store.findOne(storeCheckCondition);

  if (storeCheck)
    return res.status(400).json({
      success: false,
      message: 'Oh, the store code has already been registered',
    });

  try {
    const newStore = new Store({
      storeTypeBill,
      storeName,
      storeCode,
      storeAddress,
      storePhoneNumber,
      description,
      storeImageUrl: storeImageUrl
        ? storeImageUrl.startsWith('https://')
          ? storeImageUrl
          : `https://${storeImageUrl}`
        : '',
    });

    await newStore.save();

    return res.json({
      success: true,
      message: 'Congratulations! New store ready to serve.',
      newStore,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route PUT api/store/:storeId
// @desc Update store by id
// @access Private
router.put('/:storeId', verifyToken, async (req, res) => {
  const {
    storeTypeBill,
    storeName,
    storeCode,
    storeAddress,
    storePhoneNumber,
    description,
    storeImageUrl,
  } = req.body;

  // Simple validation
  if (
    !storeTypeBill ||
    !storeName ||
    !storeCode ||
    !storeAddress ||
    !storePhoneNumber
  )
    return res
      .status(400)
      .json({ success: false, message: 'Required fields are not enough' });

  try {
    let updatedStore = {
      storeTypeBill,
      storeName,
      storeCode,
      storeAddress,
      storePhoneNumber,
      description: description || '',
      storeImageUrl: storeImageUrl
        ? storeImageUrl.startsWith('https://')
          ? storeImageUrl
          : `https://${storeImageUrl}`
        : '',
    };

    const storeUpdateCondition = {
      _id: req.params.storeId,
    };

    updatedStore = await Store.findOneAndUpdate(
      storeUpdateCondition,
      updatedStore,
      { new: true },
    );

    // User not authorised to update post or post not found
    if (!updatedStore)
      return res.status(401).json({
        success: false,
        message: 'Store not found or user not authorised',
      });

    res.json({
      success: true,
      message: 'Grow your store successfully!',
      updatedStore: updatedStore,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route DELETE api/store/:storeId
// @desc Delete store
// @access Private
router.delete('/:storeId', verifyToken, async (req, res) => {
  try {
    const storeDeleteCondition = { _id: req.params.storeId };
    const deletedStore = await Store.findOneAndDelete(storeDeleteCondition);

    // User not authorised or post not found
    if (!deletedStore)
      return res.status(401).json({
        success: false,
        message: 'Store not found or user not authorised',
      });

    res.json({ success: true, deletedStore });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
