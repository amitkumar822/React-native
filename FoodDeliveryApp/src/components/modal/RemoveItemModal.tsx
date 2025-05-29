import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import { useAppSelector } from '@states/reduxHook';
import { selectRestaurantCartItem } from '@states/reducers/cartSlice2';
import CustomText from '@components/global/CustomText';
import MiniFoodCard from '@components/restaurant/MiniFoodCard';

const RemoveItemModal: FC<{
  item: any;
  restaurant: any;
  onOpenAddModal: () => void;
  closeModal: () => void;
}> = ({ item, onOpenAddModal, restaurant, closeModal }) => {
  const { styles } = useStyles(modelStyles);


  const cartItem = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );

  useEffect(() => {
    if (!cartItem) {
      closeModal();
    }
  }, [cartItem]);

  return (
    <View>
      <View style={styles.noShadowHeaderContainer}>
        <View style={styles.flexRowGap}>
          <CustomText fontFamily='Okra-Bold' fontSize={13}>
            Customizations for {item?.name}
          </CustomText>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles?.scrollContainerWhiteBackground}>
        {cartItem?.customizations?.map((cus, index) => {
          return (
            <MiniFoodCard
              item={item}
              cus={cus}
              key={cus?.id}
              restaurant={restaurant}
            />
          )
        })}
      </ScrollView>

      <SafeAreaView />
    </View>
  )
}

export default RemoveItemModal