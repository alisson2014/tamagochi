import { StyleSheet } from "react-native";

export const petDetailsStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 32
    },
    petContainer: {
      display: 'flex',
      gap: 32
    },
    detailsTop: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    detailsAttributes: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
    },
    name: {
      fontSize: 24,
      fontFamily: 'Poppins-ExtraBold',
      fontWeight: 'bold',
      marginTop: 16,
    },
    status: {
      fontSize: 18,
      fontFamily: 'Poppins-Regular',
    },
    attributeText: {
      fontSize: 18,
      fontFamily: 'Poppins-Regular',
    },
    petImage: {
      width: '100%',
      height: 320,
      borderRadius: 272,
    },
    actionOptions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    actionButton: {
      backgroundColor: '#d8c852',
      padding: 20,
      borderRadius: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionButtonDisabled: {
      backgroundColor: '#999',
    },
    actionOptionText: {
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
    }
  });