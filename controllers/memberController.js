const { libraryMember } = require('../models');

const toTitleCase = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

exports.libraryMember = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      gender,
      phone_number,
      password,
      address
    } = req.body;

    const member = await libraryMember.findOne({
      where: { email: email.toLowerCase() }
    });

    if (member) {
      return res.status(409).json({
        message: 'Member already exists'
      });
    }

    const newMember = await libraryMember.create({
      first_name: toTitleCase(first_name),
      last_name: toTitleCase(last_name),
      email: email.toLowerCase(),
      gender,
      phone_number,
      password,
      address,
      membership_date: new Date()
    });

     res.status(201).json({
      message: 'Member created successfully',
      data: newMember
    });
  } catch (error) {
     res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await libraryMember.findAll({
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({
      message: `All ${members.length} library members retrieved successfully`,
      data: members
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateAMember = async (req, res) => {
  try {
    const { id } = req.params;
    const {first_name, last_name, email, gender, phone_number, password, address} = req.body
    const member = await libraryMember.findByPk(id);

    if (!member) {
      return res.status(404).json({
        message: 'Member not found'
      });
    }
    
    const updatedMember = await member.update({
      first_name: toTitleCase(first_name),
      last_name: toTitleCase(last_name),
      email: email.toLowerCase(),
      gender,
      phone_number,
      password,
      address
    });

    return res.status(200).json({
      message: 'Member updated successfully',
      data: updatedMember
    });
  } catch (error) {
     res.status(500).json({
      message: error.message
    });
  }
};

exports.getOneMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await libraryMember.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!member) {
      return res.status(404).json({
        message: 'Member not found'
      });
    }

    return res.status(200).json({
      message: 'Library member found',
      data: member
    });
  } catch (error) {
     res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteMember = async(req, res)=> {
    try {
     const { id } = req.params;
     const member = await libraryMember.findByPk(id);
     if (!member) {
         return res.status(404).json({
          message: 'Member not found'
      });
    }
     await member.destroy()
       res.status(200).json({
            message: 'Library member deleted successfully',
            });
    } catch (error) {
        res.status(500).json({
      message: error.message
    });
    }
}
