import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppDispatch, useAppSelector} from '@store/reduxHook';
import {clearCart, selectCartItems, selectTotalCartPrice} from '../api/slice';
import LoginModal from '@modules/account/molecules/LoginModal';
import {createOrder, createTramsection} from '../api/paygateway';

const PlaceOrderButton: FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.account?.user) as any;
  const price = useAppSelector(selectTotalCartPrice);
  const carts = useAppSelector(selectCartItems);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    const data = await createTramsection(price, user?._id);
    if (data) {
      await createOrder(
        data?.key,
        data?.amount,
        data?.order_id,
        carts,
        user?._id,
        user?.address,
      );
      setLoading(false);
      dispatch(clearCart())
    } else {
      setLoading(false);
      Alert.alert('There was an error');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.strikPrice}>₹{price + 1500}</Text>
          <Text style={styles.price}>
            ₹{price}{' '}
            <Image
              style={{
                width: 15,
                height: 15,
              }}
              source={{
                uri: 'https://rukminim2.flixcart.com/www/100/100/promos/12/06/2023/d08c56e9-603b-4316-88cd-2184e1a4abcd.png?q=50',
              }}
            />
          </Text>
        </View>

        <TouchableOpacity
          disabled={loading}
          style={styles.button}
          onPress={() => {
            user ? handlePlaceOrder() : setIsVisible(true);
          }}>
          {loading ? (
            <ActivityIndicator color="black" size="small" />
          ) : (
            <Text style={styles.btnText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>

      {isVisible && (
        <LoginModal onClose={() => setIsVisible(false)} visible={isVisible} />
      )}
    </>
  );
};

export default PlaceOrderButton;

const styles = StyleSheet.create({
  strikPrice: {
    fontSize: RFValue(11),
    color: '#888',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: RFValue(16),
    color: '#000',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#FFC201',
    padding: 10,
    borderRadius: 6,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btnText: {
    color: '#222',
    fontWeight: '600',
    fontSize: RFValue(13),
  },
  container: {
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 2,
    borderColor: '#F0F2F5',
    width: '100%',
    padding: 15,
    paddingBottom: Platform.OS == 'android' ? 10 : 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
