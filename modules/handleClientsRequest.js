import fs from "node:fs/promises";
import { sendData, sendError } from "./send.js";
import { CLIENTS } from "../index.js";

export const handleClientsRequest = async (req, res, ticket) => {
  try {
    const clientData = await fs.readFile(CLIENTS, "utf8");
    const clients = JSON.parse(clientData);

    console.log('handleClientsRequest:', handleClientsRequest)
    if(!ticket)
      return sendData(res, clients);

    const client = clients.find((c) => c.ticket === ticket);

    if (!client) {
      return sendError(res, 404, "Клиент с данным номером билета отсутвует");
    }

    sendData(res, client);
  } catch (error) {
    console.error(`Ошибка при обработке запроса: ${error}`);
    sendError(res, 500, "Ошибка сервера при обработке запроса клиента");
  }
};
