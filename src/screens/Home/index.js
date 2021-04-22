import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'

import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'

import styles from './styles'
import FeedAction from '../../Stores/Feed';
import FeedComponent from '../../components/Feed';

class Home extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false
    }
  }
   
  componentDidMount() {
    this.setState({isLoading: false},  () => {
      this.props.getFeed();
    })
  }


  componentDidUpdate(prevProps) {
    const { FeedList } = this.props;
    console.log("feddlist========", FeedList);
    if(prevProps.FeedList.data !== FeedList.data && !FeedList.isLoading) {
        if(!FeedList.error) {
          this.setState({
            FeedList: FeedList.data,
            isLoading: false,
          })
        } else {
          this.setState({isLoading: false});
        }
    }
  }
  
  handleModal = () => {
     this.setState({isOpenModal: false});
  }
  
   
  render() {
    return (
        <SafeAreaView style={styles.container}>
          {this.state.isLoading ? <ActivityIndicator size={"small"} color={"#000"}/> :
            <FeedComponent feedData={this.state.FeedList}/>
          }
        </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    FeedList: state.feed,
    // isLoading: state.FeedReducer.isLoading,
    // success: state.FeedReducer.success,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getFeed: () => dispatch(FeedAction.feed()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
