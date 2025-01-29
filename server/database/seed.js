const {
    User, Cart, Producer, Product, Description, Type, Country, TypeBrand
} = require('../models/models');
const sequelize = require('./db');

async function seedDatabase() {
    try {
        await sequelize.sync({force: true});

        const users = await User.bulkCreate([
            {email: 'user@g.com', password: 'user', role: 'USER'},
            {email: 'admin@g.com', password: 'admin', role: 'ADMIN'}
        ]);

        const countries = await Country.bulkCreate([
            {name: 'Беларусь'},
            {name: 'Германия'},
            {name: 'Франция'}
        ]);

        const producers = await Producer.bulkCreate([
            {name: 'Нагар про', countryId: countries[0].id},
            {name: 'Веник гуд компани', countryId: countries[1].id}
        ]);

        const types = await Type.bulkCreate([
            {name: 'Сковорода'},
            {name: 'Веник'}
        ]);

        const products = await Product.bulkCreate([
            {
                name: 'Веник соломенный',
                price: 11,
                image: '1.jpg',
                producerId: producers[1].id,
                typeId: types[1].id,
                countryId: countries[0].id
            },
            {
                name: 'Сковорода для макарон',
                price: 96,
                image: '2.jpg',
                producerId: producers[0].id,
                typeId: types[0].id,
                countryId: countries[1].id
            }
        ]);

        await Description.bulkCreate([
            {title: 'Длина', description: '35', productId: products[0].id},
            {title: 'Срок службы', description: '1', productId: products[0].id},
            {title: 'Температура', description: '500', productId: products[1].id},
            {title: 'Срок службы', description: '4', productId: products[1].id}
        ]);

        await Cart.bulkCreate([
            {userId: users[0].id},
            {userId: users[1].id}
        ]);

        await TypeBrand.bulkCreate([
            {typeId: types[0].id, producerId: producers[0].id},
            {typeId: types[1].id, producerId: producers[1].id}
        ])

        console.log('База данных успешно заполнена!');
        process.exit();
    } catch (error) {
        console.error('Ошибка при заполнении БД:', error);
        process.exit(1);
    }
}

seedDatabase();
