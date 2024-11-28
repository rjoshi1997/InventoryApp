const goBackToStockScreen =
  (navigation: any) =>
  (props = {}) => {
    navigation.navigate('BottomTabs', {
      screen: 'Stock',
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

export const navigate = (navigation: any) => ({
  goBack: navigation.goBack,
  goBackToStockScreen: goBackToStockScreen(navigation),
  openAddStockScreen: openAddStockScreen(navigation),
});
