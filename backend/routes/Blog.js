import express from 'express'
import { Create, deletePost } from '../controllers/Blog.js'
import { isAdmin } from '../middleware/isAdmin.js'
import upload from '../middleware/Multer.js'

const BlogsRoutes=express.Router()
BlogsRoutes.post('/create',isAdmin,upload.single('postimage'),Create)
BlogsRoutes.delete('/delete/:id', isAdmin,deletePost)

export default BlogsRoutes