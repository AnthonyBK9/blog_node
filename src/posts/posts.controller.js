const uuid = require('uuid')

const postDB = [{
    "id": "uuid",
	"title": "post de prueba",
	"content":"Crea un servidor con Node.js",
	"header_image": "url_to_img",
	"user_id": "c8edf653-b05b-4cf1-9046-cd562def187e",
	"published": true
}]

const getAllPosts = () => {
    return postDB
}

const getPostByID = (id) => {
    const data = postDB.filter(item => item.id === id)
    return data.length ? data[0] : false
}

const createPost = (data) => {
    const newPost = {
        id: uuid.v4(),
        title: data.title,
        content: data.content,
        header_image: data.header_image,
        user_id: data.user_id,
        published: true
    }
    postDB.push(newPost)
    return newPost
}

const editPost = (id, data) => {
    const index = postDB.findIndex(post => post.id === id)
    if(index !== -1){
        postDB[index] = {
            id: id,
            title: data.title,
            content: data.content,
            header_image: data.header_image,
            user_id: data.user_id,
            published: true
        }
        return postDB[index]
    } else {
        return createPost(data)
    }
}

const deletePost = (id) => {
    const index = postDB.findIndex(post => post.id === id)
    if(index !== -1){
        postDB.splice(index, 1)
        return true
    } else {
        return false
    }
}

const getPostByUserId = (user_id) => {
    const data = postDB.filter(item => item.user_id === user_id)
    return data.length ? data[0] : false
}

module.exports = {
    createPost,
    getAllPosts,
    getPostByID,
    editPost,
    deletePost,
    getPostByID,
    getPostByUserId
}