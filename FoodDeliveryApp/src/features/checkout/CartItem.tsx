import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { FC, useMemo } from 'react';
import { useAppDispatch } from '@states/reduxHook';
import { useStyles } from 'react-native-unistyles';
import { cartStyles } from '@unistyles/cartStyles';
import { clearRestaurantCart } from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import { navigate } from '@utils/NavigationUtils';
import { Colors } from '@unistyles/Constants';
import Icon from '@components/global/Icon';
import { RFValue } from 'react-native-responsive-fontsize';

const CartItem: FC<{ item: any }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { styles } = useStyles(cartStyles);

  const deleteCart = async (id: any) => {
    dispatch(clearRestaurantCart({ restaurant_id: id }));
  };

  const totalItems = useMemo(() => {
    return item.items.reduce((acc: any, item: any) => {
      acc += item.quantity;
      return acc;
    }, 0);
  }, [item.items]);

  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.flexRowGap}>
        <Image
          source={{ uri: item?.restaurant?.imageUrl }}
          style={styles.image}
        />

        <View>
          <CustomText fontFamily="Okra-Medium" fontSize={10}>
            {item?.restaurant?.name}
          </CustomText>
          <TouchableOpacity
            style={styles.flexRow}
            onPress={() => {
              navigate('RestaurantScreen', {
                item: item.restaurant,
              });
            }}>
            <CustomText
              fontFamily="Okra-Medium"
              style={{ top: -1 }}
              fontSize={9}
              color={Colors.active}>
              View Menu
            </CustomText>
            <Icon
              name="chevron-right"
              iconFamily="MaterialIcons"
              color={Colors.active}
              size={12}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.flexRowGap}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            navigate('CheckoutScreen', {
              item: item?.restaurant,
            });
          }}>
          <CustomText fontFamily="Okra-Bold" fontSize={10} color="#fff">
            View Cart
          </CustomText>
          <CustomText fontFamily="Okra-Medium" fontSize={8} color="#fff">
            {totalItems} item
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => deleteCart(item?.restaurant.id)}>
          <Icon
            name="close"
            iconFamily="MaterialCommunityIcons"
            size={RFValue(12)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
