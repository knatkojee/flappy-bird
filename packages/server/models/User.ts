import { Table, Column, Model, DataType, Index } from 'sequelize-typescript'

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number

  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  login!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'light',
    validate: {
      isIn: [['light', 'dark']],
    },
  })
  theme!: string
}
