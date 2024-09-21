import { PetStatus } from "@/types";

export const getStatusColor = (status: PetStatus) => {
    switch(status) {
        case 'morto':
            return '#808080'; 
        case 'crítico':
            return '#FF0000'; 
        case 'muito triste':
            return '#00008B'; 
        case 'triste':
            return '#0000FF'; 
        case 'ok':
            return '#FFFF00'; 
        case 'bem':
            return '#90EE90';
        case 'muito bem':
            return '#008000';
        default:
            return '#000000';
    }
};