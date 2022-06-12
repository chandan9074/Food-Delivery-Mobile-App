import React, {useState, useEffect} from 'react'
// import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native'
// import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps"
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


function OrderDelivery({route, navigation}) {

    const [restaurant, setRestaurant] = useState(null);
    const [streetName, setStreetName] = useState("");
    const [fromLocation, setFromLocation] = useState(null);
    const [toLocation, setToLocation] = useState(null);
    const [region, setRegion] = useState(null);

    useEffect(()=>{
        const {restaurant, currentLocation} = route.params;

        const fromLoc = currentLocation.gps;
        const toLoc = restaurant.location;
        const street = currentLocation.streetName;

        let mapRegion = {
            // latitude : (fromLoc.latitude + toLoc.latitude) / 2,
            // longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            // latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            // longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
            latitude: 23.8759,
            longitude: 90.3795,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }

        setRestaurant(restaurant);
        setStreetName(street);
        setFromLocation(fromLoc);
        setToLocation(toLoc);
        setRegion(mapRegion)

    })

    return (
        <View style={styles.container}>
      <MapView
        region={{
                latitude: 1.5496614931250685,
                longitude: 110.36381866919922,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
             }}
       style={styles.map} />
    </View>
        // <View style={{flex:1}} >
        //     <MapView
        //         provider={PROVIDER_GOOGLE}
        //         // initialRegion={region}
        //         // loadingEnabled={true}
        //     //     region={
        //     //         // {
        //     //     //     // latitude:region?.latitude,
        //     //     //     // longitude:region?.longitude,
        //     //     //     // latitudeDelta:region?.latitudeDelta,
        //     //     //     // longitudeDelta:region?.longitudeDelta
        //     //     //     latitude: 1.5496614931250685,
        //     //     //     longitude: 110.36381866919922,
        //     //     //     latitudeDelta: 0.015,
        //     //     //     longitudeDelta: 0.0121,
        //     //     // }
        //     //     region
        //     // }
        //     region={{
        //         latitude: 1.5496614931250685,
        //         longitude: 110.36381866919922,
        //         latitudeDelta: 0.015,
        //         longitudeDelta: 0.0121,
        //      }}
        //         style={{width: Dimensions.get('window').width,
        //         height: Dimensions.get('window').height}}
        //     >

        //     </MapView>
        // </View>
    )
}

export default OrderDelivery



