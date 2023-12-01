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
      return sendError(res, 400, "Неверные основные данные клиента");
    }

    if (
      updateDataClient.booking &&
      (!updateDataClient.booking.length ||
        !Array.isArray(updateDataClient.booking) ||
        !updateDataClient.booking.every((item) => item.comedian && item.time))
    ) {
      return sendError(res, 400, "Неверно заполнены поля бронирования");
    }

    const clientData = await fs.readFile(CLIENTS, "utf8");
    const clients = JSON.parse(clientData);

    const clientIndex = clients.findIndex(
      (c) => c.ticket === ticket,
    );

    if (clientIndex === -1) {
      return sendError(res, 404, "Клиент с данныи номером билета не найден");
    }

    // clients[clientIndex] = {
    //     ...clients[clientIndex],
    //     ...updateClient,
    // }
    Object.assign(clients[clientIndex], updateClient) // или так \ более понятно

    await fs.writeFile(CLIENTS, JSON.stringify(clients, false, 2));
    sendData(res, clients[clientIndex]);
  } catch (error) {
    console.error(`error: ${error}`);
    sendError(res, 500, "Ошибка сервера при обновлении данных");
  }
};
