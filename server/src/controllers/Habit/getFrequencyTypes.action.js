const { frequencytype } = require('../../../models'); // Adjust the path according to your project structure

module.exports = {

    async getFrequencyTypeList (req, res) {
        try {            

            const frequencies = await frequencytype.findAll()
            res.json(frequencies)

        } catch (err) {
            
            res.status(500).send({
                error: 'Error while trying to get frequency types.'
            })

        }
    }

}