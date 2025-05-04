import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { fetchTables, deleteTable } from '../services/api.service';

const AdminDashboard = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTables = async () => {
      try {
        const result = await fetchTables();
        setTables(result);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch tables');
      } finally {
        setLoading(false);
      }
    };

    loadTables();
  }, []);

  const handleDelete = async (tableName: string) => {
    try {
      await deleteTable(Number(tableName));
      setTables(tables.filter((table) => table !== tableName));
      Alert.alert('Success', `Table ${tableName} deleted successfully`);
    } catch (error) {
      Alert.alert('Error', `Failed to delete table ${tableName}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <FlatList
        data={tables}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableName}>{item}</Text>
            <Button title="Delete" onPress={() => handleDelete(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableName: {
    fontSize: 18,
  },
});

export default AdminDashboard;