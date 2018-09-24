const Sequelize = require("sequelize")
const db = new Sequelize('postgres://localhost:5432/plantr')
module.exports = db

const Gardener = db.define( "gardeners", {
    name : Sequelize.STRING,
    age : Sequelize.INTEGER
});
const Plot = db.define("plots", {
    size : Sequelize.INTEGER,
    shaded : Sequelize.BOOLEAN
});
const Vegetable = db.define("vegetables", {
    name : Sequelize.STRING,
    color: Sequelize.STRING,
    planted_on : Sequelize.DATE
})

Plot.belongsTo(Gardener)
Gardener.hasOne(Plot)
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'})
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'})

Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})

const celery =  Vegetable.create({name: "celery", color: "green", planted_on: "9/24"})