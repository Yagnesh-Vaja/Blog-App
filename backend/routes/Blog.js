import express from 'express'
import { Create } from '../controllers/Blog.js'
import { isAdmin } from '../middleware/isAdmin.js'

const BlogsRoutes=express.Router()
BlogsRoutes.post('/create',isAdmin,Create)

export default BlogsRoutes