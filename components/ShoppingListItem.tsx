import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import theme from '../theme';
import AntDesign from '@expo/vector-icons/AntDesign';

export interface ShoppingListItemProps {
  completed?: boolean;
  name: string;
}

export default function ShoppingListItem(props: ShoppingListItemProps) {
  const { completed, name } = props;

  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      'It will be gone for good.',
      [
        {
          text: 'Yes',
          onPress: () => console.log('Ok deleting'),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <View
      style={[styles.itemContainer, completed && styles.completedContainer]}
    >
      <Text style={[styles.itemText, completed && styles.completedItemText]}>
        {name}
      </Text>
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
        <AntDesign
          name="closecircle"
          size={24}
          color={completed ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 200,
  },
  completedItemText: {
    textDecorationLine: 'line-through',
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  },
});
