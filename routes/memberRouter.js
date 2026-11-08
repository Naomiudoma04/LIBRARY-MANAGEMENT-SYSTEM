const router = require('express').Router();
const {
  libraryMember,
  getAllMembers,
  getOneMember,
  updateAMember,
  deleteMember
} = require('../controllers/memberController.js');
const {
  createLibraryMemberValidation,
  updateLibraryMemberValidation
} = require('../middlewares/validation.js');


router.post('/createMember', createLibraryMemberValidation, libraryMember);
router.get('/allMembers', getAllMembers);
router.get('/oneMember/:id', getOneMember);
router.put('/updateMember/:id', updateLibraryMemberValidation, updateAMember);
router.delete('/deleteMember/:id',deleteMember)

module.exports = router;
