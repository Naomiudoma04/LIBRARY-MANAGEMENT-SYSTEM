import { where } from 'sequelize';

const {libraryMember} = require('../models')

exports.libraryMember = async(req, res)=>{
    try {
        const {firstName, lastName, email, gender, status, phoneNumber, password, address, membership_date} = req.body;
        const member = await libraryMember.findByPk({where:{email:email.toLowerCase}});
        if (!member){
            return res.status(404).json({
                message: 'Member not found'
            })
        };
        const newMember = await libraryMember.create({
            firstName, 
            lastName, 
            email, 
            gender,
            status, 
            phoneNumber, 
            password, 
            address,
            membership_date
        });
        res.status(201).json({
            message: 'Member created successfully',
            data: newMember
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}