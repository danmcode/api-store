const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {

  constructor() { }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {

    const options = {
      include: ['category'],
      where: {},
    }

    const { limit, offset, price, price_min, price_max } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      };
    } 2

    if (price) {
      options.where.price = price;
    }

    const products = await models.Product.findAll({
      options,
    });
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);

    if (!product) {
      throw boom.notFound('product not found');
    }

    if (product.isBlock) {
      throw boom.conflict('product is block');
    }

    return product;
  }

  async update(id, changes) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  async delete(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    await product.destroy();
    return { id };
  }

}

module.exports = ProductsService;
