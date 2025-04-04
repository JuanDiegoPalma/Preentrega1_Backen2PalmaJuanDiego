import { productModel } from '../MONGO/models/products.model.js'

class ProductDaoMongo {
    constructor(){
        this.model = productModel
    }

    get = async () => await productModel.find();
    create = async newProduct => await productModel.create(newProduct)
    getBy = async filterObject => await productModel.findOne(filterObject)
    update = async (pid, productToUpdate) => await productModel.findByIdAndUpdate({_id: uid }, productToUpdate, {new: true})
    delete = async pid => await productModel.findByIdAndDelete({_id: uid})    
}

export default ProductDaoMongo