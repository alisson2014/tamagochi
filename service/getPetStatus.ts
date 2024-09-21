import { PetStatus } from "@/types";

export const getPetStatus = (fun: number, sleep: number, hunger: number): PetStatus => {
    const sum = fun + sleep + hunger;

    if (sum <= 0) {
        return "morto";
    } else if (sum > 0 && sum <= 50) {
        return "crítico";
    } else if (sum > 50 && sum <= 100) {
        return "muito triste";
    } else if (sum > 100 && sum <= 150) {
        return "triste";
    } else if (sum > 150 && sum <= 200) {
        return "ok";
    } else if (sum > 200 && sum <= 250) {
        return "bem";
    } else {
        return "muito bem";
    }
};