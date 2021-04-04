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
import { fetchFoodData } from '../../stores/actions/food.action'
import FoodModal from '../../components/foodModal'

class Home extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false
    }
  }
   
  componentDidMount() {
    const { foodList } = this.props;
    if(foodList && foodList.length === 0) {
      this.setState({isLoading : true}, () => {
        this.props.getFoodData();
      })
    }
  }


  componentDidUpdate(prevProps) {
    const { foodList, isLoading, success } = this.props;
    if(prevProps.foodList !== foodList && !isLoading) {
        if(success) {
          this.setState({
            foodList: foodList,
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
            <>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.setState({isOpenModal:  true})}>
                <Text style={styles.btnLabel}>FoodList</Text>
              </TouchableOpacity>
              <Modal 
                isVisible={this.state.isOpenModal} 
                coverScreen={true} style={{ margin: 0}}>
                <FoodModal foodList={this.props.foodList} handleModal={this.handleModal}/>
              </Modal>
            </>
          }
        </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    foodList: state.foodReducer.food,
    isLoading: state.foodReducer.isLoading,
    success: state.foodReducer.success,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getFoodData: () => {
    dispatch(fetchFoodData());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
