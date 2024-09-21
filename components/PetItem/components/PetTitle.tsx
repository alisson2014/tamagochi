import { StyleSheet, Text } from "react-native";
import { getPetStatus } from "@/service";
import { Pet } from "@/types";

type PetTitleProps = {
    pet: Pet;
};

export default function PetTitle({ pet }: PetTitleProps) {
    const { name, fun, sleep, hunger } = pet;

    const status = getPetStatus(fun, sleep, hunger);

    const statusColor = () => {
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

    return (
        <Text style={styles.title}>
            {name}
            {' '}
            <Text style={[styles.status, { color: statusColor() }]}>({status})</Text>
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '700',
        fontSize: 20,
        color: '#161622'
    },
    status: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14
    },
});