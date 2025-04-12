import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Feather, FontAwesome5 } from '@expo/vector-icons'

export default function LearningPathways() {
  return (
    <View style={styles.pathwayContainer}>
        <Text style={styles.sectionTitle}>Learning Pathways</Text>
        {[
          { label: 'Total Course', value: '89', bgColor: '#fff', icon: <Entypo name="book" size={28} color="#2196f3" /> },
          { label: 'Total Workshop', value: '52', bgColor: '#fff', icon: <Feather name="box" size={26} color="#10b981" /> },
          { label: 'Average Quiz', value: '80%', bgColor: '#fff', icon: <Entypo name="pie-chart" size={26} color="#8e24aa" /> },
          { label: 'Certificate', value: '56', bgColor: '#fdd835', icon: <FontAwesome5 name="graduation-cap" size={24} color="#fff" />, iconBg: '#ffeb3b', valueColor: '#fff' },
        ].map((pathway, index) => (
          <TouchableOpacity key={index} style={[styles.pathwayItem, { backgroundColor: pathway.bgColor }]}>
            <View style={[styles.pathwayIcon, { backgroundColor: pathway.iconBg || '#f7f7f7' }]}>
              {/* Icon component */}
              {pathway.icon}
            </View>
            <View>
              <Text style={styles.pathwayLabel}>{pathway.label}</Text>
              <Text
                style={[
                  styles.pathwayValue,
                  { color: pathway.valueColor || '#333' }, // Custom color for the last item
                ]}
              >
                {pathway.value}
              </Text>

            </View>
            <View style={styles.pathwayDetails}>
              <Text style={styles.pathwayLink}>See Details</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
  )
}

const styles={
    pathwayContainer: {
        padding: 20,
        paddingHorizontal: 0,
        backgroundColor: '#fff',
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
      },
      pathwayItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      pathwayIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f7f7f7',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      pathwayDetails: {
        alignItems: 'flex-end', 
        textAlign: 'right', 
        flex: 1, 
        marginRight: 20
      },
      pathwayValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'left',
        flex: 1, 
        marginHorizontal: 10,
      },
      pathwayLabel: {
        fontSize: 14,
        color: '#777',
        marginBottom: 4
      },
      pathwayLink: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: '600',
        left: 20
      },
}