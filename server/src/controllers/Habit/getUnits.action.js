const { Unit } = require('../../../models'); // Adjust the path according to your project structure

module.exports = {

    async getUnitList (req, res) {
        try {            

            const units = await Unit.findAll()
            res.json(units)

        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'Error while trying to get units.'
            })

        }
    }

}