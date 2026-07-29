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
    ]);

    await Answer.bulkCreate([
      {
        body: "Make sure your .env file has the correct DATABASE_URL.",
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
