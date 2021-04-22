import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  Touchable,
  TouchableOpacity,
  Dimensions
} from 'react-native';


const FeedList = ({ feedData, handleModal }) => {
  console.log("render in feed ===", feedData);
  const[showWeb, setShowWeb] = useState(false);
  const[link, setLink] = useState('');

  handleClick = (link) => {
    setShowWeb(true);
    setLink(link);
  }

  closeWeb = () => {
    setShowWeb(false);
    setLink('');
  }

  renderItem = ({ item, index }) => {
    console.log("item======", item);
    return (
       <TouchableOpacity onPress={() => handleClick(item.link)} style={styles.rowWrap}>
          <View style={styles.rowContent}>
             <Text style={styles.topLabel}>{item.title}</Text>
             <Text style={styles.descLabel}>{item.description}</Text>
          </View>
       </TouchableOpacity>
    )
  }

  renderFeedList = () => {
    return (
      <FlatList
        data={feedData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{
            paddingBottom: 100
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }


  renderWebView = () => {
    return(
      <>
       <Icon name={"close"} size={25} style={{margin: 10}} onPress={() => closeWeb()}/>
      <WebView source={{ uri: link }} 
       style = {styles.webStyle}
       mixedContentMode="always"
      originWhitelist={['*']}/>
      </>
    )
  }

  return (
    
    <View style={styles.container}>
       {showWeb ? renderWebView() : renderFeedList()}
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f2f2f2', 
    padding: 15
  },


  topLabel: {
    fontSize: 12, 
    fontWeight: 'bold', 
    marginBottom: 15,
    textAlign: 'center',
  },

  descLabel: {
    fontSize: 12, 
    marginBottom: 15,
    textAlign: 'center',
  },

  rowWrap: {
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    marginVertical: 5
  },

  rowContent: {
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 3, 
  },
  
  webStyle: {
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height 
  },

});

export default FeedList;
