import { NewPet, Pet } from '@/types';
import { useSQLiteContext } from 'expo-sqlite';

export function usePetsDatabase() {
    const database = useSQLiteContext();

    async function create(pet: NewPet) {
        const stmt = await database.prepareAsync(
            `INSERT INTO pets (name, uri, sleep) VALUES ($name, $uri, 30)`
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
            const query = 'SELECT * FROM pets WHERE name LIKE ?';
            return await database.getAllAsync<Pet>(query, `%${name}%`);
        } catch (error) {
            throw error;
        }
    };

    async function searchByNameFavorite(name: string) {
        try {
            const query = 'SELECT * FROM pets WHERE name LIKE ? AND favorite = 1';
            return await database.getAllAsync<Pet>(query, `%${name}%`);
        } catch (error) {
            throw error;
        }
    };

    async function getById(id: number) {
        try {
            const query = 'SELECT * FROM pets WHERE id = ?';
            return await database.getFirstAsync<Pet>(query, id);
        } catch (error) {
            throw error;
        }
    }

    async function toggleFavorite(id: number, favorite: boolean) {
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
    };

    async function remove(id: number) {
        const stmt = await database.prepareAsync(`DELETE FROM pets WHERE id = $id`);

        try {
            const result = await stmt.executeAsync({ $id: id });

            const insertedRowId = result.lastInsertRowId;

            return { insertedRowId };
        } catch (error) {
            throw error;
        } finally {
            await stmt.finalizeAsync();
        }
    };

    async function eat(id: number) {
        const stmt = await database.prepareAsync(`
            UPDATE pets 
            SET hunger = MIN(hunger + 10, 100) 
            WHERE id = $id
        `);

        try {
            await stmt.executeAsync({ $id: id });
        } catch (error) {
            throw error;
        } finally {
            await stmt.finalizeAsync();
        }
    }

    async function reduceAttributes() {
        const stmt = await database.prepareAsync(`
            UPDATE pets 
            SET 
                sleep = CASE WHEN sleep > 0 THEN sleep - 1 ELSE 10 END,
                hunger = CASE WHEN hunger > 0 THEN hunger - 1 ELSE 10 END,
                fun = CASE WHEN fun > 0 THEN fun - 1 ELSE 10 END
            WHERE sleep > 0 OR hunger > 0 OR fun > 0
        `);

        try {
            await stmt.executeAsync();
        } catch (error) {
            throw error;
        } finally {
            await stmt.finalizeAsync();
        }
    }

    async function putPetToSleep(id: number) {
        const sleepStartTime = new Date().toISOString();
        const stmt = await database.prepareAsync(`
            UPDATE pets 
            SET is_sleeping = 1, sleep_start_time = $sleepStartTime 
            WHERE id = $id
        `);
    
        try {
            await stmt.executeAsync({ $sleepStartTime: sleepStartTime, $id: id });
        } catch (error) {
            throw error;
        } finally {
            await stmt.finalizeAsync();
        }
    }

    async function wakePetUp(id: number) {
        const pet = await database.getFirstAsync<Pet>(`
            SELECT sleep_start_time, sleep 
            FROM pets 
            WHERE id = $id AND is_sleeping = 1
        `, { $id: id });
    
        if (!pet) {
            throw new Error('Pet is not sleeping or does not exist');
        }
    
        const sleepStartTime = new Date(pet.sleep_start_time);
        const currentTime = new Date();
        const sleepDurationHours = (currentTime.getTime() - sleepStartTime.getTime()) / (1000 * 60);
        const sleepIncrease = Math.min(Math.floor(sleepDurationHours * 5), 100 - pet.sleep);
    
        const stmt = await database.prepareAsync(`
            UPDATE pets 
            SET is_sleeping = 0, sleep_start_time = NULL, sleep = sleep + $sleepIncrease 
            WHERE id = $petId
        `);
    
        try {
            await stmt.executeAsync({ $sleepIncrease: sleepIncrease, $petId: id });
        } catch (error) {
            throw error;
        } finally {
            await stmt.finalizeAsync();
        }
    }

    return { 
        create, 
        searchByName, 
        toggleFavorite, 
        searchByNameFavorite, 
        remove,
        getById,
        reduceAttributes,
        eat,
        putPetToSleep,
        wakePetUp
    };
};