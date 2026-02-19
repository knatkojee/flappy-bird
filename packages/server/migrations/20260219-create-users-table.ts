import { type QueryInterface, DataTypes } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'light',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    })

    await queryInterface.addIndex('users', ['login'], {
      name: 'users_login_idx',
      unique: true,
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users')
  },
}
