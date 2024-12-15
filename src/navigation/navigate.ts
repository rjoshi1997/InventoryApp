const goBackToStockScreen =
  (navigation: any) =>
  (props = {}) => {
    navigation.navigate('BottomTabs', {
      screen: 'Stock',
      params: props,
    });
  };

const goBackToOrderScreen =
  (navigation: any) =>
  (props = {}) => {
    navigation.navigate('BottomTabs', {
      screen: 'Orders',
      params: props,
    });
  };

const openAddStockScreen =
  (navigation: any) =>
  (props = {}) => {
    navigation.navigate('WithoutBottomTabs', {
      screen: 'AddStockScreen',
      params: props,
    });
  };

const openSaveOrderScreen =
  (navigation: any) =>
  (props = {}) => {
    navigation.navigate('WithoutBottomTabs', {
      screen: 'SaveOrderScreen',
      params: props,
    });
  };

const openOrderSummary =
  (navigation: any) =>
  (props = {}) => {
    navigation.navigate('WithoutBottomTabs', {
      screen: 'OrderSummary',
      params: props,
    });
  };

export const navigate = (navigation: any) => ({
  goBack: navigation.goBack,
  goBackToStockScreen: goBackToStockScreen(navigation),
  openAddStockScreen: openAddStockScreen(navigation),
  openSaveOrderScreen: openSaveOrderScreen(navigation),
  goBackToOrderScreen: goBackToOrderScreen(navigation),
  openOrderSummary: openOrderSummary(navigation),
});
