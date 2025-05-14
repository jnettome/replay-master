import { ServiceBroker } from "moleculer";
import { pathToFileURL } from "url";
import { glob } from "glob";
import { config as dotenv } from "dotenv";
import config from "./dist/moleculer.config.js";

// Load environment variables from .env file
dotenv();

const broker = new ServiceBroker(config);

const serviceFiles = await glob("dist/services/**/*.service.js", { absolute: true });

for (const file of serviceFiles) {
  const serviceModule = await import(pathToFileURL(file));
  broker.createService(serviceModule.default);
}

await broker.start();
