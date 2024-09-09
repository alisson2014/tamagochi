import { mainTitle, scrollViewContainer } from '@/styles';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Bookmark() {
  return (
    <SafeAreaView style={{ height: '100%' }}>
        <ScrollView style={scrollViewContainer}>
            <Text style={mainTitle}>Bichinhos favoritos (BETA)</Text>
        </ScrollView>
    </SafeAreaView>
  );
};