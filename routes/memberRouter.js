const router = require('express').Router();
const {
  libraryMember,
  getAllMembers,
  getOneMember,
  updateAMember,
  deleteMember
} = require('../controllers/libraryMemberController.js');
const {
  createLibraryMemberValidation,
  updateLibraryMemberValidation
} = require('../middlewares/libraryMemberValidation.js');

router.post('/createMember', createLibraryMemberValidation, libraryMember);
router.get('/allMembers', getAllMembers);
router.get('/:id', getOneMember);
router.put('/:id', updateLibraryMemberValidation, updateAMember);
router.delete('/:id', deleteMember);

module.exports = router;
