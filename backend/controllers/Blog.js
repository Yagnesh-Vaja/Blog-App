import PostModel from "../models/Blog.js";

const Create = async (req, res) => {
  try {
    const { title, desc } = req.body;

    const imagePath = req.file.filename;
    const CreateBlog = new PostModel({
      title,
      desc,
      image: imagePath,
    });
    await CreateBlog.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Post Created Successfully",
        post: CreateBlog,
      });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const FindPost = await PostModel.findById(postId);
    if (!FindPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found" });
    }

    const deletedPost = await PostModel.findByIdAndDelete(postId);
    return res
      .status(200)
      .json({
        success: false,
        message: "Post Deleted Successfully",
        post: deletedPost,
      });
  } catch (error) {
    console.error("Error during login", error); 
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { Create, deletePost };
