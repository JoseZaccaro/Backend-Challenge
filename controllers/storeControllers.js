const Store = require('../models/store')
const logger = require('../utils/logger');
const formatStores = require('../utils/storeFormatter')
const pager = require('../utils/pagerAPI')
const { randFullName, randProductCategory, randNumber, randBoolean, randBetweenDate } = require('@ngneat/falso');

const storeController = {

    getStores: async (req, res) => {
        try {

            const queryInfo = req.query
            const q = !!req.query.q ? JSON.parse(req.query.q) : {}

            const { limit, skip, currentPage, pageSize } = pager(queryInfo)

            const total = await Store.find(q).estimatedDocumentCount()
            const totalPages = Math.ceil(total / limit)

            const allStores = formatStores(await Store.find(q).limit(limit).skip(skip).lean().exec());

            res.json({
                data: allStores,
                page: currentPage,
                pages: totalPages,
                limit: pageSize,
                total
            });

        } catch (error) {
            logger.error(error);
            res.json({ success: false, allStores, error });
        }
    },
    postOneStore: async (req, res) => {
        const { name, cuit, concepts, currentBalance, active, lastSale } = req.body;


        // const newStore = new Store({ name, cuit, concepts, currentBalance, active, lastSale})
        // await Store.create(newStore)


        // res.json(newStore)
        res.json("Response")
    },
    poblateStores: async (req, res) => {

        try {
            for (var i = 0; i < 150; i++) {
                let newStore = new Store({})
                newStore.name = randFullName({ withAccents: false });
                newStore.cuit = randNumber({ min: 10, max: 30 }) + "-" + randNumber({ min: 10000000, max: 90000000 }) + "-" + randNumber({ min: 1, max: 9 });
                newStore.concepts = [randProductCategory(), randProductCategory(), randProductCategory(), randProductCategory(), randProductCategory(), randProductCategory()];
                newStore.currentBalance = randNumber({ min: 0, max: 100000000 });
                newStore.active = randBoolean();
                newStore.lastSale = randBetweenDate({ from: new Date('10/07/2000'), to: new Date() });
                await Store.create(newStore);
            }
            logger.info("Seeder successfully poblate with 150 new stores")
            res.json("Seeder successfully poblate with 150 new stores")
        } catch (err) {
            logger.error(err)
            res.json("Seeder failed to poblate stores")
        }

    },
    resetStores: async (req, res) => {
        try {
            await Store.deleteMany()
            logger.info("Seeder successfully delete all stores")
            res.json("Seeder successfully delete all stores")

        } catch (err) {
            logger.error(err)
            res.json("Seeder failed to delete all stores")
        }

    }

}

module.exports = storeController;