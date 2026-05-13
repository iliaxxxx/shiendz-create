import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const MINI_APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

async function sendMessage(chatId: number, text: string, extra?: object) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", ...extra }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();
    const message = update.message;

    if (!message?.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = message.text.trim();

    if (text === "/start") {
      await sendMessage(
        chatId,
        "<b>Shiendz Create</b> \n\nСоздавай крутые картинки из своих фото с помощью AI!\n\n20+ шаблонов: аватарки, стикеры, арт, мемы и многое другое.",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Открыть Shiendz Create",
                  web_app: { url: MINI_APP_URL },
                },
              ],
            ],
          },
        }
      );
    } else if (text === "/help") {
      await sendMessage(
        chatId,
        "Нажми кнопку ниже, чтобы открыть приложение.\n\nВ приложении:\n1. Выбери шаблон\n2. Загрузи фото\n3. Получи результат!\n\nПо вопросам: @shiendzbot",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Открыть",
                  web_app: { url: MINI_APP_URL },
                },
              ],
            ],
          },
        }
      );
    } else {
      await sendMessage(chatId, "Используй /start чтобы начать!");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Bot webhook error:", err);
    return NextResponse.json({ ok: true });
  }
}
