const SETTINGS = require('../settings')

/**
 * @description The Model from which all other models will inherit. Has basic functionality for connecting to the DB.
 * @authors Jack
 */
class BaseModel{

    constructor(){
    }

    /**
     * @description Returns the name of the table in the database. Subclasses must overwrite this.
     * @returns String The table name in the database.
     * @private
     * @author
     */
    get __TABLE(){throw "Not implemented"}

    /**
     * @description Returns an Object containing the values from a single row. Since this shall be statically called, we need
     * to pass in the super class in the argument "model".
     * @param id The id of the row as it appears in the database. Must be an integer.
     * @param model {BaseModel} The model of the object that is being created
     * @returns BaseModel The instantiated object of this class
     * @author Jack
     */
    static getSingleRowById(id, model){
        let table = model.__TABLE
        let data = { id: id} // Placeholder, the actual values of the result should be stored in here.
        // TODO: Add MySQL query commands lookup the item in the DB
        let mappedObject = model.objectMapper(data)
        return mappedObject
    }

    /**
     * @description Takes the response from the database, and instantiates an object of this class and fills its values with this data.
     * @param data The data from the database
     * @returns BaseModel The instantiated object of this class
     * @author Jack
     */
    static objectMapper(data){
        let obj = BaseModel()
        return obj
    }
}

// Required. This specifies what will be imported by other files
module.exports = BaseModel