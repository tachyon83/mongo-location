module.exports = obj => {
    console.log(obj)
    console.log([obj.lng, obj.lat])
    return {
        name: obj.name,
        address: obj.address,
        position: {
            coords: [obj.lng, obj.lat]
        }
    }
}