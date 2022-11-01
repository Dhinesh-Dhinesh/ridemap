// import { useEffect, useState } from 'react';
import { getRoutes } from '../firebase//functions/functions'
import L from 'leaflet';


const routes = [
    [
        L.latLng(11.922529883223849, 79.62732215956723),
        L.latLng(11.91840971562534, 79.63346386534774),
        L.latLng(11.931701262461857, 79.80717506512123), //pondy
        L.latLng(11.941574693874527, 79.80809077572246),
    ],
    [
        L.latLng(12.248859, 79.641574),
        L.latLng(12.154107, 79.606408),
        L.latLng(12.024463202149139, 79.5380167048937),
        L.latLng(11.996838397553915, 79.6325349925457),   //tindivanam
        L.latLng(11.922653, 79.627336)
    ]
]

export async function changeRoutesFromDb(){
    let routesArray = await getRoutes()
    
    let newRoutes = [];

    for(let i=0;i<routes.length;i++){
        newRoutes[i] = routes[routesArray[i]-1];
    }

    return newRoutes;
}