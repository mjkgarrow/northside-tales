import { TileLayer } from 'react-leaflet'
import { Icon, divIcon } from 'leaflet';
import pinIcon from '../img/pin2.png'

export const Pioner = <TileLayer
    attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url='https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey={apikey}'
    apikey="1d97fcfb66c14f0ab45ad6ed35950d55"
    maxZoom={22} />

export const Watercolour = <TileLayer
    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>'
    url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg' />

export const Classic = <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

export const DarkBaseMap = <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' />

export const LightBaseMap = <TileLayer
    attribution='Tiles &copy; Esri'
    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
    maxZoom={22} />

export const DarkCleanMap = <TileLayer
    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    maxZoom={20}
    minZoom={12}
/>

export const LightCleanMap = <TileLayer
    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
    maxZoom={20}
    minZoom={12} />


export const mapCanvasProps = {
    center: { lat: -37.7698664294625, lng: 144.96696044527638 },
    zoom: 15,
};

export const customIcon = new Icon({
    iconUrl: pinIcon,
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

export const createCustomClusterIcon = (cluster) => {
    return new divIcon({
        html: `<div>${cluster.getChildCount()}</div>`,
        className: "bg-teal-600 text-white text-2xl font-bold text-center rounded-full h-10 w-10 relative -left-1/2 -top-5 flex justify-center items-center",
        iconSize: []
    })
}