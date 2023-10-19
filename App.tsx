import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addItem, deleteItem, updateItem} from './src/itemSlice';
import {RootState} from './src/store/store';

const App: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [isItemVisible, setItemVisible] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [editItem, setEditItem] = useState('');

  const items = useSelector((state: RootState) => state.items.names);
  const dispatch = useDispatch();

  const handleAddItem = () => {
    if (itemName) {
      dispatch(addItem(itemName));
      setItemName('');
    }
  };

  const handleDeleteItem = (index: number) => {
    dispatch(deleteItem(index));
  };

  const handleToggleItems = () => {
    setItemVisible(!isItemVisible);
  };

  const handleEditItem = (index: number) => {
    setUpdateIndex(index);
    setEditItem(items[index]);
  };

  const handleSaveEdit = () => {
    if (updateIndex >= 0 && editItem) {
      dispatch(updateItem({index: updateIndex, updatedName: editItem}));
      setUpdateIndex(-1);
      setEditItem('');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TextInput
          value={itemName}
          placeholder="Item Name"
          onChangeText={setItemName}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Item" onPress={handleAddItem} color={'#050541'} />
          <Button
            title={isItemVisible ? 'Hide Items' : 'Show Items'}
            onPress={handleToggleItems}
            color={'#050541'}
          />
        </View>
      </View>
      {isItemVisible && (
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={styles.item}>
              {updateIndex === index ? (
                <TextInput
                  value={editItem}
                  onChangeText={setEditItem}
                  style={styles.editInput}
                />
              ) : (
                <Text style={styles.itemText}>{item}</Text>
              )}
              {updateIndex === index ? (
                <Button
                  title="Save"
                  onPress={handleSaveEdit}
                  color={'#565658'}
                />
              ) : (
                <Button
                  title="Edit"
                  onPress={() => handleEditItem(index)}
                  color={'#373739'}
                />
              )}
              <Button
                title="Delete"
                onPress={() => handleDeleteItem(index)}
                color={'#050541'}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    gap: 5,
  },
  input: {
    borderColor: '#0f062c',
    borderWidth: 1,
    width: '50%',
    padding: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    gap: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    gap: 5,
    width: '90%',
    borderBottomColor: '#8080808e',
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  itemText: {
    width: '60%',
    fontSize: 16,
    color: '#050541',
    fontWeight: '500',
  },
  editInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: '59%',
    padding: 5,
  },
});

export default App;
