import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Animated} from 'react-native'

import {icons, images, FONTS, SIZES, COLORS} from "../constants"

function Resturant({route, navigation}) {


    const scrollX = new Animated.Value(0);
    const [restaurants, setRestaurants] = useState(null);
    const [currentLocations, setCurrentLocation] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    
    // console.log(item);

    let {item, currentLocation} = route.params;
    useEffect(()=>{
        setRestaurants(item);
        setCurrentLocation(currentLocation);
        // console.log("item.......", item);
    })

    const updateOrderList = (action, menuId, price) =>{
        const orderList = orderItems.slice();
        const item = orderList.filter((a)=> a.menuId === menuId);

        if(action === "+"){
            if(item.length > 0){
                const newQty = item[0].qty + 1;
                item[0].qty = newQty;
                item[0].total = item[0].qty * price;
            }
            else{
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        }
        else{
            if(item.length > 0){
                if(item[0]?.qty > 0){
                    const newQty = item[0].qty - 1;
                    item[0].qty = newQty;
                    item[0].total = newQty * price;
                }
            }
            setOrderItems(orderList);

        }
    }

    const getOrderQuentity = (menuId) =>{
        const orderList = orderItems.filter(a => a.menuId === menuId);

        if(orderList.length > 0){
            return orderList[0].qty
        }

        return 0;
    }

    const getBusketQuentity = () =>{
        const quentity = orderItems.reduce((a, b)=> a + (b.qty || 0), 0);

        return quentity;
    }

    const getTotalSum = () =>{

        // console.log("dhukeche vai")
        const total = orderItems.reduce((a, b)=> a + (b.total || 0), 0);

        return total.toFixed(2);
    }


    const renderHeader = () =>{
        return (
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity
                    style={{width: 50, paddingLeft:SIZES.padding * 2, justifyContent: "center"}}
                    onPress={()=> navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{width:30, height:30}}
                    />
                </TouchableOpacity>

                <View
                    style={{flex:1, alignItems:"center", justifyContent:"center", }}
                >
                    <View style={{
                        width:"70%",
                        height:50,
                        backgroundColor:COLORS.lightGray3,
                        alignItems:"center",
                        justifyContent:"center",
                        borderRadius:SIZES.radius
                    }}>
                        <Text style={{...FONTS.body3, fontWeight:"700"}}>{restaurants?.name}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{width: 50, paddingRight:SIZES.padding * 2, justifyContent: "center"}}
                >
                    <Image
                        source={icons.list}
                        resizeMode="contain"
                        style={{width:30, height:30}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const renderFoodInfo = () =>{
        return(
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    {nativeEvent:{contentOffset : {x: scrollX} }}
                ], {useNativeDriver:false})}
            >
                {
                    restaurants?.menu.map((item, index)=>(
                        <View
                            key={`manu-${index}`}
                            style={{alignItems:"center"}}
                        >
                            <View style={{height:SIZES.height * 0.35}}>
                                <Image
                                    source={item.photo}
                                    resizeMode="cover"
                                    style={{
                                        width:SIZES.width,
                                        height:"100%"
                                    }}
                                />
                                <View
                                    style={{
                                        flexDirection:"row",
                                        position:"absolute",
                                        justifyContent:"center",
                                        width:SIZES.width,
                                        bottom:-20
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            height:40,
                                            paddingHorizontal:15,
                                            borderTopLeftRadius:25,
                                            borderBottomLeftRadius:25,
                                            backgroundColor:COLORS.white,
                                            justifyContent:"center",
                                            alignItems:"center"
                                        }}
                                        onPress={()=> updateOrderList("-", item.menuId, item.price)}
                                    >
                                        <Text style={{...SIZES.h1, fontWeight:"700"}}>-</Text>

                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            height:40,
                                            paddingHorizontal:10,
                                            backgroundColor:COLORS.white,
                                            justifyContent:"center",
                                            alignItems:"center",
                                        
                                        }}
                                    >
                                        <Text style={{...SIZES.body2, fontWeight:"700"}}>{getOrderQuentity(item.menuId)}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            height:40,
                                            paddingHorizontal:15,
                                            borderTopRightRadius:25,
                                            borderBottomEndRadius:25,
                                            backgroundColor:COLORS.white,
                                            justifyContent:"center",
                                            alignItems:"center"
                                        }}
                                        onPress={()=> updateOrderList("+", item.menuId, item.price)}
                                    >
                                        <Text style={{...SIZES.h1, fontWeight:"700"}}>+</Text>

                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                            <View
                                style={{
                                    width:SIZES.width,
                                    alignItems:'center',
                                    marginTop:10,
                                    paddingHorizontal:SIZES.padding * 2,
                                }}
                            >
                                <Text style={{fontSize:20, fontWeight:"700", marginTop:20, textAlign:"center"}}>{item.name} - {item.price.toFixed(2)}</Text>
                                <Text style={{...SIZES.body4, marginTop:10}} >{item.description}</Text>
                                <View 
                                    style={{
                                        flexDirection:"row",
                                        marginTop:10,
                                        alignItems:"center"
                                     }}
                                >
                                    <Image
                                        source={icons.fire}
                                        resizeMode="contain"
                                        style={{
                                            width:20,
                                            height:20,
                                            marginRight:5
                                        }}
                                    />
                                    <Text style={{fontWeight:"600", color:COLORS.darkgray}}>{item.calories.toFixed(2)} cal</Text>
                                </View>
                            </View>

                            
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    const renderDot = () =>{

        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return(
            <View style={{height:30}}>
                <View
                    style={{
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"center",
                        height:SIZES.padding
                    }}
                >

                    {restaurants?.menu.map((item, index)=>{
                        const opacity = dotPosition.interpolate({
                            inputRange:[index-1, index, index+1],
                            outputRange:[0.3, 1, 0.3],
                            extrapolate:"clamp"
                        })
                        const dotSize = dotPosition.interpolate({
                            inputRange:[index-1, index, index+1],
                            outputRange:[SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate:"clamp"
                        })
                        const dotColor = dotPosition.interpolate({
                            inputRange:[index-1, index, index+1],
                            outputRange:[COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                            extrapolate:"clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal:3,
                                    width:dotSize,
                                    height:dotSize,
                                    backgroundColor:dotColor
                                }}
                            >

                            </Animated.View>
                        )
                    })}

                </View>
            </View>
        )
    }

    const renderOrder = () =>{
        return (
            <View
                style={styles.orderContainer}
            >
                <View 
                    style={{
                        // width:SIZES.width,
                        flexDirection:"row",
                        justifyContent:"space-between"
                    }}
                >
                    <Text style={{fontSize:17, fontWeight:"700"}}>{getBusketQuentity()} items in cart</Text>
                    <Text style={{fontSize:17, fontWeight:"700"}}>${getTotalSum()}</Text>
                </View>

                <View
                    style={{
                        // width:SIZES.width,
                        marginTop:25,
                        flexDirection:"row",
                        justifyContent:"space-between"
                    }}
                >
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                    >
                        <Image source={icons.pin}
                            resizeMode="center"
                            style={{
                                width:14,
                                height:14,
                                opacity:0.3
                            }}
                        />
                        <Text style={{fontSize:13, marginLeft:10, fontWeight:"600"}}>745 Lincoin PI</Text>
                    </View>
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                    >
                        <Image source={icons.master_card}
                            resizeMode="center"
                            style={{
                                width:14,
                                height:14,
                                opacity:0.3
                            }}
                        />
                        <Text style={{fontSize:13, marginLeft:10, fontWeight:"600"}}>123</Text>
                    </View>
                </View>

                <View style={{alignItems:"center", justifyContent:"center", marginVertical:25}}>
                    <TouchableOpacity
                        style={{
                            width:SIZES.width * 0.9,
                            padding:SIZES.padding,
                            backgroundColor:COLORS.primary,
                            borderRadius:SIZES.radius
                        }}
                        onPress ={()=> navigation.navigate("OrderDelivery", {
                            restaurant: restaurants,
                            currentLocation: currentLocation
                        })}
                    >
                        <Text style={{textAlign:"center", color:COLORS.lightGray, fontWeight:"700"}}>Order</Text>

                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    return (
        <SafeAreaView style={{backgroundColor:COLORS.lightGray2, flex:1, paddingTop: 50,}}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderDot()}
            {renderOrder()}
        </SafeAreaView>
    )
}

export default Resturant


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.lightGray4,
        
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    orderContainer:{
        // position:"absolute",
        width:"100%",
        // bottom:0,
        // left:0,
        marginTop:20,
        padding:20,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        backgroundColor:"white"
    }

})