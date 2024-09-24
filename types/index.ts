export type PetStatus = "morto" | "crítico" | "muito triste" | "triste" | "ok" | "bem" | "muito bem";

export type Pet = {
    id: number;
    name: string;
    uri: string;
    favorite: boolean;
    created_at: string;
    hunger: number;
    sleep: number;
    fun: number;
    status: PetStatus;
    is_sleeping: boolean;
    sleep_start_time: string;
};

export type NewPet = Pick<Pet, "name" | "uri">;