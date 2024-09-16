import { StyleSheet, TextInput, FlatList, View, Text } from 'react-native';
import theme from '../theme';
import ShoppingListItem from '../components/ShoppingListItem';
import React from 'react';

type ShoppingListItemType = {
  id: string;
  name: string;
};

// const initialList: ShoppingListItemType[] = [
//   { id: '1', name: 'Coffee' },
//   { id: '2', name: 'Tea' },
//   { id: '3', name: 'Idea' },
// ];

// const newList = new Array(1000)
//   .fill(null)
//   .map((item, index) => ({ id: index.toString(), name: index.toString() }));

export default function App() {
  const [value, setValue] = React.useState('');
  const [shoppingList, setShoppingList] = React.useState<
    ShoppingListItemType[]
  >([]);

  const handleSubmit = () => {
    if (value) {
      setShoppingList((prevList) => {
        return [{ id: new Date().toTimeString(), name: value }, ...prevList];
      });
      setValue('');
    }
  };

  return (
    <FlatList
      data={shoppingList}
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
          onSubmitEditing={handleSubmit}
        />
      }
      renderItem={({ item }) => {
        // console.log(item);
        return <ShoppingListItem name={item.name} />;
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingVertical: 16,
    paddingHorizontal: 12,
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
