import { CLIENTS } from "../index.js";
import { readRequestBody } from "./helpers.js";
import { sendData, sendError } from "./send.js";
import fs from "node:fs/promises";

export const handleUpdateClient = async (req, res, ticket) => {
  try {
    const body = await readRequestBody(req);
    const updateDataClient = JSON.parse(body);

    if (
      !updateDataClient.fullName ||
      !updateDataClient.phone ||
      !updateDataClient.ticket ||
      !updateDataClient.booking
    ) {
      sendError(res, 400, "Неверные основные данные клиента");
      return;
    }

    if (
      updateDataClient.booking &&
      (!updateDataClient.booking.length ||
        !Array.isArray(updateDataClient.booking) ||
        !updateDataClient.booking.every((item) => item.comedian && item.time))
    ) {
      sendError(res, 400, "Неверно заполнены поля бронирования");
      return;
    }

    const clientData = await fs.readFile(CLIENTS, "utf8");
    const clients = JSON.parse(clientData);

    const clientIndex = clients.findIndex(
      (c) => c.ticket === ticket,
    );

    if (clientIndex === -1) {
      sendError(res, 404, "Клиент с данныи номером билета не найден");
    }

    clients[clientIndex] = {
      ...clients[clientIndex],
      ...updateDataClient,
    };

    await fs.writeFile(CLIENTS, JSON.stringify(clients, false, 2));
    sendData(res, clients[clientIndex]);
  } catch (error) {
    console.error(`error: ${error}`);
    sendError(res, 500, "Ошибка сервера при обновлении данных");
  }
};
