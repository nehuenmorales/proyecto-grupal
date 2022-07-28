import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import Geocode from 'react-geocode';

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import './location.css'

Geocode.setApiKey("AIzaSyAKB5T59AlV3HB94-JK8FKndeHPI6l24Po");
Geocode.enableDebug();


export default function Location({selected, setSelected, centerState, setCenterState, location, setLocation}) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAKB5T59AlV3HB94-JK8FKndeHPI6l24Po",
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map selected={selected} setSelected={setSelected} centerState={centerState} setCenterState={setCenterState} location={location} setLocation={setLocation}/>;
}

function Map({selected, setSelected, centerState, setCenterState, location, setLocation}) {
    // const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
    // const [ latLng, setLatLng ] = useState({ lat: 43.45, lng: -80.49 })
    

    useEffect(() => {
        console.log('soy yo:)', location)
    }, [location])

    var options = {
        enableHighAccuracy: true,
        maximumAge: 0
    }

    navigator.geolocation.watchPosition(success, error, options);

    function success(position) {
        const coordenadas = position.coords;
        setLocation(
            {
                ...location,
                lat: coordenadas.latitude,
                lng: coordenadas.longitude
            }
        );

        setCenterState(
            {
                lat: coordenadas.latitude,
                lng: coordenadas.longitude
            }
        )
    };

    function error(error) {
        console.warn('ERROR(' + error.code + '): ' + error.message);
    };

    const onMarkerDragEnd = async (event) => {
        console.log(event, 'soy eventttt')
        const newLat = await event.latLng.lat();
        const newLng = await event.latLng.lng();

        setCenterState({
            lat: newLat,
            lng: newLng,
        })
        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                console.log('capaz soy yo', response.results);
                const { formatted_address } = response.results[0];
                setLocation({
                    ...location,
                    lat: newLat,
                    lng: newLng,
                    address: formatted_address,
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete setCenterState={setCenterState} setSelected={setSelected} />
            </div>

            <GoogleMap
                zoom={10}
                center={centerState}
                mapContainerClassName="map-container"
            >
                {selected &&
                    <Marker
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                        position={centerState}
                    />
                }
            </GoogleMap>

            <div>
                Latitud: {location.lat},<br/>
                Longitud: {location.lng},<br/>
                Direccion: {location.address},<br/>
            </div>
        </>
    );
}

const PlacesAutocomplete = ({ setSelected, setCenterState }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setCenterState({ lat, lng })
        setSelected({ lat, lng });
    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="combobox-input"
                placeholder="Search an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};
