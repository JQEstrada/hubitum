const Sequelize = require('sequelize')
const config = require('../config/config')

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)
const User = require('./User')(sequelize, Sequelize.DataTypes)
const HabitDate = require('./HabitDate')(sequelize, Sequelize.DataTypes)
const Habittype = require('./Habittype')(sequelize, Sequelize.DataTypes)
const Habit = require('./Habit')(sequelize, Sequelize.DataTypes)

// Habit has a user
User.hasMany(Habit, { foreignKey: 'userId' })
Habit.belongsTo(User, { foreignKey: 'userId' })

// Habit has a habit type
Habittype.hasMany(Habit, { foreignKey: 'habittypeId' })
Habit.belongsTo(Habittype, { foreignKey: 'habittypeId' })

// Habit Date has a habit
Habit.hasMany(HabitDate, { foreignKey: 'habitId' })
HabitDate.belongsTo(Habit, { foreignKey: 'habitId' })


const db = {
    User,
    Habit,
    Habittype,
    HabitDate,
    sequelize,
    Sequelize
};

// fs
//     .readdirSync(__dirname)
//     .filter((file) => 
//     file !== 'index.js')
//     .forEach((file) => {
//         const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
//         db[model.name] = model
//     })

// db.sequelize = sequelize
// db.Sequelize = Sequelize

module.exports = db