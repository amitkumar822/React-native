import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {screenHeight} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import SearchBar from './atoms/SearchBar';
import ProductItem from './atoms/ProductItem';
import {getProductByCategory} from './api/getProduct';
import { useAppSelector } from '../../store/reduxHook';
import { selectTotalItemsInCart } from '@modules/cart/api/slice';

const Products: FC = () => {
const count = useAppSelector(selectTotalItemsInCart)

  const route = useRoute();
  const {id} = route?.params as any;

  const [products, setProducts] = useState<any[]>([]);
  const [isError, setIsError] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProductByCategory(id);
      setProducts(data);
    } catch (error: any) {
      setIsError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProducts();
    }
  }, [id]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await getProductByCategory(id);
      setProducts(data);
    } catch (error: any) {
      setIsError(error);
    } finally {
      setRefreshing(false);
    }
  }, [id]);

  const renderItem = ({item, index}: any) => {
    const isOdd = index % 2 !== 0;
    return <ProductItem isOdd={isOdd} item={item} />;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SearchBar cartLength={count} />

      {loading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <FlatList
          bounces={false}
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            isError ? (
              <View style={{padding: 20, alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: RFValue(13),
                    textAlign: 'center',
                  }}>
                  Failed to load products. Please check your internet connection
                  or try again later.
                </Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  ops! No items in this categories
                </Text>
              </View>
            )
          }
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  listContainer: {
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    height: screenHeight - 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: RFValue(14),
    color: '#666',
    marginBottom: 16,
  },
});
