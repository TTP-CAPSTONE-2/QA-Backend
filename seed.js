// db/seed.js — reset the tables and fill them with sample data.  Run: npm run seed
// Gives you (and your teammates) the same predictable rows to build against.
require("dotenv").config();
const { db, User, Question, Answer } = require("./models");

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log("🌱 Database reset.");

    // const users = await User.bulkCreate([
    //   { username: "coder123", email: "coder@example.com" },
    //   { username: "dev_guru", email: "guru@example.com" },
    // ]);
    const questions = await Question.bulkCreate([
      {
        title: "How do I connect Sequelize to Postgres?",
        body: "I am trying to set up my connection string but keep getting errors.",
        // userId: users[0].id,
      },
      {
        title: "What is the difference between let and var?",
        body: "When should I use let instead of var in modern JavaScript?",
        // userId: users[1].id,
      },
      {
        title: "How does the JavaScript event loop work?",
        body: "I understand callbacks, but I am confused about microtasks and macrotasks execution order.",
        // userId: users[2].id,
      },
      {
        title: "What is the purpose of useEffect dependency array?",
        body: "My React component keeps re-rendering infinitely. How do I properly manage dependencies?",
        // userId: users[3].id,
      },
      {
        title: "How do I implement JWT authentication in Express?",
        body: "I need to secure my API routes. What is the best practice for storing tokens on the client?",
        // userId: users[4].id,
      },
      {
        title: "What is a deadlock in relational databases?",
        body: "My application occasionally hangs during concurrent transactions. How do I prevent this?",
        // userId: users[5].id,
      },
      {
        title: "When should I use Redis in my stack?",
        body: "My database queries are getting slow. Is Redis only for session storage or caching too?",
        // userId: users[6].id,
      },
      {
        title: "How do I handle file uploads in Node.js?",
        body: "I want to accept images from a multipart form and upload them directly to an S3 bucket.",
        // userId: users[7].id,
      },
      {
        title: "What is the difference between SQL and NoSQL?",
        body: "I am starting a new project and cannot decide between PostgreSQL and MongoDB.",
        // userId: users[8].id,
      },
      {
        title: "How do I optimize Docker image sizes?",
        body: "My Node.js production image is over 1GB. How can I use multi-stage builds to shrink it?",
        // userId: users[9].id,
      },
    ]);

    await Answer.bulkCreate([
      {
        content: "Make sure your .env file has the correct DATABASE_URL.",
        questionId: questions[0].id,
        // userId: users[1].id,
      },
    ]);

    console.log("🌱 Sample Q&A data created.");
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
  } finally {
    await db.close();
    console.log("🌱 Done. Connection closed.");
  }
};

seed();
