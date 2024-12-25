import { DataTypes,Model,Optional } from "sequelize";
import sequelize  from "../config/dbConfig";

//declare an interface that defines the model properties
interface UserAttributes{
    id:number
    userName:string
    password:string
    email:string
}

//make the id optional
interface UserCreationAttributes extends Optional<UserAttributes,'id'>{}

//now define the model
class User extends Model<UserAttributes,UserCreationAttributes> implements UserAttributes{
    public id!:number
    public userName!:string
    public password!:string
    public email!:string
}

//now define the properties of model
User.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
},
{
    sequelize,
    tableName:'users',
}
)

export default User