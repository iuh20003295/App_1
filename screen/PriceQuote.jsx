import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PriceQuote = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BÁO GIÁ PHÍ VẬN CHUYỂN</Text>
        <Text style={styles.subTitle}>Đơn vị tính: VNĐ (đã bao gồm VAT 10%)</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.th, styles.firstColumn]}></Text>
          <Text style={[styles.th, styles.doubleColumn]}>Vùng</Text>
          <Text style={[styles.th, styles.doubleColumn]}>Tỉnh giao</Text>
          <Text style={[styles.th, styles.doubleColumn]}>Quận huyện giao</Text>
          <Text style={styles.th}>Thời gian giao</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.thHighlight, styles.firstColumn]}>Hình thức vận chuyển</Text>
          <Text style={styles.td}>Cùng vùng</Text>
          <Text style={styles.td}>Khác vùng</Text>
          <Text style={styles.td}>Cùng tỉnh</Text>
          <Text style={styles.td}>Khác tỉnh</Text>
          <Text style={styles.td}>Cùng quận/huyện</Text>
          <Text style={styles.td}>Khác quận/huyện</Text>
          <Text style={styles.td}>1-6 ngày</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.thHighlight, styles.firstColumn]}>Giao hàng tiết kiệm</Text>
          <Text style={styles.td}>+4.000</Text>
          <Text style={styles.td}>+24.000</Text>
          <Text style={styles.td}>+4.000</Text>
          <Text style={styles.td}>+34.000</Text>
          <Text style={styles.td}>+4.000</Text>
          <Text style={styles.td}>+14.000</Text>
          <Text style={styles.td}>2-6 ngày</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.thHighlight, styles.firstColumn]}>Giao hàng nhanh</Text>
          <Text style={styles.td}>+12.000</Text>
          <Text style={styles.td}>+32.000</Text>
          <Text style={styles.td}>+12.000</Text>
          <Text style={styles.td}>+42.000</Text>
          <Text style={styles.td}>+12.000</Text>
          <Text style={styles.td}>+22.000</Text>
          <Text style={styles.td}>1-2 ngày</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.thHighlight, styles.firstColumn]}>Khối lượng mỗi 0.5KG</Text>
          <Text style={styles.td}>+2.500</Text>
          <Text style={styles.td}>+2.500</Text>
          <Text style={styles.td}>+2.500</Text>
          <Text style={styles.td}>+2.500</Text>
          <Text style={styles.td}>+2.500</Text>
          <Text style={styles.td}>+2.500</Text>
          <Text style={styles.td}></Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.thHighlight, styles.firstColumn]}>Phí vận chuyển cơ bản</Text>
          <Text style={styles.td}>+5.000</Text>
          <Text style={styles.td}>+5.000</Text>
          <Text style={styles.td}>+5.000</Text>
          <Text style={styles.td}>+5.000</Text>
          <Text style={styles.td}>+5.000</Text>
          <Text style={styles.td}>+5.000</Text>
          <Text style={styles.td}></Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fff4',
    padding: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#6c757d',
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#007bff',
  },
  th: {
    flex: 1,
    padding: 12,
    backgroundColor: '#e9ecef',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#495057',
  },
  thHighlight: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ffc107',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#495057',
  },
  td: {
    flex: 1,
    padding: 12,
    textAlign: 'center',
    fontSize: 14,
    color: '#212529',
  },
  firstColumn: {
    flex: 2,
  },
  doubleColumn: {
    flex: 2,
  },
});

export default PriceQuote;