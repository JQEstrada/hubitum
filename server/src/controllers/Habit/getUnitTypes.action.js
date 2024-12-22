const { UnitType } = require('../../../models'); // Adjust the path according to your project structure

module.exports = {

    async getUnitTypeList (req, res) {
        try {            

            const unitTypes = await UnitType.findAll()
            res.json(unitTypes)

        } catch (err) {
            
            res.status(500).send({
                error: 'Error while trying to get unit types.'
            })

        }
    }

}