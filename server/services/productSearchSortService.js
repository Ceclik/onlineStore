const {Producer, Product, Type, Description} = require("../models/models");
const {Op} = require("sequelize");

class ProductSearchSortService {
    async producerNameSort(res, producerName) {
        const producer = await Producer.findOne({
            where: {name: producerName}
        });

        if (!producer)
            return res.json("not found");

        const foundProducts = await Product.findAll({
            where: {producerId: producer.id},
            include: {
                model: Description,
                as: 'info'
            }
        });
        console.log(foundProducts);
        return foundProducts;
    }

    async typeSort(res, type) {
        const typeData = await Type.findOne({
            where: {name: type}
        });

        if (!typeData)
            return res.json('not found!')

        return await Product.findAll({
            where: {typeId: typeData.id}
        });
    }

    async priceSort(minPrice, maxPrice, sortOrder) {
        await Product.findAll({
            where: {
                price: {
                    [Op.gte]: minPrice || 0,
                    [Op.lte]: maxPrice || Number.MAX_VALUE
                }
            },
            order: [['price', sortOrder || 'ASC']]
        });
    }
}

module.exports = new ProductSearchSortService();