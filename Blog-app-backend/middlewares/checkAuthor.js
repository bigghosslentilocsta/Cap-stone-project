import { UserTypeModel } from '../models/UserModel.js'

export const checkAuthor = async (req, res, next) => {
    const authorId = req.body?.authorId || req.params?.authorId || req.query?.authorId

    if (!authorId) {
        return res.status(400).json({ message: 'Author ID is required' })
    }

    const author = await UserTypeModel.findById(authorId)
    if (!author || author.role !== 'author') {
        return res.status(404).json({ message: 'Author not found' })
    }

    req.author = author
    next()
};

