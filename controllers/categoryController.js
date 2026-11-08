const { category } = require('../models');

exports.createCategory = async (req, res) => {
    try {
        const {Name, description} = req.body;

        const newCategory = await category.create({
            Name,
            description
        })
        res.status(201).json({
            message: "category created successfully",
            data: newCategory
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOne = async (req, res) =>{
    try {
        const categoryId = req.params
        const category = await category.findByPk(categoryId)
        if(!category){
            return res.status(404).json({
                message: "Category not found"
            })
        }

        res.status(200).json({
            message: "Category found",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const categoryRecord = await category.findByPk(id)

        if (!categoryRecord) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        await categoryRecord.update(req.body)

        res.status(200).json({
            message: "Category updated successfully",
            data: categoryRecord
        })
        } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
