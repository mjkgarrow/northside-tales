import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';


const themeState = atom({
    key: 'theme',
    default: localStorage.getItem("themeLocal") || 'light',
});

const markerFilterState = atom({
    key: 'markerFilter',
    default: '',
});

const latLngState = atom({
    key: 'latLng',
    default: localStorage.getItem("themeLocal") || 'light',
});

const markerState = atom({
    key: 'markers',
    default: [{
        "name": "Matt",
        "message": "Hello world",
        "type": "vibe",
        "latLng": {
            "lat": -37.76665027137399,
            "lng": 144.9726790934801
        },
    },],
});

export const useGlobalState = () => {
    const [markers, setMarkers] = useRecoilState(markerState)
    const [theme, setTheme] = useRecoilState(themeState)
    const [latLng, setLatLng] = useRecoilState(latLngState)
    const [markerFilter, setMarkerFilter] = useRecoilState(markerFilterState)

    return { markers, setMarkers, theme, setTheme, latLng, setLatLng, markerFilter, setMarkerFilter }
}

