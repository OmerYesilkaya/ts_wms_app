import React, { useState, useEffect, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useKeyboardHeight, useApi } from '@app/hooks';
import { COLORS } from '@app/constants';
import { stores } from '@app/api';
import { StoreType } from '@app/types';

const containerHorizontalMargin = 20;
const screenWidth = Dimensions.get('screen').width;
const containerWidth = screenWidth - containerHorizontalMargin;

type LocationSearchBarPropTypes = {
  animateToRegion: any; // fix
};

function LocationSearchBar({ animateToRegion }: LocationSearchBarPropTypes) {
  const keyboardHeight = useKeyboardHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const getStoresLocal = useApi(stores.getStores);

  const [shops, setShops] = useState([]);

  const [query, setQuery] = useState('');
  const [suggestionsList, setSuggestionsList] = useState<StoreType[]>([]);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const translateAnim = useRef(new Animated.Value(0)).current;
  const searchRef = useRef<TextInput>(null);

  const cacheStores = async () => {
    let localStores = await getStoresLocal.request();
    setShops(localStores.data);
  };

  function getSuggestions() {
    cacheStores();
    if (typeof query !== 'string' || query.length < 2) {
      setSuggestionsList([]);
      return;
    }
    const suggestions = shops
      .filter((t: StoreType) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      )
      .map(
        ({ shop_id, title, street, longitude, latitude, url }: StoreType) => ({
          shop_id: shop_id,
          title: title,
          street: street,
          url: url,
          longitude: longitude,
          latitude: latitude,
        })
      )
      .slice(0, 20);

    setSuggestionsList(suggestions);
  }
  const handlestoreSelection = (store: StoreType) => {
    animateToRegion(store.latitude, store.longitude);
    if (searchRef.current) {
      searchRef.current.blur();
    }
  };

  const toOpen = () => {
    const value = -keyboardHeight + (keyboardHeight > 0 ? tabBarHeight : 0);

    Animated.timing(translateAnim, {
      toValue:
        Platform.OS === 'ios' ? value : value + keyboardHeight - tabBarHeight,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const toClose = () => {
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    getSuggestions();
  }, [query]);

  useEffect(() => {
    if (isKeyboardActive) {
      toOpen();
    } else {
      toClose();
    }
  }, [isKeyboardActive, keyboardHeight]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: translateAnim,
            },
          ],
        },
      ]}
    >
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={40} color={COLORS.light} />
        <TextInput
          ref={searchRef}
          style={styles.search}
          placeholder="Wo willst du suchen?"
          placeholderTextColor={COLORS.medium}
          onChangeText={setQuery}
          value={query}
          onFocus={() => setIsKeyboardActive(true)}
          onBlur={() => setIsKeyboardActive(false)}
        />
        {query !== '' && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <View>
              <MaterialCommunityIcons
                name="close"
                size={30}
                color={COLORS.light}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.divider} />
      <View style={styles.listContainer}>
        {suggestionsList && (
          <FlatList
            data={suggestionsList}
            ItemSeparatorComponent={() => <View style={styles.thinDivider} />}
            keyExtractor={(item) => item.shop_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestContainer}
                onPress={() => handlestoreSelection(item)}
              >
                <Text style={styles.suggestTitle}>{item.title}</Text>
                <Text style={styles.suggestStreet}>{item.street}</Text>
                <Text style={styles.suggestUrl}>{item.url}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  search: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: 'transparent',
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
  },
  searchContainer: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    width: containerWidth,
    zIndex: 999,
    position: 'absolute',
    bottom: 10,
    left: screenWidth / 2 - containerWidth / 2,
    backgroundColor: COLORS.dark2,
    padding: 7,
    borderRadius: 10,
  },
  divider: {
    flex: 1,
    height: 2,
    marginVertical: 5,
    backgroundColor: COLORS.white,
  },
  thinDivider: {
    flex: 1,
    height: 1,
    marginVertical: 5,
    backgroundColor: COLORS.medium,
  },
  listContainer: {
    maxHeight: Dimensions.get('screen').height / 4,
  },
  suggestContainer: {
    flexDirection: 'column',
    padding: 4,
    marginBottom: 3,
  },
  suggestTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: COLORS.light,
    marginBottom: 1,
  },
  suggestStreet: {
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.light,
  },
  suggestUrl: {
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.wmsColorMedium,
    marginTop: 2,
  },
});

export default LocationSearchBar;
