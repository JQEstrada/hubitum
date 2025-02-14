const { sequelize } = require('../../../models'); // Adjust the path according to your project structure
const { Sequelize } = require('sequelize'); // Import Sequelize

module.exports = {
    async index (req, res) {
        try {
            
            const habits = await sequelize.query("SELECT * FROM habits WHERE isactive = 1", { type: Sequelize.QueryTypes.SELECT });
          
            res.json(habits)

        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'Error while trying get habit list.'
            })
        }

    }
}