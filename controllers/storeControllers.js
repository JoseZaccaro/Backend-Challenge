const Store = require('../models/store')
const logger = require('../utils/logger');

const storeController = {

    getStores: async (req, res) => {
        try {

            const queryInfo = req.query
            const q = !!req.query.q ? JSON.parse(req.query.q) : {}

            const currentPage = Number(queryInfo?.page) ||  1;//2
            const pageSize = Number(queryInfo?.limit) || Number(queryInfo?.size) || 1000; //10

            const skip = pageSize * (currentPage - 1);
            const limit = pageSize;
            const total = await Store.find(q).estimatedDocumentCount()
            const totalPages = Math.ceil(total / limit) 
            const allStores = await Store.find(q).limit(limit).skip(skip).exec();
            
            const response = {
                data: allStores, 
                page: currentPage,
                pages: totalPages,
                limit: pageSize,
                total
            }

            res.json(response);
        } catch (error) {
            logger.error(error);
            res.json({ success: false, allStores, error });
        }
    },
    postOneStore: async (req, res) => {
        const { name, cuit, concepts, currentBalance, active, lastSale } = req.body;

        const newStore = new Store({ name, cuit, concepts, currentBalance, active, lastSale})

        await Store.create(newStore)
        
         

        res.json(newStore)
    }

}

module.exports = storeController;