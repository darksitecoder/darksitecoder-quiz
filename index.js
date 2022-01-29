import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Who Knows Sumit Better ? \n");

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right...
  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");

    console.log(
      chalk.green(
        `Congratulation You Knows Sumit Much Better Then Ever \n If You See This Message Take A Screenshot And Send It To Sumit`
      )
    );
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: 'What is Sumit"s favorite food \n',
    choices: ["Rajma Chawal", "Roasted Chicken", "Pasta", "Momos"],
  });

  return handleAnswer(answers.question_1 === "Rajma Chawal");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: 'What is Sumit"s Birth Date\n',
    choices: ["4", '"28"', '"27"', "20"],
  });
  return handleAnswer(answers.question_2 === '"28"');
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: `Which Is Sumit"s Favorite Place\n`,
    choices: ["Kedarnath", "Ayodhya", "Kolkata", "Kashmir"],
  });

  return handleAnswer(answers.question_3 === "Kedarnath");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: 'Which is Sumit"s favorite language\n',
    choices: [
      "Java",
      "C++",
      "Python",
      "JavaScript", // Correct
    ],
  });
  return handleAnswer(answers.question_4 === "Java");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "How you considered Sumit as Person ?\n",
    choices: [
      "Have a lot attitude",
      "Arrogant",
      "Caring & Lovable",
      "All of the above mentioned",
    ],
  });

  return handleAnswer(answers.question_5 === "All of the above mentioned");
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
