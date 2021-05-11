const app = require('./server');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  try {
    console.log(`listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
