import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'boxicons';
import API_BASE_URL from "../../config";
import styled from 'styled-components';
import { setCurrentIdPlaylist, setCurrentPlaylist, setCurrentSongIndex } from '../../redux/actions'; 
const RecentlyTitle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 0 20px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
`
const RecenlyPlayedWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 20px;
    /* gap: 10px; */
`
const RecentlyItem = styled.div`
    flex-basis: calc(50%-20px);
    width: calc(50%);
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 0 20px;
    /* background-color: #101010; */
    box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
    &:hover {
        background-color: #202020;
    }

`
const RecentlyItemTitle = styled.div`
    font-size: 24px;
    font-weight: 500;
    margin-bottom:0;
    margin-left: 20px;
`
const RecentlyItemMore = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
export const RecenlyPlayed = () => {
    const [songRecentlyPlayed, setSongRecentlyPlayed] = useState([]);
    const dispatch = useDispatch();

    const fetchData = async (url,type, limit) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${API_BASE_URL}${url}`,
                params: {
                    type: type,
                    limit: limit,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const handleSongClick = (index, songs) => {
        dispatch(setCurrentPlaylist(songs));
        // dispatch(setCurrentIdPlaylist(songs.id));
        dispatch(setCurrentSongIndex(index));
    };

    useEffect(() => {
        fetchData('user/recently-played','song', 20).then((data) => {
            setSongRecentlyPlayed(data);
            console.log(data);
        });
    }, []);
    console.log('recenly played');
    return (
        <div className="container recently-played">
            <RecentlyTitle>
                <box-icon name='history' color='#ffffff' ></box-icon>
                <h3 className="m-0">History</h3>
            </RecentlyTitle>
            <RecenlyPlayedWrapper>
            {
                        songRecentlyPlayed.map((song, index) => {
                            return (
                                <RecentlyItem key={index}>
                                    <div className="song__img">
                                        <img src={song.thumbnail} alt="" />
                                    </div>
                                    <div className="song__info">
                                        <RecentlyItemTitle >{song.title}</RecentlyItemTitle>
                                        <p className="song__author">{song.author}</p>
                                    </div>
                                    <RecentlyItemMore >
                                        <box-icon name='heart' color='#ffffff' ></box-icon>
                                        <box-icon name='play' color='#ffffff' onClick={()=>handleSongClick(index,songRecentlyPlayed )}></box-icon>
                                        <box-icon name='dots-horizontal-rounded' color='#ffffff' ></box-icon>
                                    </RecentlyItemMore>
                                </RecentlyItem>
                            )
                        })
                    }
            </RecenlyPlayedWrapper> 
        </div>
    )
}