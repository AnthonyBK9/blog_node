const usersControllers = require('./users.controllers')

usersControllers.createUser
usersControllers.deleteUser
usersControllers.editUser
usersControllers.getAllUsers
usersControllers.getUserById

const getAll = (req, res) => {
    const data = usersControllers.getAllUsers()
    res.status(200).json({items: data.length, users: data})
}

const getUserById = (req, res) => {
    const id = req.params.id
    const data = usersControllers.getUserById(id)

    if(data){
        res.status(200).json(data)
    } else {
        res.status(404).json({message: `El usuario con el ID ${id} no existe`})
    }
}

const register = (req, res) => {
    const data = req.body
    if(!data){
        return res.status(400).json({message: 'Missing Data'})
    }
    if(!data.first_name || !data.last_name || !data.email || !data.password || !data.birthday_date || !data.country){
        return res.status(400).json({message: 'All fields must be completed', fields: {
            first_name: 'string',
            last_name: 'string',
            email: 'example@example.com',
            password: 'string',
            birthday_date: 'DD/MM/YYYY',
            country: 'string'
        }})
    } else {
        const response = usersControllers.createUser(data)
        return res.status(201).json({message: `User created succesfully with id: ${response.id}`, user: response})
    }
}

const remove = (req, res) => {
    const id = req.params.id
    const data = usersControllers.deleteUser(id)

    if(data){
        return res.status(204).json()
    } else {
        return res.status(400).json({message: 'Invalid ID'})
    }
}

const edit = (req, res) => {
    const id = req.params.id
    const data = req.body

    if(!Object.keys(data).length){
        return res.status(400).json({message: 'Missing Data'})
    } else if (!data.first_name || !data.last_name || !data.email || !data.phone ||  !data.birthday_date || !data.rol || !data.profile_image || !data.country || !data.is_active){
        return res.status(400).json({message: 'All fields must be completed', fields: {
            first_name: 'string',
            last_name: 'string',
            email: 'example@example.com',
            phone: '+52234234213',
            birthday_date: 'DD/MM/YYYY',
            rol: 'normal',
            profile_image: 'example.com/img/example.png',
            country: 'string',
            is_active: true
        }})
    } else {
        const response = usersControllers.editUser(id, data)
        return res.status(200).json({message: 'User edit succesfully with', user: response})
    }
}

const editMyUser = (req, res) => {
    const id = req.user.id
    const data = req.body

    if(!Object.keys(data).length){
        return res.status(400).json({message: 'Missing Data'})
    } else if (!data.first_name || !data.last_name || !data.email || !data.phone ||  !data.birthday_date || !data.profile_image || !data.country || !data.is_active){
        return res.status(400).json({message: 'All fields must be completed', fields: {
            first_name: 'string',
            last_name: 'string',
            email: 'example@example.com',
            phone: '+52234234213',
            birthday_date: 'DD/MM/YYYY',
            profile_image: 'example.com/img/example.png',
            country: 'string',
            is_active: true
        }})
    } else {
        const response = usersControllers.editUser(id, data)
        return res.status(200).json({message: 'User edit succesfully with', user: response})
    }
}

const getMyUser = (req, res) => {
    const data = usersControllers.getAllUsers()
    res.status(200).json({items: data.length, users: data})
}

const removeMyUser = (req, res) => {
    const id = req.user.id
    const data = usersControllers.deleteUser(id)

    if(data){
        return res.status(204).json()
    } else {
        return res.status(400).json({message: 'User is not logged in'})
    }
}

module.exports = {
    getAll,
    getUserById,
    register,
    remove,
    edit,
    editMyUser,
    getMyUser,
    removeMyUser
}