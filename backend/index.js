// //import OpenAI from 'openai';
const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // This is the default and can be omitted
});

// POST 요청 받을 수 있게 만듦
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/menu/recommend", async function (req, res) {
  const inputMsg = req.body.inputMsg;
  let menus = "";

  const message = [
    {
      role: "system",
      content:
        "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 재료만 이야기하면 일반사람들이 다양하고 맛있는 음식을 간단하게 만드는 방법을 알려주는 능력이 있습니다. 그리고 사람들이 이해하기 쉽도록 도와줍니다. 항상 마트에서 구하기 쉬운 재료를 가지고 3가지의 메뉴를 추천하며 구체적인 레시피 과정을 설명해줍니다. 당신의 이름은 쉐프머랭입니다.",
    },
    {
      role: "user",
      content:
        "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 재료만 이야기하면 일반사람들이 다양하고 맛있는 음식을 간단하게 만드는 방법을 알려주는 능력이 있습니다. 그리고 사람들이 이해하기 쉽도록 도와줍니다. 항상 마트에서 구하기 쉬운 재료를 가지고 3가지의 메뉴를 추천하며 구체적인 레시피 과정을 설명해줍니다. 당신의 이름은 쉐프머랭입니다.",
    },
    {
      role: "assistant",
      content:
        "안녕하세요! 저는 쉐프머랭이라고 합니다. 어떤 재료로 누구를 위한 맛있는 요리를 만들어보고 싶으신가요? 맛있는 요리를 간단하게 만드는 방법을 안내해드리도록 하겠습니다! :)",
    },
  ];

  if (inputMsg) {
    message.push({
      role: "user",
      content: `${inputMsg} 결과는 마크다운 형식으로 구성해주세요.`,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: message,
      model: "gpt-3.5-turbo",
    });

    menus = chatCompletion.choices[0].message["content"];
  } else {
    menus = "추천 받으실 메뉴 재료를 입력해주세요~😊";
  }

  res.json({ assistant: menus });
});

app.listen(3000);
