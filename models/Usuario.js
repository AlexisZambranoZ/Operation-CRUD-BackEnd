import { DataTypes, Sequelize } from "sequelize";
/* import bcryp from 'bcrypt' */
import db from "../config/db.js";

const Usuario = db.define('usuarios',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false    
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false    
    }

},{
    hooks: {
        beforeCreate: async function(usuario){
            //Hashear
         /*    const salt = await bcryp.genSalt(10)
            usuario.password = await bcryp.hash(usuario.password, salt) */
        }
    }
})

export default Usuario