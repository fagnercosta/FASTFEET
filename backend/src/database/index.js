import Sequelize from 'sequelize';

import User from '../app/model/User';
import Recipient from '../app/model/Recipient';
import File from '../app/model/File';
import Deliveryman from '../app/model/Deliveryman';
import Delivery from '../app/model/Delivery';
import databaseConfig from '../config/database';  

const models = [User, Recipient,File,Deliveryman,Delivery];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
