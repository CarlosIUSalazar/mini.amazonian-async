const fs = require("fs");
const { readFile, produceResult } = require("./helpers");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    return produceResult({ products, reviews, users });
  }

  buildReviewsCallbacks(cb) {
    fs.readFile("./data/products.json", "utf8", (err, products) => {
      if (err) throw err;
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
        fs.readFile("./data/users.json", "utf8", (err, users) => {
          if (err) throw err;
          products = JSON.parse(products);
          reviews = JSON.parse(reviews);
          users = JSON.parse(users);
          cb(produceResult({ products, reviews, users }));
        });
      });
    });
  }

  buildReviewsPromises() {
    return Promise.all([
      readFile("./data/products.json"),
      readFile("./data/reviews.json"),
      readFile("./data/users.json"),
    ]).then((data) => {
      const result = [];
      const files = {};
      data.forEach((data) => result.push(JSON.parse(data)));
      //console.log("AAAAAAAAAA", JSON.parse(data[0]));
      files.products = result[0];
      files.reviews = result[1];
      files.users = result[2];
      return produceResult(files);
    });
  }

  async buildReviewsAsyncAwait() {
    //   // FIXME
    const data = await Promise.all([
      readFile("./data/products.json"),
      readFile("./data/reviews.json"),
      readFile("./data/users.json"),
    ]);
    const result = [];
    const files = {};
    data.forEach((data) => result.push(JSON.parse(data)));
    //console.log("AAAAAAAAAA", JSON.parse(data[0]));
    files.products = result[0];
    files.reviews = result[1];
    files.users = result[2];
    return produceResult(files);
  }
}

module.exports = ReviewBuilder;
