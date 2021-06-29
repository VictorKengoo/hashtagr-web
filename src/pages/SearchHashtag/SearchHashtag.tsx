import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext'
import { MapComponent } from "../../components/MapComponent/MapComponent";
import { SearchBox } from "../../components/SearchBox/SearchBox";

export function SearchHashtag() {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <SearchBox />
      <MapComponent />
    </div>
  )
}