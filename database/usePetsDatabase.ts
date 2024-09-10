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
            console.log("to aqui");
            const query = 'SELECT id, name, uri, favorite FROM pets WHERE name LIKE ?';
            return await database.getAllAsync<Pet>(query, `%${name}%`);
        } catch (error) {
            throw error;
        }
    }

    async function markFavorite(id: number, favorite: boolean) {
        const stmt = await database.prepareAsync(`UPDATE pets SET favorite = $favorite WHERE id = $id`);

        try {
            const result = await stmt.executeAsync({
                $favorite: favorite,
                $id: id
            });

            const insertedRowId = result.lastInsertRowId;

            return { insertedRowId };
        } catch (error) {
            throw error;
        }
    }

    return { create, searchByName, markFavorite };
};