import { StyleSheet, Text } from "react-native";
import { getPetStatus } from "@/service";
import { Pet } from "@/types";
import { getStatusColor } from "@/service";

type PetTitleProps = {
    pet: Pet;
};

export default function PetTitle({ pet }: PetTitleProps) {
    const { name, fun, sleep, hunger } = pet;

    const status = getPetStatus(fun, sleep, hunger);

    return (
        <Text style={styles.title}>
            {name}
            {' '}
            <Text style={[styles.status, { color: getStatusColor(status) }]}>({status})</Text>
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