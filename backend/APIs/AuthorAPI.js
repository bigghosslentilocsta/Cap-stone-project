// Author API routes for content management
import exp from 'express'
import { ArticleTypeModel } from '../models/ArticleModel.js'
import { UserTypeModel } from '../models/UserModel.js'
import { authenticate, register } from '../services/authService.js'
import { checkAuthor } from '../middlewares/checkAuthor.js'
import { verifyToken } from '../middlewares/verifyToken.js'
export const authorRoute=exp.Router()

// Implement author registration (public route)
authorRoute.post('/register', async (req, res, next) => {
    let userObj = req.body
    const newUserObj = { ...userObj, role: 'author' }
    res.status(201).json({ message: 'Author registered', user: await register(newUserObj) })
});

// Implement create article (protected route)
authorRoute.post('/articles',verifyToken, checkAuthor, async (req, res, next) => {
    //get article from req
    const articleObj = req.body
    const authorId = req.body.authorId
    //create article document with author id
    const articleWithAuthor = { ...articleObj, author: authorId }
    //save
    const created = await ArticleTypeModel.create(articleWithAuthor);
    //send res
    res.status(201).json({ message: 'Article created', payload: created });
});

// Implement read articles by author (protected route)
authorRoute.get("/articles/:authorId",verifyToken, checkAuthor, async (req, res, next) => {
    //get author id
    let authorId = req.params.authorId
    //read articles by this author
    let articles = await ArticleTypeModel.find({ author: authorId, isArticleActive: true })
    //send res
    res.status(200).json({ message: 'Articles by author', payload: articles })
});

//Edit article by author (protected route)
authorRoute.put("/articles", verifyToken, checkAuthor, async (req, res, next) => {
    //get modified article from req
    //find article
    //update the article
    //send res(updated article)
    const { articleId, title, category, content, authorId } = req.body
    if (!articleId) {
        return res.status(400).json({ message: 'Article ID is required' })
    }
    const articleOfDB = await ArticleTypeModel.findById(articleId)
    if (!articleOfDB) {
        return res.status(404).json({ message: 'Article not found' })
    }
    if (authorId && articleOfDB.author?.toString() !== authorId) {
        return res.status(403).json({ message: 'Not authorized to edit this article' })
    }

    if (title !== undefined) {
        articleOfDB.title = title
    }
    if (category !== undefined) {
        articleOfDB.category = category
    }
    if (content !== undefined) {
        articleOfDB.content = content
    }

    const updated = await articleOfDB.save()
    res.status(200).json({ message: 'Article updated', payload: updated })
});

//delete (soft delete) article (protected route)
authorRoute.delete("/articles/:articleId", verifyToken, checkAuthor, async (req, res, next) => {
    let articleId = req.params.articleId
    let authorId = req.body.authorId
    const articleOfDB = await ArticleTypeModel.findById(articleId)
    if (!articleOfDB) {
        return res.status(404).json({ message: 'Article not found' })
    }
    if (authorId && articleOfDB.author?.toString() !== authorId) {
        return res.status(403).json({ message: 'Not authorized to delete this article' })
    }
    articleOfDB.isArticleActive = false
    const updated = await articleOfDB.save()
    res.status(200).json({ message: 'Article deleted', payload: updated })
});
