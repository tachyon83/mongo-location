const mongoose = require('mongoose')
const querySettings = require('../settings/querySettings')
const parsePayload = require('../utils/parsePayload')

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        index: 'hashed',
        default: '',
        unique: true,
        // required: true,
    },
    address: {
        type: String,
        default: '',
        unique: true,
    },
    position: {
        'type': {
            type: String,
            default: 'Point',
        },
        coords: [{ type: Number }],
        // index: '2dsphere',
    },
}, {
    timestamps: true,
})
locationSchema.index({ position: '2dsphere' })
// it seems that 2dsphere index must be added like above, not in the schema definition.

locationSchema.statics.add = function (payload) {
    payload = parsePayload(payload)
    console.log('after former', payload)
    // return (new this(parsePayload(payload))).save()
    return (new this(payload)).save()
}
locationSchema.statics.findAll = function () {
    return this.find({}).limit(querySettings.limitPerQuery)
}
locationSchema.statics.findOneByName = function (name) {
    return this.findOne({ name })
}
locationSchema.statics.updateByName = function (name, payload) {
    return this.findOneAndUpdate({ name }, payload, { new: true })
}
locationSchema.statics.deleteByName = function (name) {
    return this.remove({ name })
}

locationSchema.statics.findNearest = function (lng, lat, maxDistance) {
    return this.find().where('position').near({
        center: {
            type: 'Point',
            coords: [parseFloat(lng), parseFloat(lat)]
        },
        maxDistance,
    }).limit(1)
}

module.exports = mongoose.model('Location', locationSchema)