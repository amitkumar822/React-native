import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import { useStyles } from 'react-native-unistyles'
import { restaurantStyles } from '@unistyles/restuarantStyles'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'

const RestaurantCard: FC<{item: any}> = ({item}) => {
    const {styles} = useStyles(restaurantStyles);

  return (
    <ScalePress
    onPress={() => {
        navigate('RestaurantScreen' , {
            item: item,
        })
    }}
    >
      <View style={styles.card}>
        <View>
            <Image source={{uri: item?.imageUrl}} style={styles.image} />
        </View>
      </View>
    </ScalePress>
  )
}

export default RestaurantCard