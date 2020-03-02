'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('deliveries', { 
        id: {
            type:Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        //Referencia a destinatario
        recipient_id:{
            type: Sequelize.INTEGER,
            allowNull: true,
            //fk-recipient
            references:{model:'recipients',key:'id'},
            onUpdate:'CASCADE',
            onDelete:'SET NULL',

        }, 
        //Referencai ao entregador
        deliveryman_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'deliverymen', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        //Referencia o arquivo de assinatura do destinatario
        signature_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'files', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        product:{
          type:Sequelize.STRING,
          allowNull:false,
        },
        canceled_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },);
    
  },

  down: (queryInterface) => {
   
      return queryInterface.dropTable('deliveries');
    
  }
};
