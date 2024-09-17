import {
  StyleSheet,
  TextInput,
  FlatList,
  View,
  Text,
  LayoutAnimation,
} from 'react-native';
import theme from '../theme';
import ShoppingListItem from '../components/ShoppingListItem';
import React from 'react';
import { getFromStorage, saveToStorage } from '../utils/storage';
import * as Haptics from 'expo-haptics';

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

const storageKey = 'shopping-list';

export default function App() {
  const [value, setValue] = React.useState('');
  const [shoppingList, setShoppingList] = React.useState<
    ShoppingListItemType[]
  >([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getFromStorage(storageKey);

      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShoppingList(data);
      }
    };

    fetchData();
  }, []);

  const handleOnSubmitEditing = () => {
    if (value) {
      const newShoppingList = [
        {
          id: new Date().toTimeString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ];

      saveToStorage(storageKey, newShoppingList);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
      setValue('');
    }
  };

  const handleOnDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);

    saveToStorage(storageKey, newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShoppingList(newShoppingList);
  };

  const handleToggleOnComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        if (item.completedAtTimestamp) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        return {
          ...item,
          lastUpdatedTimestamp: Date.now(),
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
        };
      }

      return item;
    });

    saveToStorage(storageKey, newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
      data={orderShoppingList(shoppingList)}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={() => (
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      )}
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder="Coffee"
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleOnSubmitEditing}
        />
      }
      renderItem={({ item }) => {
        return (
          <ShoppingListItem
            name={item.name}
            completed={Boolean(item.completedAtTimestamp)}
            onDelete={() => handleOnDelete(item.id)}
            onToggleComplete={() => handleToggleOnComplete(item.id)}
          />
        );
      }}
    />
  );
}

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }

    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }

    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingVertical: 16,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  listEmptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
  },
  textInput: {
    backgroundColor: theme.colorWhite,
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
});
