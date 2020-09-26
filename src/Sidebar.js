import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useStateValue } from "./StateProvider";

function Sidebar({spotify}) {
    const [{ playlists }] = useStateValue();

    return (
        <div className='sidebar'>
            <div className='sidebar__img'>
                <img className='sidebar__logo' src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg' alt=''/>
            </div>

            <SidebarOption title="Home" Icon={HomeIcon}
            spotify={spotify} id="37i9dQZEVXbLRQDuF5jeBp"/>
            <SidebarOption title="Search" Icon={SearchIcon}/>
            <SidebarOption title="Your Library" Icon={LibraryMusicIcon}/>

            <br/>
            <strong className='sidebar__title'>PLAYLISTS</strong>
            <hr/>

            {playlists?.items?.map((playlists) => (
                <SidebarOption spotify={spotify} title={playlists.name} id={playlists.id}/>
            ))}

        </div>
    )
}

export default Sidebar
