import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import { useAppSelector } from '@states/reduxHook';
import { selectRestaurantCartItem } from '@states/reducers/cartSlice2';
import CustomText from '@components/global/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@unistyles/Constants';
import MiniFoodCard from '@components/restaurant/MiniFoodCard';

const RepeatItemModal: FC<{
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
  }, []);

  return (
    <View>
      <View style={styles.noShadowHeaderContainer}>
        <View style={styles.flexRowGap}>
          <CustomText fontFamily="Okra-Bold" fontSize={13}>
            Repeat last used customization?
          </CustomText>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainerWhiteBackground}>
        {cartItem?.customizations?.map((cus, index) => {
          return (
            <MiniFoodCard
              item={item}
              cus={cus}
              key={index}
              restaurant={restaurant}
            />
          );
        })}
      </ScrollView>

      <View style={styles.noShadowFooterContainer}>
        <TouchableOpacity onPress={onOpenAddModal}>
          <CustomText
            fontFamily="Okra-Bold"
            fontSize={11}
            color={Colors.active}>
            + Add new customisation
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RepeatItemModal;
