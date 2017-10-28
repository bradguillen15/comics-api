const credentials = () => ({
  database: {
    hostname: 'myudappdb.cnxbtyigrqke.us-east-1.rds.amazonaws.com',
    name: 'app',
    port: 3306,
    username: 'administrator',
    password: 'UltraDoujinshi2017',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  },
  server: {
    port: 3000,
    routes: Object.freeze([
      { uri: '/user', module: './src/user/userRouter' },
      { uri: '/comic', module: './src/comic/comicRouter' },
    ])
  }
});

module.exports = credentials();
