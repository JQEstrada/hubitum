const { habit  = require('../../../models'); // Adjust the path according to your project structure

module.exports = {

    async getOne (req, res) {
        try {            
            const {id} = req.params;

            //const habit = await sequelize.query("SELECT * FROM Habits WHERE Id = ", { type: Sequelize.QueryTypes.SELECT });
            const habitGet = await habit.findOne({
                where: {
                  id: id,  // Automatically sanitized by Sequelize
                },
              });
            res.json(habitGet)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'Error while trying to get habit.'
            })
        }
    }

}