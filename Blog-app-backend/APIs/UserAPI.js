// User API routes for reading and commenting
import exp from 'express'
import { ArticleTypeModel } from '../models/ArticleModel.js'
import { authenticate, register } from '../services/authService.js'
export const userRoute=exp.Router()
import { verifyToken } from '../middlewares/verifyToken.js'

// Implement user registration (public route)
userRoute.post('/register', async (req, res, next) => {
	try {
		const userObj = { ...req.body, role: 'user' }
		const created = await register(userObj)
		res.status(201).json({ message: 'User registered', user: created })
	} catch (err) {
		next(err)
	}
})

// Read all active articles (protected route)
userRoute.get('/articles', verifyToken, async (req, res, next) => {
    try {
        const articles = await ArticleTypeModel.find({ isArticleActive: true })
        res.status(200).json({ message: 'Articles list', payload: articles })
    } catch (err) {
        next(err)
    }
})
// Add a comment to an article (protected route)
userRoute.post('/articles/:articleId/comments', verifyToken, async (req, res, next) => {
    try {
        const articleId = req.params.articleId
        const { comment, userId } = req.body
        if (!comment) {
            return res.status(400).json({ message: 'Comment is required' })
        }
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' })
        }

        const updated = await ArticleTypeModel.findByIdAndUpdate(
            articleId,
            { $push: { comments: { user: userId, comment } } },
            { new: true }
        )

        if (!updated) {
            return res.status(404).json({ message: 'Article not found' })
        }

        res.status(200).json({ message: 'Comment added', payload: updated })
    } catch (err) {
        next(err)
    }
})

