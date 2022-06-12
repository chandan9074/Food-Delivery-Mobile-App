import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, StatusBar} from 'react-native';

import {SIZES, FONTS, COLORS, images, icons} from "./../constants/index"
import {initialCurrentLocation, restaurantData, categoryData} from ".././utils/data"

const Home = ({navigation}) => {

    const [allCatagories, setCatagories] = useState(categoryData);
    const [selectCaragories, setSelectCaragories] = useState(categoryData[0]);
    const [restaurants, setRestaurants] = useState(restaurantData);
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)

    const randerHeader = () =>{
        return(
            <View style={{flexDirection:"row", height:50}}>
                <TouchableOpacity
                    style={{width: 50, paddingLeft:SIZES.padding * 2, justifyContent: "center"}}
                >
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{width:30, height:30}}
                    />
                </TouchableOpacity>
                <View
                    style={{flex:1, alignItems:"center", justifyContent:"center", }}
                >
                    <View style={{
                        width:"70%",
                        height:"100%",
                        backgroundColor:COLORS.lightGray3,
                        alignItems:"center",
                        justifyContent:"center",
                        borderRadius:SIZES.radius
                    }}>
                        <Text style={{...FONTS.h3}}>{currentLocation.streetName}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{width: 50, paddingRight:SIZES.padding * 2, justifyContent: "center"}}
                >
                    <Image
                        source={icons.basket}
                        resizeMode="contain"
                        style={{width:30, height:30}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const onSelectCatagory = (item) =>{

        if(item.name === "All"){
            setRestaurants(restaurantData)
        }
        else{
            let resturantList = restaurantData.filter((a)=> a.categories.includes(item.id))
    
            setRestaurants(resturantList)
        }
        setSelectCaragories(item)
    }

    const getCatagoryNameById = (catagoryId) =>{
        let catagory = allCatagories.filter(cat => cat.id === catagoryId);
        console.log(catagory[0]);
        if(catagory.length > 0){
            return catagory[0].name;
        }
        else{
            return "hello";
        }
    }

    const randerMainCatagory = () =>{
        const renderItem = ({item}) =>(
            <TouchableOpacity
                style={{
                    padding: SIZES.padding,
                    paddingBottom: SIZES.padding * 2,
                    backgroundColor: (selectCaragories?.id === item.id ? COLORS.primary : COLORS.white),
                    borderRadius:SIZES.radius,
                    alignItems:"center",
                    justifyContent:"center",
                    marginRight:SIZES.padding,
                    ...styles.shadow
                }}
                onPress={()=> onSelectCatagory(item)}
            >

                <View style={{
                    width:40,
                    height:40,
                    borderRadius:SIZES.radius,
                    alignItems:"center",
                    justifyContent:"center",
                    backgroundColor:(selectCaragories?.id === item.id ? COLORS.white : COLORS.lightGray)
                }}>
                    <Image source={item.icon} resizeMode="contain" style={{width:20, height:20}} />

                </View>

                <Text
                    style={{
                        marginTop:SIZES.padding,
                        color:(selectCaragories?.id === item.id ? COLORS.white : COLORS.black),
                        ...FONTS.body5
                    }}
                >{item.name}</Text>

            </TouchableOpacity>
        )
        return(
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{...FONTS.h2, fontWeight:"700"}}>Main</Text>
                <Text style={{...FONTS.h2, fontWeight:"700"}}>Catagories</Text>

                <FlatList
                    data={allCatagories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
                />
            </View>
        )
    }

    const randerResturantList = () =>{

        const renderItem = ({item}) =>(
            <TouchableOpacity
                style={{
                    paddingBottom:SIZES.padding * 2
                }}
                onPress={()=> navigation.navigate("Resturant", {item, currentLocation})}
            >
                <View>
                    <Image source={item.photo} resizeMode="cover" style={{
                        width:"100%",
                        height:160,
                        borderRadius:SIZES.radius
                    }} />
                    <View 
                        style={{
                            position:"absolute",
                            bottom:0,
                            height:30,
                            width:SIZES.width * 0.3,
                            backgroundColor:COLORS.white,
                            borderTopRightRadius:SIZES.radius,
                            borderBottomLeftRadius:SIZES.radius,
                            alignItems: "center",
                            justifyContent: "center",
                            ...styles.shadow
                        }}
                    >
                        <Text style={{fontWeight:'500'}}>{item.duration}</Text>
                    </View>
                </View>

                <Text style={{...FONTS.body3, marginTop: SIZES.padding}}>{item.name}</Text>

                <View
                    style={{
                        marginTop:SIZES.padding,
                        flexDirection:"row",
                        alignItems:"center"
                    }}
                >
                    <Image source={icons.star} style={{
                        height:12,
                        width:12,
                        marginRight:5
                    }} />
                    <Text style={{...FONTS.body5}} >{item.rating}</Text>
                    {item.categories !== undefined ? <View style={{
                        flexDirection:"row",
                        marginLeft:10
                    }}>
                        {item.categories.map((catagoryId)=>(
                            <View
                            style={{
                                flexDirection:"row"
                            }}
                            key={catagoryId}>
                                <Text>{getCatagoryNameById(catagoryId)}</Text>
                                <Text style={{marginHorizontal:5}}>.</Text>
                            </View>
                        ))}
                    </View>:null}
                    {/* <View style={{flexDirection:"row", marginHorizontal:10 }}>
                        <Text>Burgers</Text>
                        <Text style={{marginHorizontal:5}}>.</Text>
                        <Text>Burgers</Text>
                    </View> */}

                    {[1, 2, 3].map((priceRating)=>(
                        <Text key={priceRating} style={{
                            color:(priceRating <= item.priceRating ? COLORS.black : COLORS.darkgray),
                            fontWeight:"600"
                        }}>$</Text>
                    ))}
                </View>

            </TouchableOpacity>
        )


        return(
            <>
                {restaurants !== null ? <FlatList 
                    data={restaurants}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingHorizontal: SIZES.padding * 2,
                        paddingBottom: 70
                    }}
                />: null}
            </>
        )
    }

    return (
        <SafeAreaView style={{backgroundColor:"white", flex:1, paddingTop: 50,}}>
            {randerHeader()}
            {randerMainCatagory()}
            {randerResturantList()}
        </SafeAreaView>
    )
}


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
    }
})



export default Home


