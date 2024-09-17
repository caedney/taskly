import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Pressable,
  View,
} from 'react-native';
import theme from '../theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Entypo } from '@expo/vector-icons';

export interface ShoppingListItemProps {
  completed?: boolean;
  name: string;
  onDelete: () => void;
  onToggleComplete: () => void;
}

export default function ShoppingListItem(props: ShoppingListItemProps) {
  const { completed, name, onDelete, onToggleComplete } = props;

  const handleOnDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      'It will be gone for good.',
      [
        {
          text: 'Yes',
          onPress: onDelete,
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
    <Pressable
      style={[styles.itemContainer, completed && styles.completedContainer]}
      onPress={onToggleComplete}
    >
      <View style={styles.row}>
        <Entypo
          name={completed ? 'check' : 'circle'}
          size={24}
          color={completed ? theme.colorGrey : theme.colorCerulean}
        />
        <Text
          numberOfLines={1}
          style={[styles.itemText, completed && styles.completedItemText]}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity onPress={handleOnDelete} activeOpacity={0.6}>
        <AntDesign
          name="closecircle"
          size={24}
          color={completed ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
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
    flex: 1,
    paddingRight: 12,
  },
  completedItemText: {
    textDecorationLine: 'line-through',
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
});
