const assert = require("assert");
const mongoose = require("mongoose");
const Post = require("Post");
const User = require("User");

describe("Post model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("saves a post to the database", async () => {
    // Create a new post
    const post = new Post({
      userId: "123",
      desc: "Hello world",
      img: "https://example.com/image.jpg",
      constellation: "Aries",
      likes: ["456", "789"],
    });

    // Save the post to the database
    const savedPost = await post.save();

    // Retrieve the post from the database
    const retrievedPost = await Post.findById(savedPost._id);

    // Expect the retrieved post to be equal to the saved post
    expect(retrievedPost).toMatchObject(savedPost);
  });
});

describe("User model", function () {
  before(function (done) {
    // Connect to test database
    mongoose.connect(
      "mongodb://localhost/test-db",
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Connected to test database");
        }
        done();
      }
    );
  });

  after(function (done) {
    // Disconnect from test database
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });

  it("should create a new user", function (done) {
    // Create a new user
    const newUser = new User({
      username: "testuser",
      email: "testuser@example.com",
      password: "password",
    });

    // Save the user to the test database
    newUser.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        // Find the user in the test database
        User.findOne({ username: "testuser" }, function (err, user) {
          if (err) {
            console.log(err);
          } else {
            // Check that the user was found and has the correct properties
            assert.strictEqual(user.username, "testuser");
            assert.strictEqual(user.email, "testuser@example.com");
            assert.strictEqual(user.password, "password");
            done();
          }
        });
      }
    });
  });
});
