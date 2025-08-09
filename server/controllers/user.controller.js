import User from '../models/user.model.js'

export const createUser = async (req , res) =>{
    try{
        const {name , email , publicKey} = req.body

        if(!name || !email || !publicKey){
            throw new Error('Missing form fields')
        }

        const existingUser = await User.findOne({publicKey})

        if(existingUser){
            throw new Error('User already exists')
        }

        const newUser = await User.create({
            publicKey : this.publicKey,
            name : this.name,
            email : this.email
        })

        const token = jwt.sign(
            {newUser},
            process.env.TOKEN_KEY,
            {expiresIn : '30d'}
        )

        res.status(200).json({
            success : true,
            message : 'User created succesfully',
            token
        })

    }catch(error){
        console.log(error.message)
        res.status(400).json({
            success :false,
            message : "Failed to register the user"
        })
    }
}

