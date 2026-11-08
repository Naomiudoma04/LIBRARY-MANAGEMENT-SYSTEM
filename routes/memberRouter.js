
const router = require('express').Router();

const {
    libraryMember,
    getAllMembers,
    updateAMember,
    getOneMember,
    deleteMember,
    getMemberBorrowingHistory
} = require('../controllers/memberController');

router.post('/createMember', libraryMember);
router.get('/allMembers', getAllMembers);

// Put the borrowing history route before the general member ID route
router.get('/:id/borrowingHistory', getMemberBorrowingHistory);

router.get('/:id', getOneMember);
router.put('/:id', updateAMember);
router.delete('/:id', deleteMember);

module.exports = router;
