(async () => {
    const { Sequelize, STRING, FLOAT, INTEGER, Op, UUID, UUIDV1 } = require('sequelize')
    const sequelize = new Sequelize('test1', 'root', 'laor1220', {
        host: "localhost",
        dialect: 'mysql'
    })

    // 定义模型
    const Fruit = sequelize.define('Fruit', {
        name: {
            type: STRING(20), allowNull: false,
            // Getters & Setters：定义为属性的⼀部分
            // get() {
            //     const fname = this.getDataValue("name");
            //     const price = this.getDataValue("price");
            //     const stock = this.getDataValue("stock");
            //     return `${fname}(价格：￥${price} 库存：${stock}kg)`;
            // }
        },
        price: {
            type: FLOAT,
            allowNull: false,
            //校验：可以通过校验功能验证模型字段格式、内容，校验会在 create 、 update 和 save 时⾃动运⾏
            validate: {
                isFloat: { msg: '价格字段请输入数字' },
                min: { args: [0], msg: "价格字段必须大于0" }
            }
        },
        stock: { type: INTEGER, defaultValue: 0, isNumeric: { msg: "库存字段请输⼊数字" } },
        id: {
            type: UUID,
            defaultValue: UUIDV1,
            primaryKey: true
        },

    }, {
        timestamps: false,
        // Getters & Setters：定义为options
        getterMethods: {
            amount() {
                return this.getDataValue("stock") + "kg";
            }
        },
        setterMethods: {
            amount(val) {
                const idx = val.indexOf('kg');
                const v = val.slice(0, idx);
                this.setDataValue('stock', v);
            }
        }
    })

    //模型扩展：可添加模型实例⽅法或类⽅法扩展模型
    // 添加类级别⽅法
    Fruit.classify = function (name) {
        const tropicFruits = ['香蕉', '芒果', '椰子']; // 热带水果
        return tropicFruits.includes(name) ? '热带水果' : '其他水果';
    };
    // 添加实例级别⽅法
    Fruit.prototype.totalPrice = function (count) {
        return (this.price * count).toFixed(2);
    };
    // ['香蕉', '草莓'].forEach(f => console.log(f + '是' + Fruit.classify(f)));
    // 同步数据库，force: true则会删除已存在表
    let ret = await Fruit.sync({ force: true })

    ret = await Fruit.create({
        name: '香蕉',
        price: 3.5,
        stock: 20
    })

    ret = await Fruit.update({
        price: 5.6
    }, { where: { name: '香蕉' } })

    ret = await Fruit.findAll({
        where: { price: { [Op.lt]: 6, [Op.gt]: 4 } }
    }).then((fruits) => {
        // console.log(fruits[0]);
        // 修改amount，触发setterMethods
        fruits[0].amount = '150kg'
        fruits[0].save()
        // console.log(`买5kg${fruits[0].name}需要￥${fruits[0].totalPrice(5)}`);
        return fruits
    })
    // console.log('findAll', ret[0].amount, JSON.stringify(ret))

    // console.log(JSON.stringify(ret));
})()