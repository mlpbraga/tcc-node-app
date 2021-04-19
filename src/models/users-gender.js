module.exports = (sequelize, types) => {
  const UserGender = sequelize.define('UserGender', {
    userId: {
      primaryKey: true,
      type: types.STRING(100),
      field: 'user_id',
      allowNull: false,
    },
    gender: {
      type: types.STRING(50),
      field: 'gender',
      allowNull: false,
      unique: true,
    },
  }, {
    schema: 'public',
    tableName: 'user_gender',
    timestamps: false,
  });

  UserGender.associate = function (models) {
    const { Users } = models;
    UserGender.belongsTo(Users, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });
  };
  return UserGender;
};
