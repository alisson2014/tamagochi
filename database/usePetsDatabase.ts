import { NewPet, Pet } from '@/types';
import { useSQLiteContext } from 'expo-sqlite';

export function usePetsDatabase() {
    const database = useSQLiteContext();

    async function create(pet: NewPet) {
        const stmt = await database.prepareAsync(
            `INSERT INTO pets (name, uri) VALUES ($name, $uri)`
        );

        try {
            const result = await stmt.executeAsync({
                $name: pet.name,
                $uri: pet.uri
            });

            const insertedRowId = result.lastInsertRowId.toLocaleString();

            return { insertedRowId };
        } catch (error) {
            throw error;
        } finally {
            await stmt.finalizeAsync();
        }
    };

    async function searchByName(name: string) {
        try {
            const query = 'SELECT id, name, uri, favorite FROM pets WHERE name LIKE ?';
            return await database.getAllAsync<Pet>(query, `%${name}%`);
        } catch (error) {
            throw error;
        }
    }

    return { create, searchByName };
};