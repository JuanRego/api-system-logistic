import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import "reflect-metadata";

const prodDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: false,
  logging: true,
  entities: ["dist/src/models/*/*.js"],
  migrations: ["dist/src/migrations/*.js"],
};

const devDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: "postgres://postgres:9552@localhost:5432/carlos_logistica_teste",
  ssl: false,
  synchronize: true,
  logging: true,
  entities: ["src/models/*/*.ts"],
  migrations: ["src/migrations/*.ts"],
};

const testDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: "postgres://postgres:9552@localhost:5432/carlos_logistica_teste",
  synchronize: true,
  logging: false,
  entities: ["src/models/*/*.ts"],
  dropSchema: true,
};

let currentDataSourceOptions = devDataSourceOptions;

if (process.env.NODE_ENV === "production") {
  currentDataSourceOptions = prodDataSourceOptions;
} else if (process.env.NODE_ENV === "test") {
  currentDataSourceOptions = testDataSourceOptions;
}

export const AppDataSource = new DataSource(currentDataSourceOptions);

if (process.env.NODE_ENV !== "test") {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source Initialized");
    })
    .catch((err) => {
      console.log("Error during Data Source Initialization", err);
    });
}
