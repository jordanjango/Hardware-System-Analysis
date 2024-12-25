import { Sequelize } from 'sequelize';

//create instance of sequalize
const sequelize = new Sequelize('system-monitoring', 'postgres', 'IamNoob@123!', {
    host: 'localhost',
    port: 5432, // default Postgres port
    dialect: 'postgres',
});

//check the connection
export const checkConnection = async()=>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully with database.');
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    }catch(err){
        console.error('Unable to connect to the database:', err);
    }
}

//call the function
export default sequelize;