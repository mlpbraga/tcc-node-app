module.exports = (sequelize, types) => {
  const Comments = sequelize.define('Comments', {
    commentId: {
      type: types.INTEGER,
      field: 'comment_id',
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: types.STRING(1024),
      field: 'content',
      allowNull: false,
    },
    replyTo: {
      type: types.STRING(1024),
      field: 'reply_to',
      allowNull: true,
    },
    newsId: {
      type: types.INTEGER,
      field: 'news_id',
      allowNull: false,
    },
    deleted: {
      type: types.BOOLEAN,
      defaultValue: false,
    },
  }, {
    schema: 'public',
    tableName: 'comments',
    timestamps: false,
  });

  Comments.associate = function (models) {
    const { Comments, News, Votes } = models;
    Comments.belongsTo(News, {
      foreignKey: 'news_id',
      sourceKey: 'news_id',
    });
    Comments.hasMany(Votes, {
      foreignKey: 'comment_id',
    });
  };
  return Comments;
};