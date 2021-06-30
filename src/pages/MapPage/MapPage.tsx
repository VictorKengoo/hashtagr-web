import { FormEvent, useState } from "react";
import Leaflet from "leaflet";
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import logo from '../../assets/images/logo.svg'
import mapPin from "../../assets/images/pin.svg";
import { fetchHashtagrApi } from "../../services/api";

import './MapPage.scss'

type Position = {
  longitude: number;
  latitude: number;
};

type Tweet = {
  id: number;
  hashtag: string;
  userName: string;
  body: string;
  position: number[]
}

type HashtagrApi = {
  data: Tweet,
  errors: string[]
}

const mapPinIcon = Leaflet.icon({
  iconUrl: mapPin,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const mapTwitterIcon = Leaflet.icon({
  iconUrl: logo,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const initialPosition = { lat: -23.5606439, lng: -46.6337867 };

export function MapComponent() {
  const [location, setLocation] = useState(initialPosition);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [position, setPosition] = useState<Position | null>(null);
  const [hashtag, setHashtag] = useState("");



  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!hashtag) return;
    // const hashtagrApiResponse = {} as HashtagrApi
    return new Promise(async resolve => {
      const hashtagrApiResponse = await fetchHashtagrApi<HashtagrApi>(hashtag)
      fetchHashtagrApi(hashtag)
      // setTweets([
      //   ...tweets,
      //   {
      //     id: hashtagrApiResponse.tweetId,
      //     hashtag: hashtagrApiResponse.hashtag,
      //     userName: hashtagrApiResponse.userName,
      //     body: hashtagrApiResponse.body,
      //     position: hashtagrApiResponse.position
      //   },
      // ]);
      setHashtag("");
    })
  }

  return (
    <div id="page-map">
      <main>
        <form onSubmit={handleSubmit} className="landing-page-form">
          <fieldset>
            <img src={logo} alt="hashtagr logo" />
            <div className="input-block">
              <i className="fa fa-search icon"></i>
              <input
                id="hashtag-search"
                placeholder="Busque por campanhas"
                value={hashtag}
                onChange={(event) => setHashtag(event.target.value)}
                type="text"
              />
            </div>
          </fieldset>
          <button className="confirm-button" type="submit">
            Buscar
          </button>
        </form>
      </main>
      <MapContainer center={location} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker
            icon={mapPinIcon}
            position={[position.latitude, position.longitude]}
          ></Marker>
        )}

        {tweets.map((tweet) => (
          <Marker
            key={tweet.id}
            icon={mapTwitterIcon}
            position={[tweet.position[0], tweet.position[1]]}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              <div>
                <h3>{tweet.userName}</h3>
                <h3>{tweet.hashtag}</h3>
                <p>
                  {tweet.body}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}