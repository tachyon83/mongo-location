const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
    },
}, {
    timestamps: true,
})

shopSchema.statics.add = function (payload) {
    return (new this(payload)).save()
    // shop.save()
    // return shop.save((err, result) => {
    //     if (err) throw err
    //     console.log('saved', result)
    //     return result
    // })
}
// shopSchema.statics.findAll = () => this.find({})
shopSchema.statics.findAll = function () { return this.find({}) }
shopSchema.statics.findOneByName = function (name) { return this.findOne({ name }) }
shopSchema.statics.updateByName = function (name, payload) { return this.findOneAndUpdate({ name }, payload, { new: true }) }
shopSchema.statics.deleteByName = function (name) { return this.remove({ name }) }

module.exports = mongoose.model('Shop', shopSchema)