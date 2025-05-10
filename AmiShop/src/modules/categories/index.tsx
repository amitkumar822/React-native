import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '@utils/Constants';
import {RefreshControl} from 'react-native';
import {useCallback} from 'react';
import {navigate} from '@navigation/NavigationUtil';
import {useAppDispatch, useAppSelector} from '../../store/reduxHook';
import {getCategories} from './api/actions';

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const {data, loading, error} = useAppSelector(state => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  // Refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getCategories());

    // Wait until loading is false to end refresh
    const interval = setInterval(() => {
      if (!loading) {
        setRefreshing(false);
        clearInterval(interval);
      }
    }, 100);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SafeAreaView />
        <Text style={styles.title}>Categories </Text>
        <Text style={styles.subTitle}>
          Explore our wide range of categories
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <FlatList
          data={data} // data this come to API or categoriesData
          numColumns={2}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigate('Products', {
                  id: item._id,
                  name: item.name,
                })
              }
              style={styles.itemContainer}>
              <Image source={{uri: item?.image_uri}} style={styles.image} />
              <Text style={styles.name}>{item?.name}</Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <>
              {error && (
                <View style={{padding: 20, alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: RFValue(13),
                      textAlign: 'center',
                    }}>
                    Failed to load categories. Please check your internet
                    connection or try again later.
                  </Text>
                </View>
              )}
            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F9EC',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: RFValue(18),
    fontFamily: FONTS.heading,
    fontWeight: 'bold',
    color: '#333',
  },
  subTitle: {
    fontSize: RFValue(13),
    color: '#666',
    marginTop: 5,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  name: {
    marginTop: 10,
    fontSize: RFValue(12),
    fontWeight: '500',
    color: '#333',
  },
  contentContainer: {
    padding: 10,
  },
});

export default Categories;
