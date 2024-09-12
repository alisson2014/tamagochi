export type Pet = {
    id: number;
    name: string;
    uri: string;
    favorite: boolean;
    created_at: string;
    hunger: number;
    sleep: number;
    fun: number;
    status: string;
};

export type NewPet = Pick<Pet, "name" | "uri">;