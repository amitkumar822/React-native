import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles'
import RestaurantCard from './RestaurantCard';
import CustomText from '@components/global/CustomText';
import { cardStyles } from '@unistyles/cardStyles';
import { recommendedListData } from '@utils/dummyData';

const RestaurantList = () => {
  const { styles } = useStyles(cardStyles);

  const renderItem = ({ item }: any) => {
    return (
      <RestaurantCard item={item} />
    )
  }

  return (
    <View>

      <CustomText
        style={styles.centerText}
        fontSize={12}
        fontFamily='Okra-Bold'>
        Ami restaurants delivering to you
      </CustomText>
      <CustomText
        style={styles.centerText}
        fontSize={12}
        fontFamily='Okra-Medium'>
          FEATURED
      </CustomText>

       <FlatList
              data={recommendedListData}
              scrollEventThrottle={16}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={item => item?.id?.toString()}
              scrollEnabled={false}
              contentContainerStyle={styles.listContainer}
            />
    </View>
  )
}

export default RestaurantList