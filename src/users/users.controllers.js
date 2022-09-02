const uuid = require('uuid')
const {hashPassword} = require('../utils/crypt')

const userDB = [{
      "id": "40fb0e06-190b-4341-bcea-e3c258d77e62",
      "first_name": "Antonio",
      "last_name": "Bermudez",
      "email": "antonio@example.com",
      "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
      "phone": "52234234213",
      "birthday_date": "04/02/1998",
      "rol": "admin",
      "profile_image": "example.com/img/example.png",
      "country": "Mexico",
      "is_active": true,
      "verified": false
    },
  ]

const getAllUsers = () => {
    return userDB
    //? select * from users;
}

const getUserById = (id) => {
    const data = userDB.filter(item => item.id === id)
    return data.length ? data[0] : false
    //? select * from users where id = ${id};
}

const createUser = (data) => {
    const newUser = {
        id: uuid.v4(),                                         
        first_name: data.first_name,                            
        last_name: data.last_name,                              
        email: data.email,               
        password: hashPassword(data.password),                  
        phone: data.phone ? data.phone : '',                    
        birthday_date: data.birthday_date,                      
        rol: 'normal',                                         
        profile_image: data.profile_image ? data.profile_image : '', 
        country: data.country,                                  
        is_active: true,                                        
        verified: false                                         
    }
    userDB.push(newUser)
    return newUser
}

const editUser = (id, data) => {
    const index = userDB.findIndex(user => user.id === id)
    if(index !== -1){
        userDB[index] = {
            id: id,
            first_name: data.first_name,                            
            last_name: data.last_name,                              
            email: data.email,                                      
            password: userDB[index].password,                  
            phone: data.phone,                    
            birthday_date: data.birthday_date,                      
            rol: data.rol,                                          
            profile_image: data.profile_image, 
            country: data.country,                                  
            is_active: data.is_active,
            verified: false                                                 
        }
        return userDB[index]
    } else {
        return createUser(data)
    }
}

const deleteUser = (id) => {
    const index = userDB.findIndex(user => user.id === id)
    if(index !== -1){
        userDB.splice(index, 1)
        return true
    } else {
        return false
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser
}
