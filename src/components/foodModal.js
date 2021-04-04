import React, { useState } from 'react';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { 
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  Platform,
  UIManager,
  LayoutAnimation
} from 'react-native';


const FoodModal = ({ foodList, handleModal }) => {
  const [searchText, setSearchText] = useState('');
  const [catList, setCatList ] = useState(foodList)

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }


  const searchList = (val) => {
    let filteredList = [];
    setSearchText(val);
    if(val.length > 0) {
      let searchFilter = val.toLowerCase();
      catList.map((item) => {
        let category = item.category;
        if(category.categoryName.toLowerCase().indexOf(searchFilter) > -1) {
          if(filteredList.indexOf(item) < 0)
          filteredList.push(item);
          return;
        } else {
          category.subcategories[0].items.map((subCat) => {
            console.log("subCat", subCat.toLowerCase(), searchFilter);
            if(subCat.toLowerCase().indexOf(searchFilter) > -1) {
              console.log("inside else if===========");
              if(filteredList.indexOf(item) < 0)
              filteredList.push(item);
              return;
            }
          })
        }
      })
      console.log("filteredList=========", filteredList);
      setCatList([...filteredList]);
    } else {
      setCatList([...foodList])
    }
  }

  handleClick = (index) => {
    let prevVal = catList && catList.length > 0 ? catList[index].isOpen : false;
    let newList = catList;
    newList[index].isOpen = !prevVal;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setCatList([...newList]);
  }

  renderItem = ({ item, index }) => {
    let category = item.category;
    return (
       <View style={styles.rowWrap}>
          <View style={styles.rowContent}>
             <View style={styles.leftContent}>
               <Image style={styles.foodImg} source={require('../assets/images/harvest.png')}/>
                <Text style={[styles.catLabel, {color: category && category.colorCode}]}>
                  {category && category.categoryName} 
                  <Text style={{color: '#000'}}> {
                    category && category.servingSize ? '(' + category.servingSize + ')' : null
                  }
                  </Text>
                </Text>
             </View>
             <View>
             <MaterialIcon
                  onPress = {() => handleClick(index)}
                  name={item.isOpen ? "arrow-drop-up" : "arrow-drop-down"}
                  size={20}
                  color={"#ccc"}
               />
             </View>
          </View>
          {
            item.isOpen &&
            category && category.subcategories && category.subcategories.length > 0 ?
            category.subcategories[0].items.map((subCat) => {
              return (
                <View style={{justifyContent: 'center', borderTopWidth: 1, height: 30, borderColor: '#ccc'}}>
                <Text style={styles.catLabel}>{subCat}</Text>
                </View>
              )
            }) : null
          }
       </View>
    )
  }

  renderHeader = () => {
    return (
      <>
        <View style={styles.headerWrap}>
          <Text style={styles.closeIcon} onPress={() => handleModal()}>
            X
          </Text>
          <Image style={styles.chatImg} source={require('../assets/images/chat.png')}/>
        </View>
        <Text style={styles.topLabel}>
          Approved Food List
        </Text>
      </>
    )
  }

  renderSearchBar = () => {
    return (
      <View style={styles.searchWrap}> 
        <Image style={styles.searchIcon} source={require('../assets/images/search.png')}/>
        <TextInput
          style={{ width: '95%'}}
          value={searchText}
          placeholder='Search'
          onChangeText={searchList}/>
      </View>
    )
  }

  renderFoodList = () => {
    return (
      <FlatList
        extraData={catList}
        data={catList}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{
            paddingBottom: 100
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }

  return (
    <View style={styles.container}>
       {renderHeader()}
       {renderSearchBar()}
       {renderFoodList()}
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f2f2f2', 
    padding: 15
  },

  headerWrap: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 10
  },

  closeIcon: {
    fontSize: 15, 
    fontWeight: 'bold'
  },

  chatImg: {
    height: 30, 
    width: 30, 
    tintColor: '#000080'
  },

  topLabel: {
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 15
  },

  searchWrap: {
    backgroundColor: '#EBF5FB', 
    height: 40, 
    borderRadius: 2, 
    flexDirection: 'row', 
    alignItems: 'center'
  },

  searchIcon: {
    height: 15, 
    width: 15, 
    marginRight: 5, 
    tintColor: '#B2BABB'
  },

  rowWrap: {
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    marginVertical: 5
  },

  rowContent: {
    justifyContent: 'space-between', 
     alignItems: 'center', 
    flexDirection: 'row',
    padding: 3, 
    height: 40,
  },

  leftContent: {
    flexDirection: 'row', 
    alignItems: 'center'
  },

  foodImg: {
    height: 28, 
    width: 28
  },
  
  catLabel: {
    fontSize: 10, 
    marginLeft: 5
  }

});

export default FoodModal;
