const db = require('../models')
const commentDB = db.comment

module.exports = {
    addComment: async (req, res) => {
        try {
            const { comment, userId, postId } = req.body
            const response = await commentDB.create({ comment: comment, user_id: userId, post_id: postId })
            if (response) {
                return res.status(201).send({
                    status: 201,
                    success: true,
                    message: 'comment added successfully',
                    data: response,
                })
            }
        } catch (error) {
            res.send({
                status: error.status,
                success: error.success,
                message: error.message
            })
        }
    },
    getAllComment: async (req, res) => {
        try {
            const { postId, limit } = req.query
            console.log('limit>>>', limit)
            const response = await commentDB.findAll({
                include: db.user,
                limit: Number(limit),
                where: {
                    post_id: postId
                },
                order: [['updatedAt', 'DESC']]
            })
            console.log('>>>>>>', response)
            if (response.length > 0) {
                return res.status(200).send({
                    status: 200,
                    success: true,
                    message: 'get comments success',
                    data: response,
                })
            }
        } catch (error) {
            res.send({
                status: error.status,
                success: error.success,
                message: error.message
            })
        }
    }
}
