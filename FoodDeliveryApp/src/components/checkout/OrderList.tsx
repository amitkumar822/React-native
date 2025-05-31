import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@unistyles/Constants'
import CustomText from '@components/global/CustomText'
import NonCustomizable from './NonCustomizable'
import MiniFoodCard from '@components/restaurant/MiniFoodCard'

const OrderList: FC<{ restaurant: any, cartItems: any, totalItems: number }> = ({ cartItems, restaurant, totalItems }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require('@assets/icons/clock.png')}
          />
        </View>
        <View>
          <CustomText fontSize={12} fontFamily='Okra-Bold'>
            Dilivery in 30 minutes
          </CustomText>
          <CustomText fontFamily='Okra-Medium' style={{ opacity: 0.5 }} variant='h6'>
            Shipment of {totalItems} item
          </CustomText>
        </View>
      </View>

      {
        cartItems?.map((item: any, index: number) => {
          return (
            <View key={index} style={styles.subContainer}>
              {item?.isCustomizations ? (
                <>
                  {item?.customizations?.map((cus: any, idx: number) => {
                    return (
                      <MiniFoodCard
                        cus={cus}
                        item={item}
                        key={idx}
                        restaurant={restaurant}
                      />
                    )
                  })}
                </>
              ) :
                <NonCustomizable item={item} restaurant={restaurant} />
              }
            </View>
          )
        })
      }
    </View>
  )
}

export default OrderList

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15
  },
  subContainer: {
    margin: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
  imgContainer: {
    backgroundColor: Colors.background_light,
    padding: 10,
    borderRadius: 15
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12
  }
})