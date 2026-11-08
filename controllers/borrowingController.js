
const { borrowing, book, libraryMember } = require('../models');

exports.createBorrowing = async (req, res) => {
    try {
        const { book_id, libraryMember_id, due_date } = req.body;
        if (!book_id || !libraryMember_id || !due_date) {
    return res.status(400).json({
        message: 'Book ID, Library Member ID and Due Date are required'
    });
}
if (isNaN(Date.parse(due_date)) || new Date(due_date) <= new Date()) {
    return res.status(400).json({
        message: 'Please provide a valid future due date'
    });
}

        const bookData = await book.findByPk(book_id);

        if (!bookData) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        const memberData = await libraryMember.findByPk(libraryMember_id);

        if (!memberData) {
            return res.status(404).json({
                message: 'Library member not found'
            });
        }

        if (bookData.copies_available <= 0) {
            return res.status(400).json({
                message: 'No available copies of this book'
            });
        }

        const newBorrowing = await borrowing.create({
            book_id,
            libraryMember_id,
            due_date,
            status: 'Borrowed'
        });

        await bookData.update({
            copies_available: bookData.copies_available - 1
        });

        return res.status(201).json({
            message: 'Book borrowed successfully',
            data: newBorrowing
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
exports.getAllBorrowings = async (req, res) => {
    try {
        const borrowings = await borrowing.findAll();

        return res.status(200).json({
            message: 'All borrowings retrieved successfully',
            data: borrowings
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
exports.getBorrowingById = async (req, res) => {
    try {
        const { id } = req.params;

        const borrowingData = await borrowing.findByPk(id);

        if (!borrowingData) {
            return res.status(404).json({
                message: 'Borrowing not found'
            });
        }

        return res.status(200).json({
            message: 'Borrowing retrieved successfully',
            data: borrowingData
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
exports.updateBorrowing = async (req, res) => {
    try {
        const { id } = req.params;

        const borrowingData = await borrowing.findByPk(id);

        if (!borrowingData) {
            return res.status(404).json({
                message: 'Borrowing not found'
            });
        }

        const bookData = await book.findByPk(borrowingData.book_id);

        const { status } = req.body;

        if (status && !['Borrowed', 'Returned', 'Overdue'].includes(status)) {
            return res.status(400).json({
                message: 'Invalid borrowing status'
            });
        }

        if (status === 'Returned' && borrowingData.status === 'Borrowed') {
            await bookData.update({
                copies_available: bookData.copies_available + 1
            });
        }

        await borrowingData.update(req.body);

        return res.status(200).json({
            message: 'Borrowing updated successfully',
            data: borrowingData
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
 exports.deleteBorrowing = async (req, res) => {
    try {
        const { id } = req.params;

        const borrowingData = await borrowing.findByPk(id);

        if (!borrowingData) {
            return res.status(404).json({
                message: 'Borrowing not found'
            });
        }

        await borrowingData.destroy();

        return res.status(200).json({
            message: 'Borrowing deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};