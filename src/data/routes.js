// import { useEffect, useState } from 'react';
import { getRoutes } from '../firebase//functions/functions'
import L from 'leaflet';


const routes = [
    [
        L.latLng(12.248859, 79.641574),
        L.latLng(12.154107, 79.606408),
        L.latLng(12.024463202149139, 79.5380167048937),
        L.latLng(11.996838397553915, 79.6325349925457),   //tindivanam
        L.latLng(11.922653, 79.627336)
    ],
    [
        L.latLng(11.922768, 79.627369),
        
        L.latLng(11.755592, 79.624496)
    ],
    [
        L.latLng(11.922789, 79.627346),
        L.latLng(11.919956, 79.578739),
        L.latLng(11.926133, 79.549718),
        L.latLng(11.772740, 79.551802),
        L.latLng(11.767671, 79.560678),
        L.latLng(11.766424, 79.549538),
        L.latLng(11.622869, 79.549278),         //panruti
        L.latLng(11.619403, 79.507486),
        L.latLng(11.605845, 79.507607),
        L.latLng(11.604934, 79.465267),
        L.latLng(11.579717, 79.457629),
        L.latLng(11.540871, 79.464636)
    ],
    [
        L.latLng(11.907786, 79.648312),
        L.latLng(11.868439, 79.675276),
        L.latLng(11.917472, 79.685096),
        L.latLng(11.909934, 79.751651),
        L.latLng(11.907504, 79.790107),
        L.latLng(11.903869, 79.790993),
        L.latLng(11.902822, 79.793957),
        L.latLng(11.903090, 79.801541),         //kattukuppam
        L.latLng(11.906672, 79.807991),
        L.latLng(11.885319, 79.800028),
        L.latLng(11.873467, 79.796270),
        L.latLng(11.839056, 79.785723),
        L.latLng(11.823662, 79.782392)
    ],
    [
        L.latLng(11.907786, 79.648312),
        L.latLng(11.868439, 79.675276),
        L.latLng(11.903079, 79.734343),
        L.latLng(11.931703, 79.807389),
        L.latLng(11.941982, 79.808255),
        L.latLng(11.944086, 79.808611),
        L.latLng(11.948850, 79.811689),
        L.latLng(11.950940, 79.809558),         
        L.latLng(11.958825, 79.810110),         //laspet
        L.latLng(11.957177, 79.816834),
        L.latLng(11.954955, 79.818931),
        L.latLng(11.958251, 79.823598),
        L.latLng(11.957984, 79.826136),
        L.latLng(11.956220, 79.826565),
        L.latLng(11.952465, 79.818565),
        L.latLng(11.952662, 79.818435),
        L.latLng(11.953588, 79.818295)
    ]
]

export async function changeRoutesFromDb() {
    let routesArray = await getRoutes()

    let newRoutes = [];

    for (let i = 0; i < routes.length; i++) {
        newRoutes[i] = routes[routesArray[i] - 1];
    }

    return newRoutes;
}