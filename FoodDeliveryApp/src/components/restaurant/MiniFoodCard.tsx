import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { FC, memo, useRef } from 'react';
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import { useAppDispatch, useAppSelector } from '@states/reduxHook';
import {
    addCustomizableItem,
    removeCustomizableItem,
    selectRestaurantCartItem,
} from '@states/reducers/cartSlice';
import EditItemModal from '@components/modal/EditItemModal';
import CustomModal from '@components/modal/CustomModal';
import CustomText from '@components/global/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from '@components/global/Icon';
import { Colors } from '@unistyles/Constants';
import AnimatedNumber from 'react-native-animated-numbers';

const MiniFoodCard: FC<{
    item: any;
    cus: any;
    restaurant: any;
}> = ({ item, cus, restaurant }) => {
    const { styles } = useStyles(modelStyles);
    const dispatch = useAppDispatch();

    const cartItem = useAppSelector(
        selectRestaurantCartItem(restaurant?.id, item?.id),
    );

    const modalRef = useRef<any>(null);

    const openEditModal = () => {
        modalRef?.current?.openModal(
            <EditItemModal
                item={item}
                cus={cus}
                restaurant={restaurant}
                onClose={() => modalRef?.current?.closeModal()}
            />,
        );
    };

    const addCartHandler = (cus: any) => {
        const data = {
            restaurant: restaurant,
            item: item,
            customization: {
                quantity: 1,
                price: cus?.price,
                customizationOptions: cus?.customizationOptions,
            },
        };

        dispatch(addCustomizableItem(data));
    };

    const removeCartHandler = (cus: any) => {
        dispatch(
            removeCustomizableItem({
                restaurant_id: restaurant?.id,
                customizationId: cus?.id,
                itemId: item?.id,
            }),
        );
    };

    return (
        <>
            <CustomModal ref={modalRef} />
            <View style={styles.flexRowItemBaseline}>
                <View style={styles.flexRowGapBaseline}>
                    <Image
                        style={styles.vegIcon}
                        source={
                            cartItem?.isVeg
                                ? require('@assets/icons/veg.png')
                                : require('@assets/icons/non_veg.png')
                        }
                    />

                    <View>
                        <CustomText fontFamily="Okra-Bold">{cartItem?.name}</CustomText>
                        <CustomText fontFamily="Okra-Medium">₹{cus?.price}</CustomText>
                        <CustomText style={styles.selectedOptions}>
                            {cus?.customizationOptions?.map((i: any, idx: number) => {
                                return (
                                    <CustomText
                                        key={idx}
                                        fontFamily="Okra-Medium"
                                        fontSize={RFValue(9)}>
                                        {i?.selectedOption?.name}
                                    </CustomText>
                                );
                            })}
                        </CustomText>

                        <TouchableOpacity style={styles.flexRow} onPress={openEditModal}>
                            <CustomText fontFamily="Okra-Medium" color="#444" fontSize={9}>
                                Edit
                            </CustomText>
                            <View style={{ bottom: -1 }}>
                                <Icon
                                    name="arrow-right"
                                    iconFamily="MaterialIcons"
                                    color="#888"
                                    size={16}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.cartOperationContainer}>
                    <View style={styles.miniAddButtonContainer}>
                        <TouchableOpacity onPress={() => removeCartHandler(cus)}>
                            <Icon
                                name="minus-thick"
                                iconFamily="MaterialCommunityIcons"
                                color={Colors.active}
                                size={RFValue(10)}
                            />
                        </TouchableOpacity>
                        <AnimatedNumber
                            includeComma={false}
                            animationDuration={300}
                            fontStyle={styles.miniAnimatedCount}
                            animateToNumber={cus?.quantity}
                        />
                        <TouchableOpacity onPress={() => addCartHandler(cus)}>
                            <Icon
                                name="plus-thick"
                                iconFamily="MaterialCommunityIcons"
                                color={Colors.active}
                                size={RFValue(10)}
                            />
                        </TouchableOpacity>
                    </View>
                    <CustomText fontFamily="Okra-Medium">₹{cus?.cartPrice}</CustomText>

                    {/* This line working */}
                </View>
            </View>
        </>
    );
};

export default memo(MiniFoodCard);
