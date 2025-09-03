const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor() { }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {

    const options = {
      include: ['category']
    }

    const { limit, offset } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
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
