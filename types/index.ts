export type Pet = {
    id: number;
    name: string;
    uri: string;
    favorite: boolean;
};

export type NewPet = Omit<Pet, "id" | "favorite">;