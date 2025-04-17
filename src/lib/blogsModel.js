import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    para: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },

});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
