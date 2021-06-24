/* eslint-disable no-console */
import { Router } from 'express';
import _ from 'lodash';
import { STATUS_BILL } from '../common/constant';
import verifyToken from '../middleware/auth';
import Bill from '../models/Bill';
import BillDetail from '../models/BillDetail';

const router = Router();

// @route GET api/bill
// @desc Get all bill by user
// @access Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const bills = await Bill.find({ user: _.get(req, ['userId']) });
    return res.json({ success: true, bills });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route GET api/bill
// @desc Get detail bill of user by store and bill
// @access Private
router.get('/:store/:bill', verifyToken, async (req, res) => {
  try {
    const bill = await Bill.findOne({
      _id: req.params.bill,
      user: _.get(req, ['userId']),
      store: req.params.store,
    });

    const billDetails = await BillDetail.find({ bill })
      .populate('item', ['usenamername', 'price', 'isTopping'])
      .select('amount');
    return res.json({ success: true, bill, billDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/bill/:store
// @desc Create bill by user and store
// @access Private
router.post('/:store', verifyToken, async (req, res) => {
  const {
    billcode,
    position,
    checkIn,
    checkOut,
    cashier,
    billDetails,
  } = req.body;
  const user = _.get(req, ['userId']);
  const status = STATUS_BILL.NEW_CREATE;

  if (!billcode)
    return res
      .status(400)
      .json({ success: false, message: 'Billcode is required' });
  if (!billDetails || billDetails.length === 0)
    return res
      .status(400)
      .json({ success: false, message: 'Billcode is required' });
  const billCheckCondition = { billcode, user };
  const billCheck = await Bill.findOne(billCheckCondition);

  if (billCheck)
    return res
      .status(400)
      .json({ success: false, message: 'Bill code for user already taken' });

  try {
    const newBill = new Bill({
      billcode,
      position,
      checkIn,
      checkOut,
      user,
      cashier,
      status,
      store: req.params.store,
    });

    await newBill.save();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newBillDetails: any[] = [];

    if (billDetails && billDetails.length > 0) {
      for (let i = 0; i < billDetails.length; i++) {
        const newBillDetail = new BillDetail({
          bill: newBill._id,
          item: billDetails[i].item,
          amount: billDetails[i].amount,
        });

        await newBillDetail.save();
        newBillDetails[i] = newBillDetail;
      }
    }

    return res.json({
      success: true,
      message: 'Congratulations! Create bill successfuly.',
      newBill,
      newBillDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
