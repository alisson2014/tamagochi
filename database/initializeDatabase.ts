import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS pets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            uri TEXT NOT NULL,
            favorite INTEGER NOT NULL DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            hunger INTEGER NOT NULL DEFAULT 100,
            sleep INTEGER NOT NULL DEFAULT 100,
            fun INTEGER NOT NULL DEFAULT 100,
            status TEXT NOT NULL DEFAULT 'muito bem'
        );
    `);
};